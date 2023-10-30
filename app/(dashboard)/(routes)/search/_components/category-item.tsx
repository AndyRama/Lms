"use client"

import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

import { 
  usePathname, 
  useRouter, 
  useSearchParams
} from "next/navigation";


interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}

export const CategoryItem = ({
  label,
  value,
  icon: Icon
} : CategoryItemProps) => {

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;
  return (
    <button className={cn(
      "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition")}>
      {Icon && <Icon size={20}/>}
        <div className="truncate">
          {label}
        </div>
    </button>
  )
}