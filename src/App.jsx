import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Home from "./Pages/Home/Home";
import DetalhesEstado from "./Pages/Estado/DetalhesEstado";

function App() {

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/estado/:uf" element={<DetalhesEstado />} />
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
