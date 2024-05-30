import React from "react";
import Link from "next/link";

import Channel from "../main/channel";
import Auth from "./auth";

import Icon from "@/public/icon.svg";

import {
  Code,
  Flame,
  FolderClock,
  Lightbulb,
  MessageSquareText,
  Package,
  Palette,
  Sparkle,
} from "lucide-react";
import Image from "next/image";

const sidebarItems = [
  {
    category: "Trending",
    links: [
      {
        name: "All",
        icon: (
          <Sparkle className="text-muted-foreground group-hover:text-yellow-400 group-hover:fill-yellow-400 w-3.5 h-3.5" />
        ),
        color: "yellow-400",
        query: "all",
        fill: true,
      },
      {
        name: "Hot",
        icon: (
          <Flame className="text-muted-foreground group-hover:text-red-500 group-hover:fill-red-500 w-3.5 h-3.5" />
        ),
        color: "red-500",
        query: "hot",
        fill: true,
      },
      {
        name: "Old",
        icon: (
          <FolderClock className="text-muted-foreground group-hover:text-emerald-500 w-3.5 h-3.5" />
        ),
        color: "emerald-500",
        query: "old",
        fill: false,
      },
    ],
  },
  {
    category: "Channel",
    links: [
      {
        name: "Coding",
        icon: (
          <Code className="text-muted-foreground group-hover:text-blue-600 w-3.5 h-3.5" />
        ),
        color: "blue-600",
        query: "code",
        fill: false,
      },
      {
        name: "Design",
        icon: (
          <Palette className="text-muted-foreground group-hover:text-pink-600 w-3.5 h-3.5" />
        ),
        color: "pink-600",
        query: "design",
        fill: false,
      },
      {
        name: "Product",
        icon: (
          <Package className="text-muted-foreground group-hover:text-amber-700 w-3.5 h-3.5" />
        ),
        color: "amber-700",
        query: "product",
        fill: false,
      },
      {
        name: "Idea",
        icon: (
          <Lightbulb className="text-muted-foreground group-hover:text-amber-400 w-3.5 h-3.5" />
        ),
        color: "amber-400",
        query: "idea",
        fill: false,
      },
      {
        name: "Discuss",
        icon: (
          <MessageSquareText className="text-muted-foreground group-hover:text-sky-500 w-3.5 h-3.5" />
        ),
        color: "sky-500",
        query: "discuss",
        fill: false,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <aside className="h-[100svh] hidden md:flex flex-col py-4 border-r gap-y-4 anim bg-background w-64">
      <div className="flex pad-x anim mb-4">
        <Image src={Icon} alt="Logo" width={40} height={40} priority />
      </div>
      {sidebarItems.map((item, index) => (
        <div key={index} className="flex flex-col gap-y-3">
          <h3 className="font-mono font-semibold text-lg pad-l anim">
            {item.category}
          </h3>
          <div className="flex flex-col">
            {item.links.map((link, index) => (
              <Link
                key={index}
                href={{
                  pathname: "/",
                  query: { channel: link.query },
                }}
                aria-label={`Go to ${link.name}`}
              >
                <Channel
                  key={index}
                  name={link.name}
                  icon={link.icon}
                  color={link.color}
                  query={link.query}
                  fill={link.fill}
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
      <Auth />
    </aside>
  );
};

export default Sidebar;
