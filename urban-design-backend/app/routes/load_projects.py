from flask import Blueprint, jsonify
import sqlite3
import json

bp = Blueprint('load_projects', __name__, url_prefix='/api')

@bp.route('load_projects/<username>', methods=['GET'])
def load_projects(username):
    conn = sqlite3.connect("projects.db")
    c = conn.cursor()
    c.execute('''
        SELECT id, project_name, query, filter FROM projects
        WHERE username = ?
    ''', (username,))
    rows = c.fetchall()
    conn.close()

    projects = [
        {
            "id": row[0],
            "project_name": row[1],
            "query": row[2],
            "filter": json.loads(row[3])
        }
        for row in rows
    ]

    return jsonify(projects)
