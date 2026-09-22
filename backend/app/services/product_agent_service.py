import json

from app.services.gemini_service import analyze_image as gemini_analyze
from app.services.providers.hf_provider import analyze_image as hf_analyze
from app.services.tavily_service import search_web


# ==========================================================
# 1. GEMINI → HUGGING FACE FALLBACK
# ==========================================================

async def vision_with_fallback(
    image_bytes: bytes,
    mime_type: str,
    question: str
):
    try:
        print("Trying Gemini...")

        return await gemini_analyze(
            image_bytes=image_bytes,
            mime_type=mime_type,
            question=question
        )

    except Exception as gemini_error:
        print(f"Gemini failed: {gemini_error}")
        print("Falling back to Hugging Face...")

        return await hf_analyze(
            image_bytes=image_bytes,
            mime_type=mime_type,
            question=question
        )


# ==========================================================
# 2. PRODUCT DETECTION
# ==========================================================

async def check_if_product(
    image_bytes: bytes,
    mime_type: str,
    product_info: str
):
    prompt = f"""
    Determine whether the main subject in this image is a
    commercially purchasable physical product.

    Image analysis:
    {product_info}

    Return ONLY valid JSON:

    {{
        "is_product": true,
        "reason": "short reason"
    }}

    Rules:

    - Shirts, shoes, phones, laptops, watches, furniture,
      electronics, bags, cameras, appliances, etc. are products.

    - Vehicles can be products when the user is asking
      about buying or pricing the vehicle.

    - Wild animals, plants, landmarks, people, documents,
      food dishes, and natural objects are NOT products.

    - A brand name alone does NOT mean the image contains
      a product.

    - Do not confuse an animal with a vehicle brand.
    """

    result = await vision_with_fallback(
        image_bytes=image_bytes,
        mime_type=mime_type,
        question=prompt
    )

    try:
        return json.loads(clean_json(result))

    except json.JSONDecodeError:
        return {
            "is_product": False,
            "reason": "Could not reliably determine product status."
        }


# ==========================================================
# 3. SEARCH INTENT DETECTION
# ==========================================================

async def classify_search_intent(
    image_bytes: bytes,
    mime_type: str,
    question: str,
    product_info: str
):
    prompt = f"""
    Determine what the user wants to know about this product.

    Product:
    {product_info}

    User question:
    {question}

    Return ONLY valid JSON:

    {{
        "intent": "price",
        "search_instruction": "specific web search instruction"
    }}

    Allowed intents:

    - price
    - similar
    - availability
    - cheaper
    - reviews
    - general

    Examples:

    "iski price kya hai?"
    -> price

    "iske similar products dikhao"
    -> similar

    "ye kaha milega?"
    -> availability

    "iske saste options batao"
    -> cheaper

    "iske reviews kya hain?"
    -> reviews
    """

    result = await vision_with_fallback(
        image_bytes=image_bytes,
        mime_type=mime_type,
        question=prompt
    )

    try:
        return json.loads(clean_json(result))

    except json.JSONDecodeError:
        return {
            "intent": "general",
            "search_instruction": question
        }


# ==========================================================
# 4. CLEAN AI JSON RESPONSE
# ==========================================================

def clean_json(text: str) -> str:
    cleaned = text.strip()

    if cleaned.startswith("```json"):
        cleaned = cleaned[7:]

    elif cleaned.startswith("```"):
        cleaned = cleaned[3:]

    if cleaned.endswith("```"):
        cleaned = cleaned[:-3]

    return cleaned.strip()


# ==========================================================
# 5. MAIN PRODUCT SEARCH AGENT
# ==========================================================

