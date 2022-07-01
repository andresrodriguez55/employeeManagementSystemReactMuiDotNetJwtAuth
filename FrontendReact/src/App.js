import {Route, HashRouter, Routes} from "react-router-dom";
import CRUD from "./Pages/CRUD/CRUD";
import Login from "./Pages/Login/Login"
import './App.css';

function App() 
{
  return (
    <HashRouter >
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/admin" element={<CRUD/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App; 