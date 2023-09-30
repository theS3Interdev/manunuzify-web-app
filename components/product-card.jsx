import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DisplayImage, ProductRating } from "@/components/index";

const ProductCard = ({ product }) => {
  return (
    <div className="rounded-lg outline-0 ring-primary transition duration-300 hover:ring-2 focus:ring-2">
      <Card className="rounded-lg border-2">
        <CardContent className="pt-4">
          <div className="relative aspect-square rounded-lg bg-foreground/5 dark:bg-background">
            <Link href={`/product/${product.id}`}>
              <DisplayImage imageSrc={product.image} imageAlt={product.name} />
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <div>
            <Link href={`/product/${product.id}`}>
              <p className="font-montserrat text-lg font-semibold">
                {product.name}
              </p>
            </Link>
            <ProductRating rating={product.rating} reviews={product.reviews} />
          </div>
          <div className="flex items-center justify-between font-semibold">
            {product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <div className="w-full py-2">
            <Button>Add to Cart</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
