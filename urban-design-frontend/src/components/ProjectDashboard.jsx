import { useRef } from 'react';
import React from "react";
import ThreeMap from "../scenes/ThreeMap";
import ProjectList from "./ProjectList";

export default function ProjectDashboard() {
  const filterHandlerRef = useRef(null);
  return (
    <div className="flex h-screen w-screen bg-black text-white">
      <ProjectList 
        onProjectClick={(filter) => {
          if (filterHandlerRef.current) {
            filterHandlerRef.current(filter);
        }}}
      />
      <div className="w-3/4">
        <ThreeMap onExternalFilter={filterHandlerRef} />
      </div>
    </div>
  );
}
