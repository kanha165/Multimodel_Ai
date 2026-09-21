import os

from dotenv import load_dotenv
from huggingface_hub import InferenceClient


load_dotenv()


HF_TOKEN = os.getenv("HF_TOKEN")

if not HF_TOKEN:
    raise ValueError("HF_TOKEN is not set in .env")


client = InferenceClient(
    api_key=HF_TOKEN,
    provider="auto"
)


async def analyze_image(
    image_bytes: bytes,
    mime_type: str,
    question: str
):

    response = client.chat.completions.create(
        model="Qwen/Qwen2.5-VL-3B-Instruct",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": question
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": (
                                f"data:{mime_type};base64,"
                                + __import__("base64")
                                .b64encode(image_bytes)
                                .decode("utf-8")
                            )
                        }
                    }
                ]
            }
        ]
    )

    return response.choices[0].message.content