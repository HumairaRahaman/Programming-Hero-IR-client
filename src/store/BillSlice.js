import { createSlice } from "@reduxjs/toolkit";

const billSlice = createSlice({
  name: "bill",
  initialState: {
    allBill: [],
    total: 0,
    currentPage: 1,
    searchResult: []
  },
  reducers: {
    setAllBill: (state, action) => {
      state.allBill = action.payload;
      let amount = 0
      state.allBill.forEach(item => amount += parseInt(item.amount))
      state.total = amount
    },
    addBill: (state, action) => {
      state.allBill = [action.payload, ...state.allBill];
      state.total += parseInt(action.payload.amount)
    },
    removeFirstBill: (state, action) => {
      state.allBill = state.allBill.shift();
      state.amount -= parseInt(action.payload)
    },
    changeBillId: (state, action) => {
      state.allBill = state.allBill.map((item) => {
        if (item._id === "creating") return { ...item, _id: action.payload.id };
        return item;
      });
    },
    removeBill: (state, action) => {
        state.allBill = state.allBill.filter(item => item._id !== action.payload)
    },
    updateBill: (state,action) => {
        state.allBill = state.allBill.map(item => {
            if(item._id === action.payload.id) return action.payload.data
            else return item
        })
        let amount = 0
      state.allBill.forEach(item => amount += parseInt(item.amount))
      state.total = amount
    },
    changeAmount: (state, action) => {
        state.total += action.payload
    },
    setCurrentPage: (state, action) => {
        state.currentPage = action.payload
    },
    searchBill: (state, action) => {
      state.searchResult = state.allBill.filter(item => item._id === action.payload || item.name === action.payload || item.email === action.payload || item.phone === action.payload || item.amount === action.payload)
    }
  },
});

export const { setAllBill, addBill, removeFirstBill, changeBillId, removeBill, updateBill, changeAmount, setCurrentPage, searchBill } =
  billSlice.actions;

export default billSlice;
