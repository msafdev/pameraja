import React from "react";

import { ModeToggle } from "../theme/theme-toggle";
import { Input } from "../ui/input";

import SidebarToggle from "../sidebar/sidebar-toggle";
import Profile from "./profile";

const Nav = () => {
  return (
    <header>
      {/* logo */}
      <nav className="w-full flex items-center justify-between gap-x-4 md:gap-x-16 py-4 border-b bg-background px-4 md:px-6 lg:px-8">
        <Profile />
        <div className="flex items-center gap-x-3 w-full justify-end ml-auto">
          <Input placeholder="Search" className="hidden md:flex h-10 w-full max-w-64" />
          <ModeToggle />
          <SidebarToggle />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
