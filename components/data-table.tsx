"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type DataPoint = {
  [key: string]: string | number
}

type DataTableProps = {
  data: DataPoint[]
}

export default function DataTable({ data }: DataTableProps) {
  if (!data || data.length === 0) {
    return <div>No data available</div>
  }

  // Extract column headers from the first data point
  const columns = Object.keys(data[0])

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column} className="font-medium">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={`${rowIndex}-${column}`}>{row[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

