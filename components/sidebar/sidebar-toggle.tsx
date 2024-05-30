"use client";

import React from "react";
import { useAtom } from "jotai";
import { isSidebarOpen } from "@/store/sidebar";
import { Button } from "../ui/button";
import { GanttChart, X } from "lucide-react";

const SidebarToggle = () => {
  const [isOpen, setIsOpen] = useAtom(isSidebarOpen);

  return (
    <Button
      size={"icon"}
      className="shrink-0 md:hidden"
      variant={"outline"}
      onClick={() => setIsOpen((prev) => !prev)}
      aria-label="Toggle Sidebar"
    >
      {isOpen ? <X /> : <GanttChart />}
    </Button>
  );
};

export default SidebarToggle;
