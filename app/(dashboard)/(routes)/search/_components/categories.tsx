"use client"

import { Category } from "@prisma/client"
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icon/fc"

interface CategoriesProps {
  items: Category[]
}

export const Categories = ({ items, }: CategoriesProps) => {
  return (
    <div>
      Categories !
    </div>
  )
}