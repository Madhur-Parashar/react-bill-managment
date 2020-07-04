import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import monthlyBillsReducer from "../reducer/monthlyBillsReducer"

export default configureStore({
  reducer: {
    counter: counterReducer,
    monthlyBills:monthlyBillsReducer
  },
});
