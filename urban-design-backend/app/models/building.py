# app/models/building.py
class Building:
    def __init__(self, id=None, osm_id=None, name=None, address=None, type=None, levels=None, height=None, coordinates=None):
        self.osm_id = osm_id
        self.name = name
        self.address = address
        self.type = type
        self.levels = levels
        self.height = height
        self.coordinates = coordinates

    def to_dict(self):
        return self.__dict__
