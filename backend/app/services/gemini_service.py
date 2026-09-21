import os

from google import genai
from google.genai import types
from dotenv import load_dotenv


load_dotenv()


API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY is not set in .env")


client = genai.Client(api_key=API_KEY)


async def analyze_image(
    image_bytes: bytes,
    mime_type: str,
    question: str
):
    response = client.models.generate_content(
        model="gemini-3.7-flash",
        contents=[
            types.Part.from_bytes(
                data=image_bytes,
                mime_type=mime_type
            ),
            question
        ]
    )

    return response.text