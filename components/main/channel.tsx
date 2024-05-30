"use client";

import React from "react";

import { useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Channel = ({
  name,
  icon,
  color = "foreground",
  isOpen = true,
  fill,
  query,
}: {
  name: string;
  icon: React.ReactElement;
  color?: string;
  fill: boolean;
  isOpen?: boolean;
  query: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const search = searchParams.get("channel") || "all";

  const isActive = search === query && pathname === "/";

  return (
    <div
      className={cn(
        `group flex items-center py-1.5 border-r-2 hover:border-r-foreground pad-l pr-12 anim cursor-pointer w-full`,
        isActive ? "border-r-foreground" : "border-r-transparent"
      )}
    >
      {icon &&
        React.cloneElement(icon as React.ReactElement, {
          fill: fill && isActive ? `${color}` : `transparent`,
          stroke: isActive ? `${color}` : "currentColor",
        })}
      <p
        className={`text-sm font-medium anim group-hover:text-foreground ${
          isOpen ? "ml-3 w-fit scale-100" : "ml-0 w-0 scale-0"
        } ${isActive ? `text-foreground` : "text-muted-foreground"}`}
      >
        {name}
      </p>
    </div>
  );
};

export default Channel;
