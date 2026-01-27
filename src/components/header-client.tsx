"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

const navItems = [
  { name: "شهادات الادخار", href: "/" },
  { name: "أذون الخزانة", href: "/treasury-bills" },
];

export default function HeaderClient() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">

        {/* Mobile Menu Button (LEFT) */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted"
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="دليلك البنكي"
            width={40}
            height={40}
          />
          <span className="font-bold text-lg">دليلك البنكي</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 mr-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={clsx(
          "fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden",
          open ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      />

      {/* Mobile Slide Menu (FROM LEFT) */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-background border-r shadow-xl z-50 transform transition-transform duration-300 ease-out md:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center px-4 border-b">
          <span className="font-bold">القائمة</span>
        </div>

        <nav className="flex flex-col px-4 py-4 gap-2 text-right">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "text-sm font-medium px-3 py-2 rounded-md transition-colors",
                  isActive
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
