import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharPick from "./components/CharPick";
import VigziView from "./components/VigziView.tsx";
import KrisView from "./components/KrisView.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CharPick />} />
        <Route path="/vigzi" element={<VigziView />} />
        <Route path="/kris" element={<KrisView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
