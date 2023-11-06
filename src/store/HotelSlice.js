import { createSlice } from '@reduxjs/toolkit'

export const HotelSlice = createSlice({
    name: 'hotel',
    initialState: {
      hotels: [],
    },
    reducers: {
      setHotels: (state, action) => {
        state.hotels = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setHotels } = HotelSlice.actions
  
  export default HotelSlice.reducer;
  