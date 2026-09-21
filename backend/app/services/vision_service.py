from app.services.gemini_service import analyze_image as gemini_analyze
from app.services.providers.hf_provider import analyze_image as hf_analyze


async def analyze_image(
    image_bytes: bytes,
    mime_type: str,
    question: str
):
    """
    Try Gemini first.
    If Gemini fails, use Hugging Face.
    """

    try:
        print("Trying Gemini API...")

        answer = await gemini_analyze(
            image_bytes=image_bytes,
            mime_type=mime_type,
            question=question
        )

        return {
            "provider": "gemini",
            "answer": answer
        }

    except Exception as gemini_error:

        print(
            f"Gemini failed: {gemini_error}"
        )

        print("Falling back to Hugging Face...")

        answer = await hf_analyze(
            image_bytes=image_bytes,
            mime_type=mime_type,
            question=question
        )

        return {
            "provider": "huggingface",
            "answer": answer
        }