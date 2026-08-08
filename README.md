# RResumate — AI Resume Analyzer

RResumate is an AI-powered resume analysis application that compares a candidate's resume with a job description and provides an intelligent assessment of their suitability for the role.

It identifies matching skills, missing skills, strengths, weaknesses, and provides an overall match score and recommendation.

## 🚀 Live Demo

https://resume-analyzer-alpha-three-23.vercel.app

## 📌 Overview

Job seekers often struggle to understand how well their resume matches a particular job description.

RResumate solves this problem by using Large Language Models (LLMs) to analyze both the resume and job description and generate structured insights.

### The application can:

- 📄 Accept PDF and DOCX resumes
- 📝 Analyze job descriptions
- 🤖 Use an LLM to extract structured information
- 🎯 Calculate an overall resume-job match score
- ✅ Identify matched skills
- ❌ Identify missing skills
- 💪 Highlight resume strengths
- ⚠️ Identify weaknesses
- 💡 Provide recommendations
- 📊 Present the results in an easy-to-understand interface

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Axios, CSS
- **Backend:** Python, FastAPI, Pydantic
- **AI:** Groq API, Llama 3.3 70B
- **Document Processing:** PyPDF, python-docx
- **Deployment:** Vercel, Render
- **Version Control:** Git, GitHub

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │        User          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ React + Vite         │
                    │ Frontend             │
                    │      Vercel          │
                    └──────────┬───────────┘
                               │
                          REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │ FastAPI Backend      │
                    │       Render         │
                    └──────────┬───────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
        ┌───────────────┐             ┌────────────────┐
        │ Resume Parser │             │ Job Description│
        │ PDF / DOCX    │             │ Parser         │
        └───────┬───────┘             └───────┬────────┘
                │                             │
                └──────────────┬──────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Groq LLM             │
                    │ Llama 3.3 70B        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Structured Match     │
                    │ Result               │
                    └──────────────────────┘
```

## 🔄 How It Works

1. User uploads a resume in PDF or DOCX format.
2. The backend extracts the resume text.
3. The resume is parsed into structured information using the LLM.
4. The job description is parsed into structured information.
5. The system compares the resume with the job requirements.
6. The LLM generates a structured match result.
7. The frontend displays the score, skills, strengths, weaknesses, and recommendation.

## 📊 Results

RResumate provides:

- **Overall Match Score**
- **Matched Skills**
- **Missing Skills**
- **Strengths**
- **Weaknesses**
- **Recommendation**
- **Detailed Reasoning**

## ☁️ Deployment

The application is deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Repository:** GitHub

The frontend communicates with the FastAPI backend through REST APIs.

## 🔐 Environment Variables

The application uses environment variables to keep API credentials secure.

```env
GROQ_API_KEY=your_groq_api_key
```

> API keys and `.env` files are not committed to the repository.

## 👩‍💻 Author

**Gayatri Darawde**

Computer Engineering Student  
Interested in AI Engineering, Generative AI, Machine Learning, and Backend Development.
