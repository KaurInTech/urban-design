import json
import sqlite3
import os

def load_buildings_from_json(json_path="app/scripts/buildings.json", db_path="buildings.db"):
    # === Step 1: Load buildings.json ===
    with open(json_path, "r", encoding="utf-8") as f:
        geojson_data = json.load(f)

    # === Step 2: Create or reset the database ===
    if os.path.exists(db_path):
        os.remove(db_path)  # Remove for a clean start (optional)

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # === Step 3: Create buildings table ===
    cursor.execute("""
    CREATE TABLE buildings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        osm_id TEXT,
        name TEXT,
        levels INTEGER,
        height REAL,
        type TEXT,
        address TEXT,
        geometry TEXT
    )
    """)

    # === Step 4: Insert building entries ===
    for feature in geojson_data.get("features", []):
        props = feature.get("properties", {})
        geometry = json.dumps(feature.get("geometry", {}))  # Store raw GeoJSON

        osm_id = props.get("@id")
        name = props.get("name")

        # Normalize type
        btype = props.get("building", "").lower()
        btype = "generic" if btype == "yes" else btype

        # Parse levels
        levels = props.get("building:levels")
        try:
            levels = int(levels)
        except (TypeError, ValueError):
            levels = 1

        height = levels * 3  # Estimate height in meters

        # Compose address
        address_parts = [
            props.get("addr:housenumber", ""),
            props.get("addr:street", ""),
            props.get("addr:city", ""),
            props.get("addr:postcode", "")
        ]
        address = ", ".join([part for part in address_parts if part])

        # Insert row
        cursor.execute("""
            INSERT INTO buildings (osm_id, name, levels, height, type, address, geometry)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (osm_id, name, levels, height, btype, address, geometry))

    # === Step 5: Finalize ===
    conn.commit()
    conn.close()
    print(f"✅ Loaded {len(geojson_data['features'])} buildings into {db_path}")


# Optional: allow direct script run
if __name__ == "__main__":
    load_buildings_from_json()
