from flask import Blueprint, jsonify
from app.services.building_service import get_all_buildings

bp = Blueprint('buildings', __name__, url_prefix='/api')

@bp.route('/buildings', methods=['GET'])
def get_buildings():
    buildings = get_all_buildings()
    return jsonify(buildings)
