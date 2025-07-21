# Urban Design 3D City Dashboard with LLM Querying

## 🚀 Overview
This project is a full-stack web dashboard that visualizes Calgary city building data in 3D, supports natural language querying through LLM integration, and allows users to save and reload analysis projects.

### 🔧 Tech Stack
- **Frontend:** React, Three.js, Redux, TypeScript, TailwindCSS, MUI
- **Backend:** Flask, SQLite
- **LLM Integration:** Hugging Face Inference API (`T0pp` model)

---

## 💡 Features

### 1. 3D City Visualization
- Extrudes building footprints into 3D models based on height
- Interactive view with camera control and building click for popup info

### 2. Natural Language Query
- Input text like `"show buildings over 100 feet"`
- Backend sends it to Hugging Face API → Parses into a JSON filter
- Buildings matching filter are highlighted

### 3. Project Persistence
- Enter a username to start
- Save projects (name + query + filter)
- View and reload saved projects with 1 click

---

## 🧠 How LLM Integration Works
1. User types: `highlight buildings over 100 feet`
2. Backend sends:  
Extract the filter from this query: highlight buildings over 100 feet.
Return JSON with 'attribute', 'operator', and 'value'

3. Response:  
```json
{"attribute": "height", "operator": ">", "value": 100}
4. Filter is applied to 3D mesh → Matching buildings highlighted



##  Backend Setup
cd urban-design-backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate
pip install -r requirements.txt
python app.py

## Frontend Setup
cd urban-design-frontend
npm install
npm run dev
