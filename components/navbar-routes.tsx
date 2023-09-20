"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link";
 
export const NavbarRoutes = () => {
  const pathname = usePathname()
  const router = useRouter()

  //Individual Teacher page
  const isTeacherPage = pathname?.startsWith("/teacher")

  //Individual Course page
  const isPlayerPage = pathname?.includes("/chapter")

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Button size="sm" variant="ghost" >
          <LogOut className="border h-4 w-4 mr-2"/> 
          Exit
        </Button> 
      ) : (
        <Link href="/teacher/course">
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>
      )}
      <UserButton/>
    </div>
  )
}