from app.services.gemini_service import analyze_image as gemini_analyze
from app.services.providers.hf_provider import analyze_image as hf_analyze


async def classify_image(
    image_bytes: bytes,
    mime_type: str
):
    question = """
    Identify the main subject in this image.

    Provide:
    1. Object/subject name
    2. Category (plant, animal, product, food, vehicle, person, etc.)
    3. Short description
    4. Confidence level: high, medium, or low

    If you are not sure, clearly say so.
    """

    try:
        print("Trying Gemini for image classification...")

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