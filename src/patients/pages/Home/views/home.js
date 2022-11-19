import AppBar from "../../../widgets/appBar";
import Boards from "../components/boards";
import PatientsList from "../components/patients_list";
import FloatingActionButton from "../components/floating_action_button";
import { deletePatient, setPatientsR, getPatientByStatus, getPateintsAsync, deletePatientAsync } from "../../../../redux/patientSlice";
import { useEffect, useState } from "react";
import { getPatients } from "../../../services/patients.service";
import { FakeData } from "../../../services/fake_data";
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
    const dispacth = useDispatch()

    const patients = useSelector((state) => state.patient)
    useEffect(() => {
        dispacth(getPateintsAsync())
    }, [dispacth])
    const deleteP = (e) => {
        if (e) {
            console.log(e.target.value ?? "")
            dispacth(deletePatientAsync({
                code: e.target.value
            }))
        }
    }

    return (
        <div className="relative h-screen  bg-[#ede9e6] ">
            <AppBar></AppBar>
            <Boards data={patients}></Boards>
            <PatientsList handleDeletePatient={deleteP} params={patients}></PatientsList>
            <FloatingActionButton params={patients.length}></FloatingActionButton>
        </div>
    )
}
export default Home;
