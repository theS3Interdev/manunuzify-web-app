"use client";

import Link from "next/link";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
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

const AppSidebar = () => {
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
        <p className="py-5">Your shopping cart is empty.</p>
        {/* cart items display end */}
        <SheetFooter>
          <SheetClose asChild>
            <Button asChild className="mb-2 mt-5 w-full">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AppSidebar;
