import * as THREE from 'three';

export function projectCoords([lng, lat]) {
  const scale = 100000;
  const x = (lng + 114.063) * scale;
  const y = (lat - 51.045) * scale;
  return [x, y];
}

export function createBuildingShape(coords) {
  const shape = new THREE.Shape();
  coords.forEach(([lng, lat], i) => {
    const [x, y] = projectCoords([lng, lat]);
    i === 0 ? shape.moveTo(x, -y) : shape.lineTo(x, -y);
  });
  return shape;
}
