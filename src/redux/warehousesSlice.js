// warehousesSlice.js
import { createSlice } from '@reduxjs/toolkit'

const warehousesSlice = createSlice({
  name: 'warehouses',
  initialState: [],
  reducers: {
    fetchWarehouses: (state, action) => {
      return action.payload
    },
    editWarehouse: (state, action) => {
      // Update the warehouse data here
      // You can find the warehouse to edit by its ID and update its properties
      // Return a new state object with the updated data
      return state.map((warehouse) =>
        warehouse.id === action.payload.id ? action.payload : warehouse,
      )
    },
  },
})

export const { fetchWarehouses, editWarehouse } = warehousesSlice.actions
export default warehousesSlice.reducer
