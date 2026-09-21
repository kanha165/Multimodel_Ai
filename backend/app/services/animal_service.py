from app.services.gemini_service import analyze_image as gemini_analyze
from app.services.providers.hf_provider import analyze_image as hf_analyze


async def identify_animal(
    image_bytes: bytes,
    mime_type: str
):
    question = """
    Analyze this animal image.

    Identify:
    1. Common animal name
    2. Scientific name, if reasonably identifiable
    3. Animal category
    4. Visible physical characteristics
    5. Habitat, if reasonably inferable
    6. Confidence level: high, medium, or low

    Do not invent information.
    If the exact species cannot be determined reliably,
    clearly say so.
    """

    try:
        print("Trying Gemini for animal identification...")

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