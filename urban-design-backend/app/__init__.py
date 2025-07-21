from flask import Flask
from flask_cors import CORS
import os
import sqlite3

from .routes import load_projects
from .routes import save_project
from .routes import query
from .db import database

def db_and_table_exist():
    if not os.path.exists("projects.db"):
        return False

    try:
        conn = sqlite3.connect("projects.db")
        cursor = conn.cursor()

        cursor.execute("""
            SELECT count(*) FROM sqlite_master
            WHERE type='table' AND name=?;
        """, ("projects",))
        table_exists = cursor.fetchone()[0] == 1

        return table_exists
    finally:
        conn.close()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    app.register_blueprint(load_projects.bp)
    app.register_blueprint(save_project.bp)
    app.register_blueprint(query.bp)

    # Run loader if DB is empty
    if not db_and_table_exist():
        database.init_db()
    else:
        print("✅ DB already populated.")

    return app
