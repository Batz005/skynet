import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    category: "",
};

const categorySlice = createSlice ({
    name: 'category',
    initialState,
    reducers: {
        categorySelected(state, action) {
            const { category } = action.payload
            state.category = category 
        }
    }
}
)

export const { categorySelected } = categorySlice.actions
export default categorySlice.reducer