import fitz  # pymupdf
import re
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Download required nltk data
nltk.download('stopwords', quiet=True)
nltk.download('punkt', quiet=True)

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF file"""
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        return text.lower()
    except Exception as e:
        return ""

def extract_skills(text, skills_list):
    """Extract skills from text"""
    found_skills = []
    text_lower = text.lower()
    for skill in skills_list:
        if skill.lower() in text_lower:
            found_skills.append(skill)
    return found_skills

def calculate_ats_score(resume_text, job_description, required_skills):
    """Calculate ATS score based on resume and job description"""
    
    if not resume_text or not job_description:
        return 0, [], []

    # Common tech skills list
    common_skills = [
        'python', 'java', 'javascript', 'react', 'node.js', 'nodejs',
        'express', 'mongodb', 'sql', 'mysql', 'postgresql', 'html', 'css',
        'tailwind', 'bootstrap', 'git', 'github', 'docker', 'aws',
        'machine learning', 'deep learning', 'tensorflow', 'pytorch',
        'pandas', 'numpy', 'scikit-learn', 'flask', 'django', 'fastapi',
        'typescript', 'vue', 'angular', 'next.js', 'rest api', 'graphql',
        'linux', 'agile', 'scrum', 'c++', 'c#', 'php', 'ruby', 'kotlin'
    ]

    # Extract skills from resume
    resume_skills = extract_skills(resume_text, common_skills)
    
    # Extract required skills from job
    job_skills = extract_skills(job_description + ' ' + ' '.join(required_skills), common_skills)

    # Calculate skill match score
    if job_skills:
        matched_skills = [s for s in resume_skills if s in job_skills]
        skill_score = (len(matched_skills) / len(job_skills)) * 100
    else:
        matched_skills = []
        skill_score = 0

    # Calculate text similarity score
    try:
        vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = vectorizer.fit_transform([resume_text, job_description])
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        text_score = similarity * 100
    except:
        text_score = 0

    # Final score (60% skill match + 40% text similarity)
    final_score = (skill_score * 0.6) + (text_score * 0.4)
    final_score = round(min(final_score, 100), 2)

    missing_skills = [s for s in job_skills if s not in resume_skills]

    return final_score, matched_skills, missing_skills