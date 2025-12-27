# 🧠🛍️ ClariBuy: Psychometric Product Recommender

**ClariBuy** is a next-generation shopping assistant that moves beyond simple filtering.  
It uses a **psychometric engine** to analyze a user’s decision-making DNA—balancing traits like **Speed & Power**, **Price Sensitivity**, and **Built-to-Last**—to recommend products that truly align with their psychological profile.

---

## ✨ Features

### 🧩 Psychometric Core Quiz
A 5-step MCQ quiz that builds your **“Buying DNA”** profile across five traits:
- Performance  
- Budget  
- Brand  
- Simplicity  
- Longevity  

### 📊 Dynamic Category Overview
Personalized product matches across:
- Laptops  
- TVs  
- Phones  
- Headphones  

Based on your initial psychometric profile.

### 🤖 AI Psychometric Insights
Powered by **Gemini 1.5 Flash**, delivering deep explanations of *why* a product matches your unique value system.

### 🧬 Technical DNA Modal
A floating visualization window that shows the **raw technical trait scores** of any product.

### ⚔️ Head-to-Head Comparison
Compare up to **3 products side-by-side** with:
- Synchronized psychometric trait bars  
- Detailed spec breakdowns  

### ⚙️ Normalization Engine
Advanced backend logic ensures recommendation accuracy even as users refine their answers over time.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS** (Dark Mode UI)
- **Lucide React** / **Framer Motion** (Animations)

### Backend
- **FastAPI** (Python)
- **Google Gemini AI** (Vertex AI / Generative AI SDK)
- **Pydantic** (Data Validation)

---

## 📂 Project Structure

```plaintext
├── backend/
│   ├── app/
│   │   ├── main.py               # API Endpoints
│   │   ├── recommender.py        # Scoring & Normalization Logic
|   |   ├── recommender.py
│   │   ├── core_questions.py     # MCQ Pool (Source of Truth)
│   │   ├── category_questions.py # MCQ Pool for Phones, PC, TV, etc.
│   │   └── ai_explainer.py       # Gemini AI integration
│   └── data/
│       └── products.json         # Unified product database with trait specs
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SpecModal.jsx     # Floating spec window
│   │   │   └── ComparisonMode.jsx# Side-by-side view
│   │   ├── pages/
│   │   │   ├── CoreQuiz.jsx      # Psychometric onboarding
│   │   │   ├── Overview.jsx      # Category discovery
│   │   │   └── Results.jsx       # AI analysis & final matches
│   │   └── api.js                # Centralized fetch calls with normalization
|   |   └── api.js
        └── api.js

```
## 🚀 Getting Started

### 1️⃣ Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Add your GOOGLE_API_KEY to environment variables
uvicorn app.main:app --reload
2️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
🎯 Future Roadmap
User Authentication
Login / Sign-in to save your Psychometric Signature

Persona Clustering
Group users into profiles like “The Pragmatic Student” or “The Premium Power User” using K-Means or similar logic

Cross-Category Recommendations
Suggest a phone based on your laptop buying psychology

PDF Export
Generate a downloadable Buyer’s Report with AI-drafted pros & cons

