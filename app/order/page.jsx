"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckoutWizard, Container, ImageDisplay } from "@/components/index";

const OrderConfirmationPage = () => {
  const {
    cartItems,
    loading,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingCost,
    tax,
    totalCost,
  } = useSelector((state) => state.cart);

  const router = useRouter();

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  return (
    <Container>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="mb-5 font-montserrat text-xl font-bold">
          Order Confirmation
        </h1>

        {/* checkout wizard start */}
        <CheckoutWizard activeStep={3} />
        {/* checkout wizard end */}

        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <div>
            Your shopping cart is empty.{" "}
            <Link href="/" className="hover:underline">
              Time to go Shopping!
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              {/* shipping address confirmation section start */}
              <Card className="mt-2 rounded-lg border-2">
                <CardContent className="pt-4">
                  <div className="mb-2 space-y-2">
                    <p className="text-lg font-semibold">Shipping Details</p>
                    <div>
                      {shippingAddress.fullName},
                      <br />
                      {shippingAddress.address},
                      <br />
                      {shippingAddress.city}, {shippingAddress.postalCode},
                      <br />
                      {shippingAddress.country}.
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start">
                  <Button asChild>
                    <Link href="/shipping">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Edit Shipping Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              {/* shipping address confirmation section end */}

              {/* payment method confirmation section start */}
              <Card className="mt-2 rounded-lg border-2">
                <CardContent className="pt-4">
                  <div className="mb-2 space-y-2">
                    <p className="text-lg font-semibold">Payment Method</p>
                    <div>
                      {paymentMethod}
                      <br />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start">
                  <Button asChild>
                    <Link href="/payment">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Edit Payment Method
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              {/* payment method confirmation section end */}

              {/* cart items summary section start */}
              <Card className="mt-2 rounded-lg border-2">
                <CardContent className="pt-4">
                  <div className="mb-2 space-y-2">
                    <p className="text-lg font-semibold">Shopping Cart Items</p>
                    {/* table start */}
                    <Table>
                      <TableCaption>
                        A list of your current purchases.
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="p-5 text-left">
                            Product
                          </TableHead>
                          <TableHead className="p-5 text-right">
                            Quantity
                          </TableHead>
                          <TableHead className="p-5 text-right">
                            Price
                          </TableHead>
                          <TableHead className="p-5 text-right">
                            Subtotal
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item.id} className="border-b">
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
                              {item.quantity}
                            </TableCell>
                            <TableCell className="p-5 text-right">
                              {item.price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </TableCell>
                            <TableCell className="p-5 text-right">
                              {(item.quantity * item.price).toLocaleString(
                                "en-US",
                                {
                                  style: "currency",
                                  currency: "USD",
                                },
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {/* table end */}
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start">
                  <Button asChild>
                    <Link href="/cart">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Edit Shopping Cart Items
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              {/* cart items summary section end */}
            </div>

            <div>
              {/* order summary start */}
              <Card className="mt-2 rounded-lg border-2">
                <CardContent className="pt-4">
                  <div className="mb-2 space-y-2">
                    <p className="text-lg font-semibold">Order Summary</p>
                    <div className="mb-2 flex justify-between">
                      <p>Subtotal</p>
                      <p>
                        {itemsPrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                    </div>

                    <div className="mb-2 flex justify-between">
                      <p>Value Added Tax</p>
                      <p>
                        {tax.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                    </div>

                    <div className="mb-2 flex justify-between">
                      <p>Shipping Cost</p>
                      <p>
                        {shippingCost.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                    </div>

                    <Separator className="my-2" orientation="horizontal" />

                    <div className="mb-2 flex justify-between font-semibold">
                      <p>Total Cost</p>
                      <p>
                        {totalCost.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                    </div>

                    <div className="mb-2 w-full">
                      <Button
                        onClick={() =>
                          toast.error("The feature hasn't been implemented.")
                        }
                        className="my-5 w-full"
                      >
                        Confirm Order
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* order summary end */}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default OrderConfirmationPage;
