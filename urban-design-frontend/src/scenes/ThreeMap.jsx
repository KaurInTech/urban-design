// ThreeMap.jsx
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import PopUpInfo from '../components/PopUpInfo';
import SearchInput from '../components/SearchInput';
import { setupScene, loadBuildings, handleRaycastClick } from '../utils/threeSetup';
import { handleQuery } from '../utils/queryHandler';

export default function ThreeMap() {
  const mountRef = useRef(null);
  const buildingMeshes = useRef([]);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [message, setMessage] = useState(null);

  const wrappedQueryHandler = async (query) => {
    await handleQuery(query, buildingMeshes.current, setMessage);
  };

  useEffect(() => {
    const { scene, camera, renderer, controls } = setupScene(mountRef);

    loadBuildings(scene, buildingMeshes);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event) => {
      handleRaycastClick(event, renderer, camera, raycaster, mouse, buildingMeshes.current, setSelectedBuilding, setPopupPosition);
    };

    mountRef.current.addEventListener('click', onClick);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.domElement.removeEventListener('click', onClick);
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <SearchInput onSubmit={wrappedQueryHandler} message={message} />
      <div
        ref={mountRef}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'all',
          zIndex: 1,
        }}
      />
      {selectedBuilding && (
        <PopUpInfo building={selectedBuilding} position={popupPosition} />
      )}
    </div>
  );
}
