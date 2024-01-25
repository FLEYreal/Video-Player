// Basics
import { createRoot } from 'react-dom/client';
import React from 'react';

// Components
import App from "./App.tsx";

// Render application
const root = createRoot(document.getElementById("root")!);
root.render(<App />);