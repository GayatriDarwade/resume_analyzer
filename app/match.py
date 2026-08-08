from app.schemas import MatchResult
from app.parser import parse_resume, parse_job_description
from app.prompts import match_analysis_prompt
from app.groq_service import get_client
import json


def resume_match(job_description_text: str, resume_text: str) -> MatchResult:
    """
    Matches a resume against a job description and returns the match result.
    """
    job_description = parse_job_description(job_description_text)
    resume = parse_resume(resume_text)

    client = get_client()
   
    response_format = {
        "type": "json_object"
    }

    messages = [
        {
            "role": "system",
            "content": match_analysis_prompt
        },
        {
            "role": "user",
            "content": f"Job Description: {job_description}\n\nResume: {resume}"
        }
    ]

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        response_format=response_format
    )


    data = response.choices[0].message.content
    print(data)

    ans = json.loads(data)
    match_result = MatchResult(**ans)

    return match_result