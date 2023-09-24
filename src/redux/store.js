// store.js
import { configureStore } from '@reduxjs/toolkit'
import warehousesReducer from './warehousesSlice'

const store = configureStore({
  reducer: {
    warehouses: warehousesReducer,
  },
})

export default store
