import { configureStore } from "@reduxjs/toolkit";
import billSlice from "./BillSlice";

const store = configureStore({
    reducer: {
        bill: billSlice.reducer
    }
})

export default store