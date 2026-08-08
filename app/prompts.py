from app.schemas import JobDescription, MatchResult, Resume
import json


resume_schema = json.dumps(
    Resume.model_json_schema(),
    indent=2
)

jd_schema = json.dumps(
    JobDescription.model_json_schema(),
    indent=2
)


match_schema = json.dumps(
    MatchResult.model_json_schema(),
    indent=2
)

resume_parser_prompt = f"""
You are an expert resume information extraction assistant.

Your task is to extract structured information from the provided resume text 
for resume-job matching.

Follow this Resume schema strictly:

{resume_schema}

Extract the following information:
- Candidate name (if available)
- Technical and professional skills
- Work experience including company, role, duration, description, and skills used
- Educational qualifications
- Projects including descriptions and technologies used
- Certifications

Extraction priorities:
1. Skills
2. Work experience
3. Projects
4. Education
5. Certifications

Important rules:
- Do not invent or assume information.
- Extract only information explicitly available in the resume.
- If information is missing, return null or an empty list according to the schema.
- Ignore irrelevant personal information such as phone number, address, or other non-job-related details.
- The resume text may contain formatting issues due to PDF extraction. Interpret the content carefully.
- Return only the structured output. Do not add explanations or markdown.
-Return ONLY a valid JSON object.

"""

JD_parser_prompt = f"""

You are an expert HR job description analysis assistant.

Your task is to extract structured information from the provided job description
for resume-job matching.

Follow this JobDescription schema strictly:

{jd_schema}

Extract the following information:
- Job role or position title
- Required skills that are mandatory for the role
- Preferred skills that are nice-to-have but not mandatory
- Minimum years of experience required
- Education requirements
- Key responsibilities of the role

Important instructions:
- Do not invent information that is not present in the job description.
- Clearly separate required skills from preferred skills.
- If experience is not mentioned, return null.
- If any field is missing, return null or an empty list according to the schema.
- Focus only on information relevant for candidate-job matching.
- Return only the structured output. Do not include explanations or markdown.
-Return ONLY a valid JSON object.
"""

match_analysis_prompt = f"""
You are an expert ATS and HR recruitment assistant.

Compare the provided Resume JSON and Job Description JSON.

Evaluate:

- Required skills
- Preferred skills
- Experience
- Education
- Projects
- Certifications

Generate:
- Match score (0–100)
- Matched skills
- Missing skills
- Strengths
- Weaknesses
- Recommendation
- Reasoning

Return only the MatchResult schema given below:
{match_schema}
"""