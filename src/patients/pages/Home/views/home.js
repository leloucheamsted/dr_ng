import AppBar from "../../../widgets/appBar";
import Boards from "../components/boards";
import Filters from "../components/filters";
import PatientsList from "../components/patients_list";
import FloatingActionButton from "../components/floating_action_button";
import { useDispatch } from 'react-redux'
import { setPatientsR } from "../../../../slice/patientSlicer";
import { useEffect, useState } from "react";
import { getPatients } from "../../../services/patients.service";
import { FakeData } from "../../../services/fake_data";
const Home = () => {
    const dispatch = useDispatch()
    const [dataState, setDataState] = useState([
        FakeData
    ])
    useEffect(() => {
        getPatients().then((data) => {
            console.log(data)
            console.log(FakeData)
            dispatch(setPatientsR(data))
            setDataState([...dataState, data])
            console.log(dataState)
            // setDataState({
            //     dataState: data,

            // })
        })
    }, [])
    return (
        <div className="relative h-screen  bg-[#ede9e6] ">
            <AppBar></AppBar>
            <Boards></Boards>
            <PatientsList params={dataState[0]}></PatientsList>
            <FloatingActionButton params={dataState}></FloatingActionButton>
        </div>
    )
}
export default Home;
