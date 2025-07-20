import sqlite3

def get_connection():
    conn = sqlite3.connect("buildings.db")
    conn.row_factory = sqlite3.Row  # so rows become dict-like
    return conn
