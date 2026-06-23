from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from scorer import extract_text_from_pdf, calculate_ats_score

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'ATS AI Module is running'})

@app.route('/score', methods=['POST'])
def score_resume():
    try:
        data = request.get_json()
        
        resume_path = data.get('resumePath')
        job_description = data.get('jobDescription', '')
        required_skills = data.get('skills', [])

        if not resume_path or not os.path.exists(resume_path):
            return jsonify({'error': 'Resume file not found'}), 400

        # Extract text from resume
        resume_text = extract_text_from_pdf(resume_path)

        if not resume_text:
            return jsonify({'error': 'Could not extract text from resume'}), 400

        # Calculate ATS score
        score, matched_skills, missing_skills = calculate_ats_score(
            resume_text,
            job_description,
            required_skills
        )

        return jsonify({
            'atsScore': score,
            'matchedSkills': matched_skills,
            'missingSkills': missing_skills,
            'resumeText': resume_text[:500]
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=8000, debug=True)