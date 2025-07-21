import sqlite3

def init_db():
    conn = sqlite3.connect('projects.db')
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
    conn.commit()
    conn.close()
