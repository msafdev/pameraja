import React, { Suspense } from "react";
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
          <Sparkle className="text-muted-foreground anim group-hover:fill-[#facc15] group-hover:text-[#facc15] w-3.5 h-3.5" />
        ),
        color: "#facc15",
        query: "all",
        fill: true,
      },
      {
        name: "Hot",
        icon: (
          <Flame className="text-muted-foreground anim group-hover:fill-[#ef4444] group-hover:text-[#ef4444] w-3.5 h-3.5" />
        ),
        color: "#ef4444",
        query: "hot",
        fill: true,
      },
      {
        name: "Old",
        icon: (
          <FolderClock className="text-muted-foreground anim group-hover:text-[#10b981] w-3.5 h-3.5" />
        ),
        color: "#10b981",
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
          <Code className="text-muted-foreground anim group-hover:text-[#0284c7] w-3.5 h-3.5" />
        ),
        color: "#0284c7",
        query: "code",
        fill: false,
      },
      {
        name: "Design",
        icon: (
          <Palette className="text-muted-foreground anim group-hover:text-[#e11d48] w-3.5 h-3.5" />
        ),
        color: "#e11d48",
        query: "design",
        fill: false,
      },
      {
        name: "Product",
        icon: (
          <Package className="text-muted-foreground anim group-hover:text-[#b45309] w-3.5 h-3.5" />
        ),
        color: "#b45309",
        query: "product",
        fill: false,
      },
      {
        name: "Idea",
        icon: (
          <Lightbulb className="text-muted-foreground anim group-hover:text-[#facc15] w-3.5 h-3.5" />
        ),
        color: "#facc15",
        query: "idea",
        fill: false,
      },
      {
        name: "Discuss",
        icon: (
          <MessageSquareText className="text-muted-foreground anim group-hover:text-[#0ea5e9] w-3.5 h-3.5" />
        ),
        color: "#0ea5e9",
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
              <Suspense key={index}>
                <Link
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
              </Suspense>
            ))}
          </div>
        </div>
      ))}
      <Auth />
    </aside>
  );
};

export default Sidebar;
