from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from app.extractor import extract_resume_text
from app.parser import parse_resume, parse_job_description
from app.match import resume_match
from app.schemas import MatchResult

import tempfile
from pathlib import Path
import shutil




app = FastAPI(
    title="Resume Analyzer API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://resume-analyzer-alpha-three-23.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Resume Analyzer API is running."
    }


@app.post("/analyze", response_model=MatchResult)
async def analyze_resume(
    job_description: str = Form(...),
    uploaded_file: UploadFile = File(...)
):
    """
    Analyze how well a resume matches a job description.
    """
    with tempfile.NamedTemporaryFile(
    delete=False,
    suffix=Path(uploaded_file.filename).suffix) as temp_file:
        shutil.copyfileobj(uploaded_file.file, temp_file)

    temp_path = Path(temp_file.name)

    resume_text = extract_resume_text(temp_path)

    # Match resume with JD
    try:
        result = resume_match(job_description, resume_text)

    except ValueError as e:
            raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    return result       