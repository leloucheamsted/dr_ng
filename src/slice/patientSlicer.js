import { createSlice } from '@reduxjs/toolkit'
import {FakeData} from "../patients/services/fake_data";
export const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        patients:  FakeData,

    },
    reducers: {

        create: (state, action) => {
            let exist = state.patients?.find((e) => e._id === action.payload._id)

            if (!exist) {
                state.patients.push(action.payload)
            }

        },

        setPatientsR: (state, action) => {
            state.value.map((user) => {
                if (user.code === action.payload.code) {
                    user = action.payload;
                }
            });
           // state.patients = action.payload

        },




    }
})


export var selectPatient = state => state.patient.patients
export var getPatients = state => state.patient.patients
export var getPatientsByid = id=> state => {
    let res = state.patient.patients?.find((e) => e._id === id)
    return res
}

export const { create , setPatientsR} = patientSlice.actions

export default patientSlice.reducer
