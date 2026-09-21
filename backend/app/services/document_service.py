from app.services.gemini_service import analyze_image


async def summarize_document(
    image_bytes: bytes,
    mime_type: str
):
    question = """
    Analyze this document image.

    Extract the important information and provide:
    1. A short summary
    2. Main points
    3. Important names, dates, numbers or facts

    Keep the response clear and structured.
    """

    return await analyze_image(
        image_bytes=image_bytes,
        mime_type=mime_type,
        question=question
    )