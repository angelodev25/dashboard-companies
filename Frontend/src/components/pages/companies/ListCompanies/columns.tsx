import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { CompanyType } from "@/types/Company";
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";



export const columns: ColumnDef<CompanyType>[] = [
  {
    accessorKey: "profileImage",
    header: "Profile Image",
    cell: ({ row }) => {
      const image = row.getValue("profileImage")
      if (image === "null") {
        return (
          <p className="text-sm text-center" >No Image</p>
        )
      }
      return (
        <div className="px-3">
          <LazyLoadImage src={typeof image === 'string' ? image : "/image/company-icon.png"} 
            width={40}
            height={40}
            alt="Image"
            className="h-10 w-10" />
        </div>
      )
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      if (!column) {
        return (
          <div className="flex items-center gap-2">
            <span>Company Name</span>
          </div>
        )
      }
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Company Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>   
      )
    },
  },
  {
    accessorKey: "rif",
    header: "RIF",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { id } = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-4 p-0" >
              <span className="sr-only" >Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link to={`/company/${id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
