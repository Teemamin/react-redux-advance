import { createSlice } from "@reduxjs/toolkit";
import { sendCartData,fetchCartData } from "./cartAction";


//{ title: item.title, quantity: item.quantity, total: item.total, price: item.price }
const initialUIState = { show: true, notification: null}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUIState,
    reducers: {
        toggleCart(state){
            state.showCart = !state.showCart
        },
    },
    extraReducers: {
        [fetchCartData.rejected]: (state, action) => {
            state.notification = {
              status: 'error', 
              title: 'Error!', 
              message: action.error.message || 'Fetch failed'
            };
          },

          [sendCartData.pending]: (state, action) => {
            state.notification = {
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!',
            }
          },
          [sendCartData.fulfilled]: (state, action) => {
            state.notification = {
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!',
            }
          },
          [sendCartData.rejected]: (state, action) => {
            state.notification = {
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!',
            }
          }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice.reducer