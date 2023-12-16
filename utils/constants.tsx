import { SideNavItem } from "@/types";
import LogoutSVG from "@/components/svg/LogoutSVG";
export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <LogoutSVG />,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <LogoutSVG />,
    submenu: true,
    subMenuItems: [
      { title: "All", path: "/projects" },
      { title: "Web Design", path: "/projects/web-design" },
      { title: "Graphic Design", path: "/projects/graphic-design" },
    ],
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <LogoutSVG />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <LogoutSVG />,
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/settings/account" },
      { title: "Privacy", path: "/settings/privacy" },
    ],
  },
  {
    title: "Help",
    path: "/help",
    icon: <LogoutSVG />,
  },
];
