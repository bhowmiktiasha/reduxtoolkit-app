import { configureStore } from '@reduxjs/toolkit'
import hotelReducer from './HotelSlice'

export default configureStore({
  reducer: {hotel: hotelReducer},
})