"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { signIn, signOut } from 'next-auth/react';
import UserDropdown from "@/components/user-dropdown";

const NavBar: React.FC = () => {
  const scrolled = useScroll(10);
  const pathname = usePathname();
  const router = useRouter();
  
  const token = Cookies.get("token");

  const handleSignOut = () => {
    Cookies.remove("token"); 
    signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <>
      <div
        className={`fixed top-0 w-full flex justify-center z-50 ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex-col max-w-screen-xl items-center justify-between w-full">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center font-display text-2xl">
              <Image
                src="/monkey.png"
                alt="logo"
                width="30"
                height="30"
                className="mr-2 rounded-3xl"
              />
              <p>UWEC</p>
            </Link>
            <div>
              {token ? (
                <div className="flex items-center space-x-4">
                  <UserDropdown userName="Admin" /> 
                  <button
                    className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                    onClick={handleSignOut} 
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => signIn()} 
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
