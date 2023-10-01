import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { data } from "@/lib/data/data";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AddToCartButton,
  Container,
  ImageDisplay,
  ProductRating,
} from "@/components/index";

export async function generateMetadata({ params }) {
  const product = data.products.find((product) => product.id === params.id);

  /* handle the case where the product is not found */
  if (!product) {
    return <p>The product does not exist.</p>;
  }

  return {
    title: product.name + " | " + "Manunuzify",
  };
}

const ProductDetailsPage = ({ params }) => {
  const product = data.products.find((product) => product.id === params.id);

  /* handle the case where the product is not found */
  if (!product) {
    return <p>The product does not exist</p>;
  }

  return (
    <Container>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="mb-4 font-montserrat text-xl font-bold">
          Product Details
        </h1>

        {/* return button start */}
        <div className="p-4">
          <Button asChild>
            <Link href="/">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
        {/* return button end */}

        {/* product grid start */}
        <div className="grid md:grid-cols-4 md:gap-5">
          {/* product image start */}
          <div className="relative aspect-square h-64 w-full rounded-lg bg-foreground/5 dark:bg-background">
            <ImageDisplay imageSrc={product.image} imageAlt={product.name} />
          </div>
          {/* product image end */}

          {/* product details start */}
          <div className="md:col-span-2">
            <div className="mb-2">
              <p className="text-lg font-semibold">{product.name}</p>
            </div>
            <div className="mb-2">
              <ProductRating
                rating={product.rating}
                reviews={product.reviews}
              />
            </div>

            <Separator className="my-2" orientation="horizontal" />

            <div className="mb-2">
              <p className="text-lg font-semibold">Description</p>
              <p>{product.description}</p>
            </div>
          </div>
          {/* product details end */}

          {/* product action start */}
          <Card className="h-64 rounded-lg border-2">
            <CardContent className="pt-2">
              <div className="flex justify-between font-semibold">
                <p>Price</p>
                <p>
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <AddToCartButton
                  increaseOnClick={false}
                  product={product}
                  redirect={true}
                  showQuantity={true}
                />
              </div>
            </CardFooter>
          </Card>
          {/* product action end */}
        </div>
        {/* product grid end */}
      </div>
    </Container>
  );
};

export default ProductDetailsPage;
