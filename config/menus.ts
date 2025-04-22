import {
  Application,
  Chart,
  Components,
  DashBoard,
  Stacks2,
  Map,
  Grid,
  Files,
  Graph,
  ClipBoard,
  Cart,
  Envelope,
  Messages,
  Monitor,
  ListFill,
  Calendar,
  Flag,
  Book,
  Note,
  ClipBoard2,
  Note2,
  Note3,
  BarLeft,
  BarTop,
  ChartBar,
  PretentionChartLine,
  PretentionChartLine2,
  Google,
  Pointer,
  Map2,
  MenuBar,
  Icons,
  ChartArea,
  Building,
  Building2,
  Sheild,
  Error,
  Diamond,
  Heroicon,
  LucideIcon,
  CustomIcon,
  Mail,
  User,
} from "@/components/svg";

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}

export const menusConfig = {
  sidebarNav: {
    classic: [
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Member Management",
        icon: User,
        href: "",
        child: [
          {
            title: "User/AMIR Members",
            href: "/users",
          },
          {
            title: "Our Partners",
            href: "/partners",
          },
          {
            title: "Membership Recovery",
            href: "/membership-recovery",
          },
        ],
      },
      {
        title: "Complaints & Feedbacks",
        icon: Messages,
        href: "/feedbacks",
      },
      {
        title: "Digital Facts Sheet",
        icon: Files,
        href: "/digital-facts-sheet",
      }
    ],
  },
};

export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
