import { AlertTriangle, CheckCircleIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary",
        success: ""
      }
    }
  }
)
export const Banner = () => {
  return (
    <div>Banner</div>
  )
}