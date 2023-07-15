import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    errors: []
}

// {
//     "id": "",
//     "pageName": "",
//     "message": "",
//     "errorType": ""
// }

export const pageErrors = createSlice({
    name: 'pageErrors',
    initialState,
    reducers: {
        addError: (state, action) => {
            const message = action.payload
            let obj = {
                "id": Date.now(),
                "message": message,
            }
            state.errors.push(obj)
        },
        removeError: (state, action) => {
            let id = action.payload
            state.errors = state.errors.filter(item => item.id != id)
        }
    }
})

export const { addError, removeError } = pageErrors.actions

export default pageErrors.reducer