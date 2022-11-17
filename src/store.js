import { configureStore } from '@reduxjs/toolkit'
import patientReducer from './slice/patientSlicer'
import { reducer as reduxFormReducer } from 'redux-form';

export default configureStore({
    reducer: {
        patient: patientReducer,
        form: reduxFormReducer, // mounted under "form"
    },
})
