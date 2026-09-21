from app.services.gemini_service import analyze_image as gemini_analyze
from app.services.providers.hf_provider import analyze_image as hf_analyze


async def identify_plant(
    image_bytes: bytes,
    mime_type: str
):
    question = """
    Analyze this plant image.

    Identify:
    1. Common plant name
    2. Scientific name, if reasonably identifiable
    3. Plant type
    4. Visible characteristics
    5. Possible uses or notable properties
    6. Confidence level: high, medium, or low

    Do not invent information.
    If the species cannot be determined reliably, say "Unknown" or
    provide the most likely identification with low confidence.
    """

    try:
        print("Trying Gemini for plant identification...")

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