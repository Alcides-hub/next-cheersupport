"use client";

import Link from 'next/link'
import Image from "next/image";
import { Button, DarkThemeToggle } from "flowbite-react";
import { useState, useEffect} from "react";
// import "flowbite";
// import "@/app/globals.css";
import LoginButton from "@/components/shared/LoginLogoutButton"

export function Header() {
  const [darkMode, setDarkMode] = useState(false);
 
  return (
    <div className={`${
      darkMode ? "dark" : ""
    } from-pink-50 to-white bg-gradient-to-b p-6`}>
      <header className="bg-white/80 shadow-md flex items-center justify-between p-6 rounded-lg container mx-auto shadow-pink-50">
        <Link
          className="text-pink-700 md:text-xl font-bold tracking-tight"
          href="/"
        >
          <Image
         src="/images/cheersupport-logo.png"
         alt="cheersupport logo"
         width={120}
         height={120}
       />
        </Link>
        <ul className="flex items-center gap-4 font-semibold text-slate-700">
         <li className="px-2">
            <Link href="/" className="hover:text-blue-500">
            トップ
            </Link>
          </li>
         <li className="px-2">
            <Link href="/search" className="hover:text-blue-500">
            さがす
            </Link>
          </li>
          <li className="px-2">
            <Link href="/ranking" className="hover:text-blue-500">
            ランキング
            </Link>
          </li>
          <li className="px-2">
            <Link href="/attention" className="hover:text-blue-500">
            注目
            </Link>
          </li>
          <li className="px-2">
            <Link href="/contact" className="hover:text-blue-500">
            お知らせ
            </Link>
          </li>
          <li className="px-2">
            <Link href="/help" className="hover:text-blue-500">
            ヘルプ
            </Link>
          </li>
          <li className="px-2">
            <Link href="/streaming" className="hover:text-blue-500">
            OBS
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-4">
         {/* <Button href="/login" color="blue"> */}
         <LoginButton/>
         {/* </Button> */}
        <DarkThemeToggle onClick={() => setDarkMode(!darkMode)} />
        </div>
      </header>
    </div>
  )
}
