import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createBuildingShape } from './threeUtils';

export function setupScene(mountRef) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfd1e5);
  
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, -300, 300);
    camera.lookAt(0, 0, 0);
  
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
  
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);
    controls.update();
  
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 100, 100);
    scene.add(ambientLight, directionalLight);
  
    return { scene, camera, renderer, controls };
  }
  

  export async function loadBuildings(scene, buildingMeshes) {
    try {
      const res = await fetch("/buildings.json");
      const geojson = await res.json();
      const data = geojson.features;
  
      data.forEach((feature) => {
        const props = feature.properties || {};
        const coords =  feature.geometry?.coordinates[0];
        if (!coords) return;
  
        const shape = createBuildingShape(coords);
        const levels = parseInt(props["building:levels"]) || 1;
        const height = levels * 3;
        const address = [props["addr:housenumber"], props["addr:street"], props["addr:city"], props["addr:postcode"]]
        .filter(Boolean)
        .join(", ");

        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: height,
          bevelEnabled: false,
        });
  
        const material = new THREE.MeshLambertMaterial({
          color: 0x888888,
          side: THREE.DoubleSide,
        });
  
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = {
          id: props["@id"],
          name: props.name || "Unnamed",
          type: props.building === "yes" ? "generic" : props.building || "unknown",
          address,
          levels,
          height,
        };
  
        scene.add(mesh);
        buildingMeshes.current.push(mesh);
      });
    } catch (err) {
      console.error("❌ Failed to load buildings:", err);
    }
  }
  
  export function handleRaycastClick(event, renderer, camera, raycaster, mouse, meshes, setSelectedBuilding, setPopupPosition) {
    const bounds = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes, false);
  
    if (intersects.length > 0) {
      const obj = intersects[0].object;
      const data = obj.userData;
      if (data?.id) {
        setSelectedBuilding(data);
        setPopupPosition({ x: event.clientX, y: event.clientY });
      }
    }
  }
  