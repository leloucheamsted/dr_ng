import AppBar from "../../../widgets/appBar";
import Boards from "../components/boards";
import Filters from "../components/filters";
import PatientsList from "../components/patients_list";
import FloatingActionButton from "../components/floating_action_button";

function Home(){
    return(
        <div className="relative  bg-[#ede9e6] ">
            <AppBar></AppBar>
            <Boards></Boards>
            <PatientsList></PatientsList>
            <FloatingActionButton></FloatingActionButton>
        </div>
    )
}
export  default  Home;
