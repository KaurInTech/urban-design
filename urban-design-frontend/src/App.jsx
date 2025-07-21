// src/App.jsx
import React from 'react';
import { useAppSelector } from './redux/hooks';
import UserNamePrompt from './components/UserNamePrompt';
import ProjectDashboard from './components/ProjectDashboard';

export default function App() {
  const username = useAppSelector((state) => state.user.username);

  return (
    <>
      {!username ? <UserNamePrompt /> : <ProjectDashboard />}
    </>
  );
}
