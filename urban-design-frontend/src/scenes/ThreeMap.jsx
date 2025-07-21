// ThreeMap.jsx
import { useRef, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import * as THREE from 'three';
import PopUpInfo from '../components/PopUpInfo';
import SearchInput from '../components/SearchInput';
import { setupScene, loadBuildings, handleRaycastClick } from '../utils/threeSetup';
import {fetchQueryFilter} from '../redux/querySlice'
import {saveProject} from '../redux/projectSlice'
import { resetQuery } from '../redux/querySlice';

import { Card, CardContent } from '@mui/material';

export default function ThreeMap({ onExternalFilter }) {
  const username = useSelector((state) => state.user.username);
  const [resetCounter, setResetCounter] = useState(0);
  const lastQuery = useSelector((state) => state.query.lastQuery);
  const lastFilter = useSelector((state) => state.query.lastFilter);
  const mountRef = useRef(null);
  const buildingMeshes = useRef([]);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const wrappedQueryHandler = async (query) => {
    try {
      const result = await dispatch(fetchQueryFilter(query)).unwrap();
      console.log("result",result)

      const { filter } = result;
      if (!filter) throw new Error('Invalid filter');
      highlightBuildings(filter);

    } catch (err) {
      console.error('❌ Query processing failed:', err);
      setMessage({
        type: 'error',
        text: '❌ Something went wrong',
      });
      setTimeout(() => setMessage(null), 2500);
    }
  };

  const highlightBuildings = (filter) => {
    console.log("filter",filter)
    const { attribute, operator, value } = filter;
    let matchCount = 0;

    buildingMeshes.current.forEach((mesh) => {
      const meshValue = mesh.userData[attribute];
      let isMatch = false;

      switch (operator) {
        case '>': isMatch = meshValue > value; break;
        case '<': isMatch = meshValue < value; break;
        case '>=': isMatch = meshValue >= value; break;
        case '<=': isMatch = meshValue <= value; break;
        case '=':
        case '==': isMatch = meshValue == value; break;
        case '!=': isMatch = meshValue != value; break;
        default: break;
      }

      if (isMatch) {
        mesh.material.color.set('red');
        matchCount++;
      } else {
        mesh.material.color.set(0x888888);
      }
    });

    setMessage({
      type: matchCount > 0 ? 'success' : 'error',
      text: matchCount > 0
        ? `✅ Highlighted ${matchCount} building${matchCount > 1 ? 's' : ''}`
        : '❌ No buildings matched this filter',
    });

    setTimeout(() => setMessage(null), 2500);
  };

  const saveProjectHandler = async (query) => {
    if (!username || !lastFilter) return;
    const projectName = window.prompt("Enter a name for your project:", query); // default to query

    if (!projectName) return; // user cancelled or entered empty
    try {
      await dispatch(
        saveProject({
          username,
          project_name: projectName,
          query,
          filter: lastFilter,
        })
      ).unwrap();

      dispatch(resetQuery());
      setResetCounter((prev) => prev + 1);

      setMessage({
        type: 'success',
        text: `✅ Project is successfully saved with query: ${query}`,
      });
      setTimeout(() => setMessage(null), 2500);

    } catch (err) {
      console.error('Save failed:', err);
      setMessage({
        type: 'error',
        text: 'Saving project failed.',
      });
    }
  };

  useEffect(() => {
    if (onExternalFilter) {
      onExternalFilter.current = highlightBuildings;
    }
  }, [onExternalFilter]);

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
    <div className="bg-black min-h-screen w-full flex flex-col items-center ">
      {/* Search Input */}
      <div className="w-full flex justify-center mb-4">
        <Card className="w-full max-w-3xl bg-gray-900 text-white shadow-md rounded-lg">
          <CardContent>
          <SearchInput
            onSubmit={wrappedQueryHandler}
            onSaveProject={saveProjectHandler}
            message={message}
            canSave={!!lastFilter && Object.keys(lastFilter).length > 0}
            resetTrigger={resetCounter}
          />
          </CardContent>
        </Card>
      </div>


      {/* 3D Map Canvas */}
      <div className="w-full flex justify-center">
          <div
            ref={mountRef}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          {selectedBuilding && (
            <PopUpInfo building={selectedBuilding} position={popupPosition} />
          )}
      </div>
    </div>
  );
}
