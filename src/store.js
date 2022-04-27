import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './app/rootReducer'

const store = configureStore ({
    reducer: rootReducer
})

export default store