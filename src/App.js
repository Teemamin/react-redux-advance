import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector,useDispatch} from 'react-redux'
// import { uiActions } from './store/uiSlice';
import {useEffect} from 'react'
import Notification from './components/UI/Notification';
import {sendCartData} from './store/cartAction'
import{fetchCartData} from './store/cartAction'


let isInitial = true

function App() {
  const showCart = useSelector(state=>state.ui.showCart)
  const cart = useSelector(state=>state.cart)
  // console.log(cart)
  const dispatch = useDispatch()
  const notification = useSelector(state=>state.ui.notification)

  useEffect(()=>{
     dispatch(fetchCartData())
  },[dispatch])

  useEffect(()=>{
    //option 1: using custom action creators as an option to perform side effect
    // async n side effect must not be performed in reducer instead: you can use action creators like sendCartData or inside compnt like
    // done in the below commented out useffect
    if(isInitial){
      isInitial = false
      return
    }
    if(cart.changed){
      dispatch(sendCartData(cart))
    }
    
  },[cart,dispatch])

  // useEffect(()=>{
    //option 2: running async and side effect code in component eg
  //   const sendCart = async ()=>{
  //     dispatch(uiActions.showNotification({
  //       status: 'pending',
  //       title: 'send cart',
  //       message: 'sending cart data'
  //     }))
  //       const response = await fetch('https://teemamin-react-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
  //       method: 'PUT', 
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(cart),
  //     })
  //     if(!response.ok){
  //       throw new Error('somthing went wrong sending the cart')
  //     }
  //     dispatch(uiActions.showNotification({
  //       status: 'success',
  //       title: 'cart sent',
  //       message: 'successfully sent cart data'
  //     }))

  //   }
  //   if(isInitial){
  //     isInitial = false
  //     return
  //   }
  //   sendCart().catch(err=>{
  //     dispatch(uiActions.showNotification({
  //       status: 'error',
  //       title: 'faild',
  //       message: 'failed to send cart data'
  //     }))
  //   })
  // },[cart,dispatch])
  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
