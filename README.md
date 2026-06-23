# 🎯 AI-Job Application Tracking System (ATS)

> A full-stack recruitment platform that streamlines hiring through AI-powered resume scoring, intelligent candidate evaluation, and centralized application management.

![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?logo=react\&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Framework-Express.js-000000?logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb\&logoColor=white)
![Python](https://img.shields.io/badge/AI-Python%20%2B%20Flask-3776AB?logo=python\&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-black?logo=jsonwebtokens)

## 📖 Overview

The ** AI-Job Application Tracking System (ATS)** is a full-stack web application developed as a **B.Tech Artificial Intelligence & Data Science Mini Project**.

The platform helps recruiters efficiently manage job postings, evaluate candidates, and track recruitment progress, while enabling candidates to search jobs, upload resumes, and monitor their application status.

A dedicated AI module automatically analyzes uploaded resumes and generates ATS scores, helping recruiters identify the most suitable candidates quickly and objectively.

## ❓ Problem Statement

Traditional recruitment processes often involve manually reviewing hundreds of resumes, resulting in:

* ⏳ Time-consuming screening processes
* 📄 Difficulty in comparing candidates objectively
* 📊 Lack of candidate ranking mechanisms
* 📧 Poor application tracking
* 🔍 Limited visibility into resume-job matching

This project addresses these challenges through AI-driven resume evaluation and centralized recruitment management.

## 🎯 Objectives

* Build a secure role-based recruitment platform.
* Simplify job posting and applicant management.
* Enable candidates to apply and track applications efficiently.
* Implement AI-powered resume scoring.
* Automatically rank candidates based on ATS scores.
* Improve hiring efficiency through automation.

## ✨ Features

### 👩‍💼 Candidate Module

* Secure Registration & Login
* Candidate Dashboard
* Profile Management
* Job Search & Filtering
* Resume Upload
* Apply for Jobs
* Application Status Tracking
* Notifications

### 🏢 Recruiter Module

* Recruiter Dashboard
* Create Job Postings
* Manage Job Listings
* View Applicants
* Candidate Evaluation
* Application Status Management
* ATS-Based Candidate Ranking

### 🤖 AI Resume Scoring Engine

* Resume Text Extraction
* Skill Matching
* Resume Analysis
* ATS Score Generation
* Candidate Ranking Support

## 🏗️ System Architecture

```text
┌─────────────────────────────┐
│       React Frontend        │
│ Candidate & Recruiter UI    │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│    Node.js + Express API    │
│ Authentication & Business   │
│ Logic Layer                 │
└───────┬───────────┬─────────┘
        │           │
        ▼           ▼
┌─────────────┐  ┌──────────────┐
│   MongoDB   │  │ Python Flask │
│  Database   │  │ AI Scoring   │
└─────────────┘  └──────────────┘
```

## 🛠 Technology Stack

| Layer          | Technology                   |
| -------------- | ---------------------------- |
| Frontend       | React.js, Vite, Tailwind CSS |
| Backend        | Node.js, Express.js          |
| Database       | MongoDB, Mongoose            |
| Authentication | JWT, bcrypt                  |
| File Uploads   | Multer                       |
| AI Module      | Python, Flask                |
| API Testing    | Postman                      |


## 📂 Project Structure

```text
Mini-project/
│
├── ai-module/
│   ├── app.py
│   └── scorer.py
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── AI_ATS_Mini_Project.pptx
└── README.md
```

## 🚀 Installation Guide

### Clone Repository

```bash
git clone https://github.com/yudeshna/Mini-project.git
cd Mini-project
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### AI Module Setup

```bash
cd ai-module
pip install -r requirements.txt
python app.py
```

## 🔐 Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## 📡 Core Functionalities

### Authentication

* JWT-Based Login & Registration
* Role-Based Access Control

### Job Management

* Create, Update, Delete Jobs
* Browse Available Opportunities

### Application Management

* Apply for Jobs
* Track Application Status
* Candidate Evaluation

### Resume Analysis

* Resume Upload
* ATS Score Calculation
* Candidate Ranking

## 🖼 Screenshots

Screenshots can be added here after deployment.

* Login Page
* Candidate Dashboard
* Recruiter Dashboard
* Job Search Page
* Applications Page
* ATS Scoring Results
  
## 🚀 Future Enhancements

* 📅 Interview Scheduling
* 📧 Email Notifications
* 🧠 Advanced NLP-Based Resume Parsing
* 📊 Recruitment Analytics Dashboard
* ☁️ Cloud Deployment
* 💬 Real-Time Communication Features

## 👥 Project Team

This project was developed as a **group academic project** for the B.Tech Artificial Intelligence & Data Science curriculum.

### Team Members

* N.Yudeshna
* k.Harish
* G.Sravanth

### Repository Maintainer

* Yudeshna Nalla

## 🎓 Academic Project

Developed as part of the Bachelor of Technology (B.Tech) program in Artificial Intelligence & Data Science.

⭐ Thank you for visiting our project repository.
