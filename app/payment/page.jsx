"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";

import { savePaymentMethod } from "@/lib/redux/slices/cart-slice";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckoutWizard, Container } from "@/components/index";

const PaymentSelectionPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const router = useRouter();

  const dispatch = useDispatch();

  const { paymentMethod, shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }

    setValue("paymentMethod", paymentMethod);
  }, [paymentMethod, router, setValue, shippingAddress]);

  const submitHandler = ({ paymentMethod }) => {
    dispatch(savePaymentMethod(paymentMethod));

    router.push("/order");
  };
  return (
    <Container>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="mb-5 font-montserrat text-xl font-bold">
          Payment Method Selection
        </h1>

        {/* checkout wizard start */}
        <CheckoutWizard activeStep={2} />
        {/* checkout wizard end */}

        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          {["PayPal", "Cash on Delivery"].map((payment) => (
            <div key={payment} className="mb-4">
              <input
                name="paymentMethod"
                className="p-2 outline-none focus:ring-0"
                id={payment}
                type="radio"
                value={payment}
                {...register("paymentMethod", {
                  required: "Please select your preferred payment method.",
                })}
              />

              <Label className="p-2" htmlFor={payment}>
                {payment}
              </Label>
            </div>
          ))}

          {errors.paymentMethod && (
            <div className="text-red-500 ">{errors.paymentMethod.message}</div>
          )}

          <div className="mt-5 flex justify-between">
            <Button>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default PaymentSelectionPage;
