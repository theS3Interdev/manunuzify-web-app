"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";

import { saveShippingAddress } from "@/lib/redux/slices/cart-slice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutWizard, Container } from "@/components/index";

const ShippingDetailsPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const router = useRouter();

  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country }),
    );

    router.push("/payment");
  };

  return (
    <Container>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="mb-5 font-montserrat text-xl font-bold">
          Shipping Address Confirmation
        </h1>

        {/* checkout wizard start */}
        <CheckoutWizard activeStep={1} />
        {/* checkout wizard end */}

        <form
          className="mx-auto max-w-screen-sm"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="mb-4">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              className="mt-2 w-full"
              id="fullName"
              {...register("fullName", {
                required: "Please enter your full name.",
              })}
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="address">Delivery Address</Label>
            <Input
              className="mt-2 w-full"
              id="address"
              {...register("address", {
                required: "Please enter your delivery address.",
                minLength: {
                  value: 5,
                  message:
                    "Delivery address must be at least 5 characters long.",
                },
              })}
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="city">City of Residence</Label>
            <Input
              className="mt-2 w-full"
              id="city"
              {...register("city", {
                required: "Please enter your city of residence.",
              })}
            />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              className="mt-2 w-full"
              id="postalCode"
              {...register("postalCode", {
                required: "Please enter your postal code.",
              })}
            />
            {errors.postalCode && (
              <p className="text-red-500">{errors.postalCode.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="country">Country</Label>
            <Input
              className="mt-2 w-full"
              id="country"
              {...register("country", {
                required: "Please enter your country of residence.",
              })}
            />
            {errors.country && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
          </div>
          <div className="mb-4 flex justify-between">
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

export default ShippingDetailsPage;