async def product_web_search(
    image_bytes: bytes,
    mime_type: str,
    question: str
):

    # ------------------------------------------------------
    # STEP 1 — UNDERSTAND IMAGE
    # ------------------------------------------------------

    vision_prompt = f"""
    Analyze this image carefully.

    User question:
    {question}

    Identify the main subject.

    Determine:

    - product type
    - brand
    - model
    - color
    - important visible features

    If the image contains an animal, plant, person,
    landmark, document, food or another non-product object,
    clearly identify it.

    Return a concise description useful for determining
    whether this should be treated as a purchasable product.

    Do not invent information.
    """

    product_info = await vision_with_fallback(
        image_bytes=image_bytes,
        mime_type=mime_type,
        question=vision_prompt
    )

    print("\n==============================")
    print("IMAGE ANALYSIS")
    print("==============================")
    print(product_info)

    # ------------------------------------------------------
    # STEP 2 — CHECK PRODUCT
    # ------------------------------------------------------

    product_check = await check_if_product(
        image_bytes=image_bytes,
        mime_type=mime_type,
        product_info=product_info
    )

    print("\n==============================")
    print("PRODUCT CHECK")
    print("==============================")
    print(product_check)

    # ------------------------------------------------------
    # STEP 3 — NON-PRODUCT → STOP
    # ------------------------------------------------------

    if not product_check.get("is_product", False):

        return {
            "product_analysis": product_info,

            "intent": {
                "intent": "not_applicable",
                "search_instruction": ""
            },

            "answer": {
                "answer": (
                    "This image does not appear to contain "
                    "a commercially purchasable product, "
                    "so I did not perform a product search."
                ),
                "products": []
            }
        }

    # ------------------------------------------------------
    # STEP 4 — UNDERSTAND USER INTENT
    # ------------------------------------------------------

    search_intent = await classify_search_intent(
        image_bytes=image_bytes,
        mime_type=mime_type,
        question=question,
        product_info=product_info
    )

    print("\n==============================")
    print("SEARCH INTENT")
    print("==============================")
    print(search_intent)

    intent = search_intent.get(
        "intent",
        "general"
    )

    instruction = search_intent.get(
        "search_instruction",
        question
    )

    # ------------------------------------------------------
    # STEP 5 — CREATE SEARCH QUERY
    # ------------------------------------------------------

    search_query = f"""
    Product:

    {product_info}

    Search intent:
    {intent}

    Search instruction:
    {instruction}

    User question:
    {question}

    Find real and relevant products.

    Prefer:
    - official product pages
    - reputable shopping websites
    - actual product listings
    - current prices when available

    Do not return unrelated articles.
    """

    print("\n==============================")
    print("TAVILY SEARCH")
    print("==============================")
    print(search_query)

    # ------------------------------------------------------
    # STEP 6 — TAVILY
    # ------------------------------------------------------

    results = search_web(search_query)

    print(f"\nTavily returned {len(results)} results.")

    # ------------------------------------------------------
    # STEP 7 — PREPARE SOURCES
    # ------------------------------------------------------

    sources = "\n\n".join(
        f"Title: {item.get('title', '')}\n"
        f"URL: {item.get('url', '')}\n"
        f"Content: {item.get('content', '')}"
        for item in results
    )

    # ------------------------------------------------------
    # STEP 8 — FINAL AI RESPONSE
    # ------------------------------------------------------

    final_prompt = f"""
    You are an intelligent product search assistant.

    User question:
    {question}

    Detected product:
    {product_info}

    Search intent:
    {intent}

    Web search results:
    {sources}

    Return ONLY valid JSON:

    {{
        "answer": "Short useful answer to the user",
        "products": [
            {{
                "name": "Product name",
                "price": "Price or Unknown",
                "website": "Website name",
                "url": "Product URL"
            }}
        ]
    }}

    Rules:

    1. Use ONLY information supported by web results.

    2. Never invent a price.

    3. Never invent a URL.

    4. If price is unavailable, use "Unknown".

    5. Include maximum 5 relevant products.

    6. For PRICE intent:
       focus on current available prices.

    7. For SIMILAR intent:
       focus on visually/type-wise similar products.

    8. For CHEAPER intent:
       focus on lower-priced alternatives.

    9. For AVAILABILITY intent:
       focus on where the product can be purchased.

    10. For REVIEWS intent:
        summarize available review information.

    11. Prefer actual product pages over generic articles.

    12. Keep the answer concise.
    """

    final_answer = await vision_with_fallback(
        image_bytes=image_bytes,
        mime_type=mime_type,
        question=final_prompt
    )

    print("\n==============================")
    print("FINAL AI RESPONSE")
    print("==============================")
    print(final_answer)

    # ------------------------------------------------------
    # STEP 9 — PARSE JSON
    # ------------------------------------------------------

    try:

        structured_answer = json.loads(
            clean_json(final_answer)
        )

    except json.JSONDecodeError:

        structured_answer = {
            "answer": final_answer,
            "products": []
        }

    # ------------------------------------------------------
    # STEP 10 — FINAL RESPONSE
    # ------------------------------------------------------

    return {
        "product_analysis": product_info,

        "intent": search_intent,

        "answer": structured_answer
    }