import { createSlice } from "@reduxjs/toolkit";
import { fetchCartData } from "./cartAction";



//{ title: item.title, quantity: item.quantity, total: item.total, price: item.price }
const initialCartState = {cartItems: [],totalQty: 0, changed: false}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        // replaceCart(state, action) {
        //     state.totalQty = action.payload.totalQuantity;
        //     state.cartItems = action.payload.items;
        //   },
        addToCart(state,action){
            let newItem = action.payload
          let exisitingItem = state.cartItems.find(itm=>itm.id === newItem.id)
          state.totalQty++
          state.changed = true
          if(!exisitingItem){
            state.cartItems.push(newItem)
          }else{
            exisitingItem.quantity++
          }
        },
        removeItemFromCart(state,action){
            let exisitingItem = state.cartItems.find(itm=>itm.id === action.payload)
            state.totalQty--
            state.changed = true
            if(exisitingItem.quantity === 1){
                state.cartItems = state.cartItems.filter(itm=> itm.id !== action.payload)
            }else{
                exisitingItem.quantity--
            }
        }
    }, extraReducers: {
      [fetchCartData.fulfilled]: (state, action) => {
        state.cartItems = action.payload.cartItems;
        state.totalQty = action.payload.totalQty;
        
      },
    },
})



export default cartSlice.reducer
export const cartActions = cartSlice.actions