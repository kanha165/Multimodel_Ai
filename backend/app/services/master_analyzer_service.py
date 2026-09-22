from app.services.ocr_service import extract_text
from app.services.vision_service import analyze_image as vision_analyze

from app.services.product_service import identify_product
from app.services.plant_service import identify_plant
from app.services.animal_service import identify_animal
from app.services.landmark_service import identify_landmark
from app.services.document_service import summarize_document


async def master_analyze(
    image_bytes: bytes,
    mime_type: str,
    question: str = ""
):
    # =====================================================
    # 1. OCR
    # =====================================================

    ocr_result = await extract_text(image_bytes)

    full_text = " ".join(
        item["text"]
        for item in ocr_result
    )

    has_text = len(full_text.strip()) > 0

    # =====================================================
    # 2. VISION CLASSIFICATION
    # =====================================================

    classification_prompt = f"""
    Analyze this image and determine the MAIN type of content.

    User question:
    {question if question else "No specific question"}

    OCR text detected:
    {full_text if has_text else "No meaningful text detected"}

    Choose exactly ONE category:

    - product
    - plant
    - animal
    - landmark
    - document
    - text
    - general

    Rules:

    product:
    A commercially purchasable physical product.

    plant:
    A plant, flower, tree, leaf, etc.

    animal:
    A real animal.

    landmark:
    A recognizable building, monument, tourist attraction,
    historical place or famous location.

    document:
    A document, form, certificate, report, receipt,
    newspaper, ID-like document, or structured paper.

    text:
    Mainly text where OCR extraction is the primary task.

    general:
    Anything else.

    Important:
    Do not classify an animal, plant or landmark as a product.

    Return ONLY valid JSON:

    {{
        "category": "product",
        "confidence": "high",
        "reason": "short reason"
    }}
    """

    vision_result = await vision_analyze(
        image_bytes=image_bytes,
        mime_type=mime_type,
        question=classification_prompt
    )

    category = "general"
    classification_confidence = "low"
    classification_reason = ""

    try:
        import json

        cleaned = vision_result["answer"].strip()

        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]

        elif cleaned.startswith("```"):
            cleaned = cleaned[3:]

        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]

        classification = json.loads(
            cleaned.strip()
        )

        category = classification.get(
            "category",
            "general"
        ).lower()

        classification_confidence = classification.get(
            "confidence",
            "low"
        )

        classification_reason = classification.get(
            "reason",
            ""
        )

    except Exception:
        category = "general"

    # =====================================================
    # 3. TEXT
    # =====================================================

    if category == "text":
        return {
            "type": "text",
            "provider": "easyocr",
            "ocr": ocr_result,
            "text": full_text,
            "classification": {
                "confidence": classification_confidence,
                "reason": classification_reason
            }
        }

    # =====================================================
    # 4. DOCUMENT
    # =====================================================

    if category == "document":
        result = await summarize_document(
            image_bytes=image_bytes,
            mime_type=mime_type
        )

        return {
            "type": "document",
            "ocr": ocr_result,
            "result": result,
            "classification": {
                "confidence": classification_confidence,
                "reason": classification_reason
            }
        }

    # =====================================================
    # 5. PRODUCT
    # =====================================================

    if category == "product":
        result = await identify_product(
            image_bytes=image_bytes,
            mime_type=mime_type
        )

        return {
            "type": "product",
            "ocr": ocr_result,
            "result": result,
            "classification": {
                "confidence": classification_confidence,
                "reason": classification_reason
            }
        }

    # =====================================================
    # 6. PLANT
    # =====================================================

    if category == "plant":
        result = await identify_plant(
            image_bytes=image_bytes,
            mime_type=mime_type
        )

        return {
            "type": "plant",
            "ocr": ocr_result,
            "result": result,
            "classification": {
                "confidence": classification_confidence,
                "reason": classification_reason
            }
        }

    # =====================================================
    # 7. ANIMAL
    # =====================================================

    if category == "animal":
        result = await identify_animal(
            image_bytes=image_bytes,
            mime_type=mime_type
        )

        return {
            "type": "animal",
            "ocr": ocr_result,
            "result": result,
            "classification": {
                "confidence": classification_confidence,
                "reason": classification_reason
            }
        }

    # =====================================================
    # 8. LANDMARK
    # =====================================================

    if category == "landmark":
        result = await identify_landmark(
            image_bytes=image_bytes,
            mime_type=mime_type
        )

        return {
            "type": "landmark",
            "ocr": ocr_result,
            "result": result,
            "classification": {
                "confidence": classification_confidence,
                "reason": classification_reason
            }
        }

    # =====================================================
    # 9. GENERAL IMAGE / USER QUESTION
    # =====================================================

    general_question = question.strip()

    if not general_question:
        general_question = """
        Describe this image clearly.

        Identify the main subject,
        important visual details,
        colors,
        objects and context.

        Do not invent information.
        """

    result = await vision_analyze(
        image_bytes=image_bytes,
        mime_type=mime_type,
        question=general_question
    )

    return {
        "type": "general",
        "ocr": ocr_result,
        "result": result,
        "classification": {
            "confidence": classification_confidence,
            "reason": classification_reason
        }
    }