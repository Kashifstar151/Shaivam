import { createSlice } from '@reduxjs/toolkit';

const FormSlice = createSlice({
    name: 'form',
    initialState: {
        inputValues: {},  // Stores all input values by key
    },
    reducers: {
        setInputValue: (state, action) => {
            const { inputKey, inputValue } = action.payload;
            console.log("🚀 ~ inputKey:", inputKey, inputValue)
            state.inputValues[inputKey] = inputValue;
        },
    },
});

export const { setInputValue } = FormSlice.actions;

export default FormSlice.reducer;