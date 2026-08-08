import os
import time
from groq import Groq
from dotenv import load_dotenv

from app.schemas import JobDescription, Resume

load_dotenv()

My_API_Key = os.getenv("GROQ_API_KEY")

if not My_API_Key:
    raise ValueError("GROQ_API_KEY is not set in the environment variables.")

client = Groq(api_key=My_API_Key)

def get_client():
    """
    Returns the Groq client instance.
    """
    return client