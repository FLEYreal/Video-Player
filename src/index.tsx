// Basics
import { createRoot } from 'react-dom/client';

// Components
import App from "./App";

// Render application
const root = createRoot(document.getElementById("root")!);
root.render(<App />);