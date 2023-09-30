import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container, ProductList } from "@/components/index";

import { data } from "@/lib/data/data";

const Home = () => {
  const { products } = data;

  return (
    <Container>
      <div className="space-y-10 pb-10">
        {/* hero section start */}
        <div className="overflow-hidden rounded-lg p-4 sm:p-6 lg:p-8">
          <div
            style={{ backgroundImage: `url(/images/hero-1920x1080.jpg)` }}
            className="relative aspect-square overflow-hidden rounded-lg bg-cover md:aspect-[2.4/1]"
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
              <div className="max-w-xs rounded-lg bg-secondary/60 p-4 font-montserrat text-3xl font-bold text-black dark:text-white sm:max-w-xl sm:text-5xl lg:text-6xl">
                Featured Products
                <Button asChild size="lg" className="w-full py-6 text-xl">
                  <Link href="#procuct-list">
                    <ShoppingBag className="mr-2 h-6 w-6" /> Shop Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* hero section end */}

        {/* product-list section start */}
        <div
          id="product-list"
          className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8"
        >
          <ProductList items={products} />
        </div>
        {/* product-list section end */}
      </div>
    </Container>
  );
};

export default Home;
