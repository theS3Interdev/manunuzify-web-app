"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Menu, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";

import { addToCart, removeFromCart } from "@/lib/redux/slices/cart-slice";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ImageDisplay } from "@/components/index";

const AppSidebar = () => {
  const { cartItems, itemsPrice, loading } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6 cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-montserrat">Shopping Cart</SheetTitle>
          <SheetDescription>
            Make changes to your shopping cart here.
          </SheetDescription>
        </SheetHeader>
        {/* cart items display start */}
        <div>
          {loading ? (
            <p className="py-5">Loading...</p>
          ) : cartItems.length === 0 ? (
            <p className="py-5">Your cart is empty.</p>
          ) : (
            <div>
              <div className="flex flex-col border-b p-2">
                <div className="flex justify-between space-x-2">
                  <p className="font-montserrat font-semibold">Subtotal</p>
                  <p className="font-semibold">
                    {itemsPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>

                <SheetClose asChild>
                  <Button asChild className="mb-2 mt-5 w-full">
                    <Link href="/cart">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Go to Cart
                    </Link>
                  </Button>
                </SheetClose>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col items-center p-1">
                  <div className="relative m-2 aspect-square h-40 w-40 rounded-lg bg-foreground/5 dark:bg-background">
                    <Link href={`/product/${item.id}`}>
                      <ImageDisplay
                        imageSrc={item.image}
                        imageAlt={item.name}
                      />
                    </Link>
                  </div>

                  <div className="mb-2">
                    <p className="text-center font-semibold">{item.name}</p>
                  </div>

                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                    className="w-40"
                  >
                    {Array.from(Array(item.quantityInStock).keys()).map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>

                  <Button
                    onClick={() => removeFromCartHandler(item.id)}
                    variant="destructive"
                    className="mt-4 w-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>

                  <Separator className="my-4" orientation="horizontal" />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* cart items display end */}
        <SheetFooter className="px-1">
          <SheetClose asChild>
            <Button asChild className="mb-2 mt-5 w-full">
              <Link href="/">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AppSidebar;
