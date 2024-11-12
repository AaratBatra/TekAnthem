import React, { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusIcon, Pencil, Trash2, Check, X } from 'lucide-react'

// type Person = {
//   id: number
//   firstName: string
//   lastName: string
//   age: number
//   visits: number
//   status: string
//   progress: number
// }

const defaultData = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    visits: 10,
    status: 'Active',
    progress: 50,
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    age: 28,
    visits: 15,
    status: 'Inactive',
    progress: 75,
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    age: 35,
    visits: 20,
    status: 'Active',
    progress: 90,
  },
]

const columnHelper = createColumnHelper()


export const Example = () => {
    const [data, setData] = useState(() => [...defaultData])
    const [editingRow, setEditingRow] = useState(null)
  
    const columns = useMemo(
      () => [
        columnHelper.accessor('firstName', {
          cell: ({ row, getValue, column: { id }, table }) => {
            const initialValue = getValue()
            const [value, setValue] = React.useState(initialValue)
            const onBlur = () => table.options.meta?.updateData(row.index, id, value)
            React.useEffect(() => {
              setValue(initialValue)
            }, [initialValue])
            return editingRow === row.original.id ? (
              <Input
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={onBlur}
              />
            ) : (
              <span>{value}</span>
            )
          },
          header: 'First Name',
        }),
        columnHelper.accessor('lastName', {
          cell: ({ row, getValue, column: { id }, table }) => {
            const initialValue = getValue()
            const [value, setValue] = React.useState(initialValue)
            const onBlur = () => table.options.meta?.updateData(row.index, id, value)
            React.useEffect(() => {
              setValue(initialValue)
            }, [initialValue])
            return editingRow === row.original.id ? (
              <Input
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={onBlur}
              />
            ) : (
              <span>{value}</span>
            )
          },
          header: 'Last Name',
        }),
        columnHelper.accessor('age', {
          cell: ({ row, getValue, column: { id }, table }) => {
            const initialValue = getValue()
            const [value, setValue] = React.useState(initialValue)
            const onBlur = () => table.options.meta?.updateData(row.index, id, value)
            React.useEffect(() => {
              setValue(initialValue)
            }, [initialValue])
            return editingRow === row.original.id ? (
              <Input
                type="number"
                value={value}
                onChange={e => setValue(Number(e.target.value))}
                onBlur={onBlur}
              />
            ) : (
              <span>{value}</span>
            )
          },
          header: 'Age',
        }),
        columnHelper.accessor('visits', {
          cell: ({ row, getValue, column: { id }, table }) => {
            const initialValue = getValue()
            const [value, setValue] = React.useState(initialValue)
            const onBlur = () => table.options.meta?.updateData(row.index, id, value)
            React.useEffect(() => {
              setValue(initialValue)
            }, [initialValue])
            return editingRow === row.original.id ? (
              <Input
                type="number"
                value={value}
                onChange={e => setValue(Number(e.target.value))}
                onBlur={onBlur}
              />
            ) : (
              <span>{value}</span>
            )
          },
          header: 'Visits',
        }),
        columnHelper.accessor('status', {
          cell: ({ row, getValue, column: { id }, table }) => {
            const initialValue = getValue()
            const [value, setValue] = React.useState(initialValue)
            const onBlur = () => table.options.meta?.updateData(row.index, id, value)
            React.useEffect(() => {
              setValue(initialValue)
            }, [initialValue])
            return editingRow === row.original.id ? (
              <Input
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={onBlur}
              />
            ) : (
              <span>{value}</span>
            )
          },
          header: 'Status',
        }),
        columnHelper.accessor('progress', {
          cell: ({ row, getValue, column: { id }, table }) => {
            const initialValue = getValue()
            const [value, setValue] = React.useState(initialValue)
            const onBlur = () => table.options.meta?.updateData(row.index, id, value)
            React.useEffect(() => {
              setValue(initialValue)
            }, [initialValue])
            return editingRow === row.original.id ? (
              <Input
                type="number"
                value={value}
                onChange={e => setValue(Number(e.target.value))}
                onBlur={onBlur}
              />
            ) : (
              <span>{value}%</span>
            )
          },
          header: 'Progress',
        }),
        columnHelper.display({
          id: 'actions',
          cell: ({ row }) => (
            <div className="flex space-x-2">
              {editingRow === row.original.id ? (
                <>
                  <Button size="sm" onClick={() => handleSave(row.original.id)}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(row.original.id)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(row.original.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          ),
          header: 'Actions',
        }),
      ],
      [editingRow]
    )
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      meta: {
        updateData: (rowIndex, columnId, value) => {
          setData(old =>
            old.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...old[rowIndex],
                  [columnId]: value,
                }
              }
              return row
            })
          )
        },
      },
    })
  
    const handleEdit = (id) => {
      setEditingRow(id)
    }
  
    const handleSave = (id) => {
      setEditingRow(null)
    }
  
    const handleCancel = () => {
      setEditingRow(null)
    }
  
    const handleAdd = () => {
      const newPerson = {
        id: Math.max(...data.map(d => d.id)) + 1,
        firstName: '',
        lastName: '',
        age: 0,
        visits: 0,
        status: '',
        progress: 0,
      }
      setData([...data, newPerson])
      setEditingRow(newPerson.id)
    }
  
    const handleDelete = (id) => {
      setData(data.filter(row => row.id !== id))
      if (editingRow === id) {
        setEditingRow(null)
      }
    }
  
    return (
      <div className="container mx-auto p-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Button onClick={handleAdd}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Row
          </Button>
        </div>
      </div>
    )
}