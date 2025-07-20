from app.db.database import get_connection
import json

def run_query(query, params=()):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(query, params)
    rows = cursor.fetchall()
    columns = [col[0] for col in cursor.description]

    buildings = []
    for row in rows:
        building = dict(zip(columns, row))
        try:
            geo = json.loads(building["geometry"])
            building["coordinates"] = geo.get("coordinates", [])
        except:
            building["coordinates"] = []
        
        del building["geometry"]
        buildings.append(building)

    conn.close()
    return buildings
