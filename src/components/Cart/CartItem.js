import classes from './CartItem.module.css';
import { cartActions } from '../../store/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = (props) => {
  const { title, quantity, price,id } = props.item;
  const itm = { title, quantity:1, price,id }
  const dispatch = useDispatch()

  const removeItemHandler = ()=>{
    dispatch(cartActions.removeItemFromCart(id))
  }

  const increaseItemHandler = ()=>{
    dispatch(cartActions.addToCart(itm))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          {/* ${total.toFixed(2)}{' '} */}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={increaseItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
