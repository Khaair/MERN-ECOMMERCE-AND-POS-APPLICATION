// Cart.js

import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart } from "../../../store/slices/cartSlice";
import { incrementQuantity } from "../../../store/slices/cartSlice";
import { decrementQuantity } from "../../../store/slices/cartSlice";
import { DeleteOutlined } from "@ant-design/icons";

const CartManage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  console.log(cartItems);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div>
        <h4 className="text-lg">Cart</h4>
        </div>
        <button onClick={() => dispatch(clearCart())}>
        Clear Cart
        </button>
      </div>
      <ul>
        {cartItems?.map((item: any) => (
          <li className="border mb-2 p-3" key={item.id}>
            <div className="flex justify-between items-center ">
              <div>
                <h5 className="text-lg">{item.title}</h5>
                <h5 className="text-lg">${item.price}*{item.quantity}=${item.price*item.quantity}</h5>

                
              </div>
              <div className="border px-1">
                <button onClick={() => dispatch(incrementQuantity(item))}>
                  +
                </button>
                <button className="mx-1">{item.quantity}</button>
                <button onClick={() => dispatch(decrementQuantity(item))}>
                  -
                </button>
              </div>
              <div className="mt-[-5px]">
                <DeleteOutlined
                  style={{ color: "red" }}
                  onClick={() => dispatch(removeFromCart(item))}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartManage;
