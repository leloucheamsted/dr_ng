import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Routes, //replaces "Switch" used till v5
    Route,
} from "react-router-dom";
import AppBar from "./patients/widgets/appBar";
import Home from "./patients/pages/Home/views/home";
import Registration from "./patients/pages/Registration/views/registration";

function App() {
  return (
    <div className=" h-auto bg-[#ede9e6]">
            <Routes>
                <Route path="/" element={<Home className="bg-[#ede9e6]"></Home>} />
                <Route path="/registration" element={<Registration />} />
            </Routes>
    </div>
  );
}

export default App;
