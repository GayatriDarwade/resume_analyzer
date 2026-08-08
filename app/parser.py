import json
from app.schemas import Resume, JobDescription
from app.prompts import resume_parser_prompt, JD_parser_prompt
from app.groq_service import get_client


def parse_resume(resume_text: str) -> Resume:
    """
    Parses the resume text and returns structured information in JSON format.
    """
    client =get_client()
    schema=Resume.model_json_schema()
    response_format = {
        "type": "json_object"
    }

    messages=[
       {
        "role": "system",
        "content":resume_parser_prompt
       },
       {
           "role": "user",
           "content": resume_text
       }

    ]
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        response_format=response_format
    )

    data=response.choices[0].message.content


    ans=json.loads(data)
    resume=Resume(**ans)

    
    return resume


def parse_job_description(job_description_text: str) -> JobDescription:
    """
    Parses the job description text and returns structured information in JSON format.
    """
    client = get_client()
    schema = JobDescription.model_json_schema()
    response_format = {
        "type": "json_object"
    }

    messages = [
        {
            "role": "system",
            "content": JD_parser_prompt
        },
        {
            "role": "user",
            "content": job_description_text
        }
    ]

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        response_format=response_format
    )

    data = response.choices[0].message.content

    ans = json.loads(data)

    if not ans.get("role"):
        raise ValueError(
            "Could not identify a valid job role from the job description. "
            "Please enter a meaningful job description."
        )

    job_description = JobDescription(**ans)

    return job_description