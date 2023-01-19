import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const cartItems = useSelector(state=>state.cart.cartItems)
  let cartContent = <p>Your cart is empty</p>
  if(cartItems.length > 0){
   cartContent = cartItems.map(item=><CartItem 
      item={{ title: item.title, quantity: item.quantity, total: item.total, price: item.price, id:item.id }}
      key={item.id}
    />)
  }
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        { cartContent}
        
      </ul>
    </Card>
  );
};

export default Cart;
