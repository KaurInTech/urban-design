from flask import Blueprint, request, jsonify
import json
import sqlite3

bp = Blueprint('save_project', __name__, url_prefix='/api')

@bp.route('/save_project', methods=['POST'])
def save_project():
    try:
        data = request.get_json()
        username = data.get('username')
        project_name = data.get('project_name')
        query = data.get('query')
        filter_data = data.get('filter')

        if not username or not project_name or not query or not filter_data:
            return jsonify({"error": "Missing required fields"}), 400

        filter_obj = json.dumps(filter_data)

        with sqlite3.connect("projects.db") as conn:
            c = conn.cursor()
            c.execute('''
                CREATE TABLE IF NOT EXISTS projects (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT,
                    project_name TEXT,
                    query TEXT,
                    filter TEXT
                )
            ''')
            c.execute('''
                INSERT INTO projects (username, project_name, query, filter)
                VALUES (?, ?, ?, ?)
            ''', (username, project_name, query, filter_obj))
            conn.commit()

        return jsonify({"message": "✅ Project saved!"})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
