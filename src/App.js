import logo from './logo.svg';
import './App.css';
import AppBar from "./patients/widgets/appBar";
import Home from "./patients/pages/Home/views/home";

function App() {
  return (
    <div className=" h-screen bg-[#ede9e6]">
        <Home className="bg-[#ede9e6]"></Home>
    </div>
  );
}

export default App;
