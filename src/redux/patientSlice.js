import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { FakeData } from "../patients/services/fake_data";


export const getPateintsAsync = createAsyncThunk('patients/getPatientsAsync',
    async () => {
        const response = await fetch('http://localhost:3003/schedule');
        if (response.ok) {
            const patients = await response.json();
            return { patients }
        }
    });
export const addPatientAsync = createAsyncThunk(
    'patieints/AddPatientAsync',
    async (payload) => {
        const response = await fetch('http://localhost:3003/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload.patient)
        })

        if (response.ok) {
            const patient = await response.json();
            return { patient }
        }
    });
export const updatePatientAsync = createAsyncThunk('patients/updatePatientsAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:3003/schedule/${payload.patient.code}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload.patient)
        })

        if (response.ok) {
            const patient = payload.patient

            return { patient }
        }
    })

export const deletePatientAsync = createAsyncThunk(
    'patients/deletePatientAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:3003/schedule/${payload.code}`, {
            method: 'DELETE',
        });

        if (resp.ok) {
            return { code: payload.code };
        }
    }
);
export const patientSlice = createSlice({
    name: 'patients',
    initialState: [],
    reducers: {

        addPatient: (state, action) => {
            let exist = state.patients?.find((e) => e.code === action.payload.code)

            if (!exist) {
                state.push(action.payload)
            }

        },
        updatePatient: (state, action) => {
            const index = state.findIndex(
                (patient) => patient.code === action.payload.code);
            state[index] = action.payload;
        },
        deletePatient: (state, action) => {
            return state.filter((patient) => patient.code !== action.payload.code)
        },

        getPatientByStatus: (state, action) => {
            return state.filter((patient) => patient.status === action.payload.status)
        },

        setPatientsR: (state, action) => {
            // state.value.map((user) => {
            //     if (user.code === action.payload.code) {
            //         user = action.payload;
            //     }
            // });
            state.patients = action.payload

        },




    },
    extraReducers: {
        [getPateintsAsync.pending]: (state, action) => {
            console.log('fetching data ...')
        },
        [getPateintsAsync.fulfilled]: (state, action) => {
            console.log('fetching data successfully!...')
            return action.payload.patients
        },
        [addPatientAsync.fulfilled]: (state, action) => {
            state.push(action.payload.patient);
        },
        [updatePatientAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (patient) => patient.code === action.payload.code);
            state[index] = action.payload;
        },
        [deletePatientAsync.fulfilled]: (state, action) => {
            return state.filter((patient) => patient.code !== action.payload.code)
        }
    }
})


// export var selectPatient = state => state.patient.patients
// export var getPatient = state => state.patient.patients
export var getPatientsByid = id => state => {
    let res = state.patient.find((e) => e.code === id)
    return res
}

export const { addPatient, updatePatient, deletePatient, setPatientsR, getPatientByStatus } = patientSlice.actions

export default patientSlice.reducer
