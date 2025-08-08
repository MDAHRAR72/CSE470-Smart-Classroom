"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, BookOpen, ClipboardList, X, Home, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    {
      label: "Dashboard",
      icon: <Home className="w-5 h-5 mr-2" />,
      onClick: () => router.push("/dashboard"),
    },
    {
      label: "Assignments",
      icon: <ClipboardList className="w-5 h-5 mr-2" />,
      onClick: () => router.push("/assignments"),
    },
    {
      label: "Courses",
      icon: <BookOpen className="w-5 h-5 mr-2" />,
      onClick: () => router.push("/courses"),
    },
    {
      label: "Logout",
      icon: <LogOut className="w-5 h-5 mr-2" />,
      onClick: () => signOut({ callbackUrl: "/auth/login" }),
    },
  ];

  return (
    <div className="relative">
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <Menu className="w-6 h-6" />
      </Button>
      {/* Overlay with smooth fade */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Sliding drawer */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="font-bold text-lg">Menu</span>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="w-6 h-6" />
          </Button>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start text-base"
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
}
