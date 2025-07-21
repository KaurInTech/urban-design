# 🏙️ Urban Design 3D City Dashboard with LLM Querying

## 🚀 Overview
This is a full-stack MVP (Minimum Viable Product) dashboard that visualizes buildings in Calgary using OpenStreetMap data, enables users to query the map using natural language, and provides the ability to save and reload those queries as projects.

The solution demonstrates 3D visualization, LLM-assisted filtering, and project persistence through a robust integration of modern frontend and backend tools.

---

## 🧰 Tech Stack

| Layer     | Technologies |
|-----------|--------------|
| Frontend  | React, Three.js, Redux, TypeScript, TailwindCSS, Material UI |
| Backend   | Python, Flask, SQLite |
| AI/LLM    | Hugging Face Inference API (`bigscience/T0pp`) |

---

## 📌 Dataset Notes and Usable Filters

The building dataset is sourced from **OpenStreetMap (OSM)** for a few Calgary city blocks. While some metadata like *zoning* or *assessed value* is **not** available, this project is still capable of handling rich queries using the following available attributes:

### ✅ Usable Filter Fields

| Attribute | Description | Example Values |
|-----------|-------------|----------------|
| `height`  | Building height in meters | 15.2, 25, etc. |
| `levels`  | Number of building floors | 1, 5, etc. |
| `type`    | Type/category of building | `school`, `government`, `commercial`, etc. |

### ❌ Unsupported Fields
- `zoning type`
- `assessed value`
- `residential` classification (not guaranteed)

### 🧪 Example Valid Queries

- "Highlight buildings taller than 20 meters"
- "Show buildings with more than 3 levels"
- "Show buildings of type commercial"

⚠️ Avoid unsupported queries like:
- "Show buildings in RC-G zoning"
- "Show buildings under $500,000 in value"
- "Show residential buildings"

---

## 💡 Features

### 1. 🏗️ 3D City Visualization
- Loads building footprint data and extrudes them into 3D using `Three.js`
- Intuitive camera controls (orbit, zoom)
- Building popup appears on click showing basic info

### 2. 💬 Natural Language Querying via LLM
- Users can type freeform queries (e.g., “highlight buildings with 3+ floors”)
- Query is sent to Hugging Face's LLM
- Filter returned as JSON → buildings are filtered and highlighted in color
- Random dark color applied for each filter for better distinction

### 3. 💾 Project Saving and Loading
- Each user starts by entering a username (lightweight identification)
- Each project includes:
  - A natural language query
  - The interpreted filter (as returned by LLM)
- Projects can be reloaded with one click, automatically applying the saved filter again

### 🔁 Multiple Filters Supported
- Each saved project stores a single LLM query + its filter
- User can save multiple projects under one username
- Easily toggle between projects for comparative analysis

---

## 📦 Folder Structure

```bash
urban-design/
├── urban-design-frontend/   # React + Three.js frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── urban-design-backend/    # Flask backend
│   ├── app.py
│   ├── buildings.db
│   ├── .env
│   ├── requirements.txt
│   └── ...
└── README.md


# 🧠 How LLM Integration Works

## 1. 🧑 User types:
```
highlight buildings over 100 feet
```

## 2. 🔁 Backend sends to Hugging Face:
```
Extract the filter from this query: highlight buildings over 100 feet.
Return a JSON object with 'attribute', 'operator', and 'value'
```

## 3. 🤖 Hugging Face returns:
```json
{ "attribute": "height", "operator": ">", "value": 100 }
```
✅ Backend applies filter → Matching buildings are highlighted in the 3D view

---

## ⚙️ Backend Setup Instructions

Clone the repo and move into backend folder:
```bash
cd urban-design-backend
```

Create and activate a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install required dependencies:
```bash
pip install -r requirements.txt
```

Create a .env file to store your Hugging Face API Key:
```env
HUGGINGFACE_API_KEY=your_token_here
```
👉 Get your free API token from: https://huggingface.co/settings/tokens

Start the backend server:
```bash
python app.py
```

---

## 💻 Frontend Setup Instructions

Move into frontend folder:
```bash
cd urban-design-frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
➡️ The frontend will run on http://localhost:5173 by default

---

## ✅ Minimum Viable Product (MVP)

This project demonstrates the minimum required functionality for the MASIV intern test:

- ✅ Real backend + LLM integration  
- ✅ AI-powered text-to-filter translation  
- ✅ 3D visualization of Calgary buildings  
- ✅ User and project saving/loading  

---

## 🛠️ Potential Future Improvements

- Add zoning and assessed value from Calgary’s official Open Data API  
- Support multi-filter stacking (AND/OR)  
- Integrate authentication and user dashboard  
- Use local LLMs or more advanced models  
- Enable drawing / bounding box filters  
- Add area or geospatial filtering by coordinates  

---

## 📎 UML Diagrams

Diagrams for frontend and backend flow are available in the backend and frontend directories in README.md file.


