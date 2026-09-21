from app.services.gemini_service import analyze_image as gemini_analyze
from app.services.providers.hf_provider import analyze_image as hf_analyze


async def identify_product(
    image_bytes: bytes,
    mime_type: str
):
    question = """
    Analyze this product image.

    Identify:
    1. Product name or likely product type
    2. Product category
    3. Brand, if clearly visible
    4. Main visible features
    5. Color
    6. Confidence level: high, medium, or low

    Do not invent information.
    If something is not visible or uncertain, clearly say "Unknown".
    """

    try:
        print("Trying Gemini for product identification...")

        answer = await gemini_analyze(
            image_bytes=image_bytes,
            mime_type=mime_type,
            question=question
        )

        return {
            "provider": "gemini",
            "result": answer
        }

    except Exception as gemini_error:
        print(f"Gemini failed: {gemini_error}")
        print("Falling back to Hugging Face...")

        answer = await hf_analyze(
            image_bytes=image_bytes,
            mime_type=mime_type,
            question=question
        )

        return {
            "provider": "huggingface",
            "result": answer
        }