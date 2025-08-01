from flask import Blueprint, request, jsonify
from app.services.llm_service import extract_filter_from_text

bp = Blueprint('query', __name__, url_prefix='/api')

@bp.route('/query', methods=['POST'])
def query():
    try:
        data = request.get_json()
        user_query = data.get("query", "")

        parsed = extract_filter_from_text(user_query)
        if not parsed:
            return jsonify({"error": "Could not extract filter from query."}), 400
        return jsonify({"filter": parsed})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
