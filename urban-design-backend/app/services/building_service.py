from app.db.db_utils import run_query
from app.models.building import Building

def get_all_buildings():
    rows = run_query("SELECT * FROM buildings")
    return [Building(**row).to_dict() for row in rows]

def query_buildings(attribute, operator, value):
    sql = f"SELECT * FROM buildings WHERE {attribute} {operator} ?"
    rows = run_query(sql, (value,))
    return [Building(**row).to_dict() for row in rows]
