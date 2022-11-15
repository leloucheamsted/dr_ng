import { configureStore } from '@reduxjs/toolkit'
import patientReducer from './slice/patientSlicer'

export default configureStore({
    reducer: {
        patient: patientReducer,
        // form: reduxFormReducer, // mounted under "form"
    },
})
