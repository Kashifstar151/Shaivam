import { createSlice } from '@reduxjs/toolkit';

const FormSlice = createSlice({
    name: 'form',
    initialState: {
        inputValues: {},  // Stores all input values by key
    },
    reducers: {
        setInputValue: (state, action) => {
            const { inputKey, inputValue } = action.payload;
            if (inputKey == 'empty') {
                state.inputValues = {}
            } else {
                state.inputValues[inputKey] = inputValue;
            }
        },
    },
});

export const { setInputValue } = FormSlice.actions;

export default FormSlice.reducer;