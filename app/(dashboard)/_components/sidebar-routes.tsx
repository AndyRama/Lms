"use client"

import { Layout, Compass, List, BarChart } from "lucide-react"
import { SidebarItem } from "./sidebar-item"
import { usePathname } from "next/navigation"

const guestRoutes = [
  {
    icon: Compass,
    label: "Home",
    href: "/home",
  },
  {
    icon: Layout,
    label: "Blog",
    href: "/blog",
  },
  {
    icon: Layout,
    label: "Contact",
    href: "/contact",
  },
  {
    icon: Compass,
    label: "Cgi",
    href: "/cgi",
  },
  {
    icon: Compass,
    label: "Team",
    href: "/team",
  },
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
]

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
]

export const SidebarRoutes = () => {

  const pathname = usePathname()
  
  const IsTeacherPage = pathname?.includes("/teacher")
  
  const routes = IsTeacherPage ? teacherRoutes : guestRoutes

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
