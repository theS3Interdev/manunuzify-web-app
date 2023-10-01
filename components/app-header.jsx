"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { Moon, ShoppingCart, Sun } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppSidebar, Container, UserProfileButton } from "@/components/index";

const AppHeader = () => {
  const { setTheme } = useTheme();

  const { loading, cartItems } = useSelector((state) => state.cart);

  return (
    <div className="border-b px-2 py-3 sm:flex sm:justify-between">
      {/* header section start */}
      <Container>
        <div className="relative flex h-16 w-full items-center justify-between px-2 sm:px-6 lg:px-8">
          <div className="flex items-center">
            {/* sidebar component section start */}
            <AppSidebar />
            {/* sidebar component section end */}

            {/* logo section start */}
            <Link href="/" className="ml-4 lg:ml-0">
              <h1 className="font-montserrat text-xl font-bold lg:ml-4 lg:text-2xl">
                Manunuzify
              </h1>
            </Link>
            {/* logo section end */}
          </div>

          {/* utilities section start */}
          <div className="flex items-center space-x-0 lg:space-x-1">
            {/* shopping cart button start */}
            <Button variant="ghost" className="mr-2">
              <Link href="/cart" className="flex">
                <ShoppingCart className="h-6 w-6" />
                <Badge variant="destructive">
                  {loading ? "" : cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              </Link>
            </Button>
            {/* shopping cart button end */}

            {/* theme button start */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* theme button end */}

            {/* user profile button start */}
            <UserProfileButton />
            {/* user profile button end */}
          </div>
          {/* utilities section end */}
        </div>
      </Container>
      {/* header section end */}
    </div>
  );
};

export default AppHeader;
