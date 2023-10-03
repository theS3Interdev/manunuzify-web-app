"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-hot-toast";

import { addToCart } from "@/lib/redux/slices/cart-slice";

import { Button } from "@/components/ui/button";

const AddToCartButton = ({
  increaseOnClick = false,
  product,
  redirect = false,
  showQuantity = false,
}) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const router = useRouter();

  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    let newQuantity = quantity;

    if (increaseOnClick) {
      const existingItem = cartItems.find((i) => i.id === product.id);

      if (existingItem) {
        if (existingItem.quantity + 1 <= product.quantityInStock) {
          newQuantity = existingItem.quantity + 1;
        } else {
          return toast.error("Sorry, we don't have more in stock.");
        }
      }
    }

    dispatch(addToCart({ ...product, quantity: newQuantity }));

    toast.success("Item has been added to the cart.");

    if (redirect) router.push("/cart");
  };

  return (
    <div>
      {product.quantityInStock > 0 && showQuantity && (
        <div className="mb-2 flex justify-between">
          <div className="font-semibold">Quantity</div>
          <div>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mb-4 w-20"
            >
              {Array.from(Array(product.quantityInStock).keys()).map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div>
        {product.quantityInStock > 0 ? (
          <Button onClick={addToCartHandler} className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        ) : (
          <Button variant="destructive" disabled className="w-full">
            Not Available
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddToCartButton;
