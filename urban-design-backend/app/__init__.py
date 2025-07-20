from flask import Flask
from flask_cors import CORS
import os
import sqlite3

from app.scripts.load_buildings import load_buildings_from_json  # adjust path if needed

def is_db_empty(db_path="buildings.db"):
    if not os.path.exists(db_path):
        return True

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Check if table exists
    cursor.execute("""
        SELECT count(*) FROM sqlite_master WHERE type='table' AND name='buildings';
    """)
    table_exists = cursor.fetchone()[0]

    if not table_exists:
        conn.close()
        return True

    # Check if table has data
    cursor.execute("SELECT COUNT(*) FROM buildings")
    count = cursor.fetchone()[0]
    conn.close()

    return count == 0

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    from .routes import buildings, query
    app.register_blueprint(buildings.bp)
    app.register_blueprint(query.bp)

    # Run loader if DB is empty
    if is_db_empty():
        print("📦 DB is empty. Loading buildings...")
        load_buildings_from_json("app/scripts/buildings.json")
    else:
        print("✅ DB already populated.")

    return app
