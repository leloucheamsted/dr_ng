import { configureStore } from '@reduxjs/toolkit'
import patientReducer from './patientSlice'
import { reducer as reduxFormReducer } from 'redux-form';

export default configureStore({
    reducer: {
        patient: patientReducer,
        form: reduxFormReducer, // mounted under "form"
    },
})
