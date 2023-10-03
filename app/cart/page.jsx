"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { addToCart, removeFromCart } from "@/lib/redux/slices/cart-slice";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Container, ImageDisplay } from "@/components/index";

const ShoppingCartPage = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { cartItems, itemsPrice, loading } = useSelector((state) => state.cart);

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success("Item has been added to the cart.");
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item has been removed from the cart.");
  };

  return (
    <Container>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="mb-4 font-montserrat text-xl font-bold">
          Shopping Cart
        </h1>

        {/* return button start */}
        <Button asChild className="mb-5">
          <Link href="/">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
        {/* return button end */}

        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <p>Your shopping cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              {/* table start */}
              <Table>
                <TableCaption>A list of your current purchases.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="p-5 text-left">Product</TableHead>
                    <TableHead className="p-5 text-right">Quantity</TableHead>
                    <TableHead className="p-5 text-right">Item Price</TableHead>
                    <TableHead className="p-5 text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="flex flex-col p-1">
                        <div className="relative m-2 aspect-square h-40 w-40 rounded-lg bg-foreground/5 dark:bg-background">
                          <Link href={`/product/${item.id}`}>
                            <ImageDisplay
                              imageSrc={item.image}
                              imageAlt={item.name}
                            />
                          </Link>
                          <p className="text-center font-montserrat font-semibold">
                            {item.name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="p-5 text-right">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                          className="w-20"
                        >
                          {Array.from(Array(item.quantityInStock).keys()).map(
                            (i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ),
                          )}
                        </select>
                      </TableCell>
                      <TableCell className="p-5 text-right">
                        {item.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </TableCell>
                      <TableCell className="content-center p-5 text-center">
                        <Button
                          onClick={() => removeFromCartHandler(item.id)}
                          variant="destructive"
                          className="mt-3 w-full"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* table end */}
            </div>

            <div>
              {/* shopping summary start */}
              <Card className="h-64 rounded-lg border-2">
                <CardContent className="pt-2">
                  <div className="mb-2">
                    <p className="font-montserrat text-lg font-semibold">
                      Subtotal
                    </p>
                    <p className="mt-2">
                      {cartItems.reduce((a, c) => a + c.quantity, 0)} item(s)
                      valued at{" "}
                      {itemsPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full">
                    <Button
                      onClick={() => router.push("/shipping")}
                      className="w-full"
                    >
                      Proceed to Checkout
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              {/* shopping summary end */}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ShoppingCartPage;
