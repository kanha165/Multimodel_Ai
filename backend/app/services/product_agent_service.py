import json

from app.services.gemini_service import analyze_image as gemini_analyze
from app.services.providers.hf_provider import analyze_image as hf_analyze
from app.services.tavily_service import search_web


async def vision_with_fallback(
    image_bytes: bytes,
    mime_type: str,
    question: str
):
    # Primary: Gemini
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

        # Fallback: Hugging Face
        return await hf_analyze(
            image_bytes=image_bytes,
            mime_type=mime_type,
            question=question
        )


async def product_web_search(
    image_bytes: bytes,
    mime_type: str,
    question: str
):
    # --------------------------------------------------
    # 1. UNDERSTAND PRODUCT IMAGE
    # --------------------------------------------------

    vision_prompt = f"""
    Analyze this product image.

    User question:
    {question}

    Identify:
    - product type
    - brand
    - model
    - color
    - important visible features

    Return a concise description useful for web search.

    Do not invent information.
    """

    product_info = await vision_with_fallback(
        image_bytes=image_bytes,
        mime_type=mime_type,
        question=vision_prompt
    )

    print("Product identified:")
    print(product_info)

    # --------------------------------------------------
    # 2. SEARCH WEB USING TAVILY
    # --------------------------------------------------

    search_query = f"""
    Find real products matching this image:

    {product_info}

    User wants:
    {question}

    Search for relevant products, prices and product pages.
    """

    print("Searching web with Tavily...")

    results = search_web(search_query)

    # --------------------------------------------------
    # 3. PREPARE TAVILY RESULTS
    # --------------------------------------------------

    sources = "\n\n".join(
        f"Title: {item.get('title', '')}\n"
        f"URL: {item.get('url', '')}\n"
        f"Content: {item.get('content', '')}"
        for item in results
    )

    # --------------------------------------------------
    # 4. GENERATE STRUCTURED FINAL ANSWER
    # --------------------------------------------------

    final_prompt = f"""
    You are a product search assistant.

    User question:
    {question}

    Product identified from image:
    {product_info}

    Web search results:
    {sources}

    Return ONLY valid JSON in this exact structure:

    {{
        "answer": "Short answer to the user's question",
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
    - Use only information supported by the web results.
    - Do not invent prices.
    - Do not invent URLs.
    - If price is unavailable, use "Unknown".
    - Include up to 5 relevant products.
    - Keep the answer concise.
    """

    final_answer = await vision_with_fallback(
        image_bytes=image_bytes,
        mime_type=mime_type,
        question=final_prompt
    )

    print("Final AI response:")
    print(final_answer)

    # --------------------------------------------------
    # 5. PARSE JSON
    # --------------------------------------------------

    try:
        structured_answer = json.loads(final_answer)

    except json.JSONDecodeError:
        structured_answer = {
            "answer": final_answer,
            "products": []
        }

    # --------------------------------------------------
    # 6. FINAL RESPONSE
    # --------------------------------------------------

    return {
        "product_analysis": product_info,
        "answer": structured_answer
    }