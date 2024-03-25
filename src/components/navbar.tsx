"use client";

import Link from "next/link";
import Logo from "../../public/coding-logo.jpg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { logout } from "@/actions/auth-actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOutIcon, MailIcon } from "lucide-react";
import { FcDeleteDatabase } from "react-icons/fc";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useState } from "react";
import { deleteAccount } from "@/lib/data/user";
import { deleteAccountAction } from "@/actions/delete-account-actions";

const navLinks = [
  { id: 1, name: "Login", href: "/login" },
  { id: 2, name: "Register", href: "/register" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };

  const userId = session.data?.user?.id;

  return (
    <div className="flex w-full items-center justify-between p-14 h-16 mx-auto container">
      <Link href="/">
        <Image
          src={Logo}
          width={80}
          height={80}
          alt="dev-logo"
          className="rounded-full"
        />
      </Link>

      {session?.data?.user?.email && (
        <>
          <Link
            href="/your-rooms"
            className={cn(
              "text-black font-normal",
              pathname === "/your-rooms" ? "text-white font-semibold" : ""
            )}
          >
            Your Rooms
          </Link>
        </>
      )}

      <div>
        <nav className="flex items-center gap-x-4">
          {!session.data?.user?.email &&
            navLinks.map((navLink) => (
              <Link
                key={navLink.id}
                href={navLink.href}
                className={cn(
                  "text-yellow-600 font-normal hover:text-yellow-700",
                  pathname === navLink.href ? "text-white font-semibold" : ""
                )}
              >
                {navLink.name}
              </Link>
            ))}

          {session?.data?.user?.email && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={session.data.user.image || ""} />
                  <AvatarFallback>
                    {session.data.user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel className="flex items-center gap-x-2">
                  <MailIcon className="size-4" />
                  {session.data.user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button variant="link" size="sm" onClick={handleLogout}>
                    <LogOutIcon className="size-5 mr-2" />
                    Logout
                  </Button>
                  <DropdownMenuSeparator />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                  <Button variant="link" size="sm">
                    <FcDeleteDatabase className="size-5 mr-2" />
                    Delete Account
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to proceed with account deletion?{" "}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and corresponding data
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                setOpen(false);
                handleLogout();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Navbar;
