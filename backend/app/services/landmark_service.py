from app.services.gemini_service import analyze_image as gemini_analyze
from app.services.providers.hf_provider import analyze_image as hf_analyze


async def identify_landmark(
    image_bytes: bytes,
    mime_type: str
):
    question = """
    Analyze this image and identify the landmark.

    Provide:
    1. Landmark name
    2. City and country, if identifiable
    3. Landmark type
    4. Important visible characteristics
    5. Short historical or cultural context, only if reasonably known
    6. Confidence level: high, medium, or low

    Do not invent information.
    If the landmark cannot be reliably identified, clearly say so.
    """

    try:
        print("Trying Gemini for landmark identification...")

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