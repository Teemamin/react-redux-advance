import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCartData = createAsyncThunk(
    'cart/fetchData',
    async ()=>{
        const response = await fetch('https://teemamin-react-default-rtdb.europe-west1.firebasedatabase.app/cart.json')
        if(!response.ok){
            throw new Error('somthing went wrong fetching the cart')
        }
        const data = await response.json()
        return {
                cartItems: data?.cartItems || [],
                totalQty: data?.totalQty  || 0,
                }

    }
)

export const sendCartData = createAsyncThunk(
    'cart/sendData',
    async (cart) => {
        const response = await fetch('https://teemamin-react-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT', 
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(cart),
            })
            if(!response.ok){
                throw new Error('somthing went wrong sending the cart')
            }
          }
    )

    //the below is the alternative way od doing side effects without createThunk

// export const fetchCartData = ()=>{
//     return async (dispatch)=>{
//         const fetchData = async () => {
//             const response = await fetch('https://teemamin-react-default-rtdb.europe-west1.firebasedatabase.app/cart.json')
//             if(!response.ok){
//                 throw new Error('somthing went wrong fetching the cart')
//             }
//             const data = await response.json()
//             return data
//         }
//         try{
//             const cartData = await fetchData();
//             dispatch(
//               cartActions.replaceCart({
//                 items: cartData.cartItems || [],
//                 totalQuantity: cartData.totalQty,
//               })
//             );
//        }catch(err){
//            dispatch(uiActions.showNotification({
//                status: 'error',
//                title: 'faild',
//                message: 'failed to fetch cart data'
//              }))
//        }
//     }
    
// }

// export const sendCartData = (cart) => {
    //redux will execute this function for you and pass the dispatch args automatically
    //this allows us to have action creators that can perform side effects then disptach other actions which eventually reaches the reducers
    //thus avoiding the issue of performing side effect directly in reducer
//     return async (dispatch) => {
//         dispatch(uiActions.showNotification({
//             status: 'pending',
//             title: 'send cart',
//             message: 'sending cart data'
//           }))
//           const sendRequest = async () => {
//                 const response = await fetch('https://teemamin-react-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
//                 method: 'PUT', 
//                 headers: {
//                 'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(cart),
//             })
//             if(!response.ok){
//                 throw new Error('somthing went wrong sending the cart')
//             }
//           }

//         try{
//             await sendRequest()
//             dispatch(uiActions.showNotification({
//                 status: 'success',
//                 title: 'cart sent',
//                 message: 'successfully sent cart data'
//               }))
//         }catch(err){
//             dispatch(uiActions.showNotification({
//                 status: 'error',
//                 title: 'faild',
//                 message: 'failed to send cart data'
//               }))
//         }
//     }
    
// }