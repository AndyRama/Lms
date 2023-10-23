import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { redirect } from "next/dist/server/api-utils";
import { db } from "@/lib/db";

const CoursesPage = async () => {
  const { userId } = auth();

  if(!userId) {
    return redirect("/")
  }

  const courses = await db.course.findMany({
    where: {
      userId
    }, 
    orderBy: {
      createdAt:"desc"
    }
  })
  return ( 
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
   );
}
 
export default CoursesPage
