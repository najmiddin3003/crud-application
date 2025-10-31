'use client'

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, Edit3Icon, Trash2 } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import Link from 'next/link'

const data: Payment[] = [
	{
		id: 'm5gr84i9',
		taskDescription: 'This is task description',
		taskName: 'Task name',
		Role: 'Teacher',
		createdAt: '2024-01-01',
	},
	{
		id: '3u1reuv4',
		taskDescription: 'Another task description',
		taskName: 'Second task name',
		Role: 'Viewer',
		createdAt: '2024-01-02',
	},
	{
		id: 'derv1ws0',
		taskDescription: 'Some task description',
		taskName: 'Third task name',
		Role: 'Pupil',
		createdAt: '2024-01-03',
	},
	{
		id: '5kma53ae',
		taskDescription: 'Yet another task description',
		taskName: 'Fourth task name',
		Role: 'Teacher',
		createdAt: '2024-01-04',
	},
	{
		id: 'bhqecj4p',
		taskDescription: 'Final task description',
		taskName: 'Fifth task name',
		Role: 'Pupil',
		createdAt: '2024-01-05',
	},
	{
		id: 'm5gr84i9',
		taskDescription: 'This is task description',
		taskName: 'Task name',
		Role: 'Teacher',
		createdAt: '2024-01-01',
	},
	{
		id: '3u1reuv4',
		taskDescription: 'Another task description',
		taskName: 'Second task name',
		Role: 'Viewer',
		createdAt: '2024-01-02',
	},
	{
		id: 'derv1ws0',
		taskDescription: 'Some task description',
		taskName: 'Third task name',
		Role: 'Pupil',
		createdAt: '2024-01-03',
	},
	{
		id: '5kma53ae',
		taskDescription: 'Yet another task description',
		taskName: 'Fourth task name',
		Role: 'Teacher',
		createdAt: '2024-01-04',
	},
	{
		id: 'bhqecj4p',
		taskDescription: 'Final task description',
		taskName: 'Fifth task name',
		Role: 'Pupil',
		createdAt: '2024-01-05',
	},
	{
		id: 'm5gr84i9',
		taskDescription: 'This is task description',
		taskName: 'Task name',
		Role: 'Teacher',
		createdAt: '2024-01-01',
	},
	{
		id: '3u1reuv4',
		taskDescription: 'Another task description',
		taskName: 'Second task name',
		Role: 'Viewer',
		createdAt: '2024-01-02',
	},
	{
		id: 'derv1ws0',
		taskDescription: 'Some task description',
		taskName: 'Third task name',
		Role: 'Pupil',
		createdAt: '2024-01-03',
	},
	{
		id: '5kma53ae',
		taskDescription: 'Yet another task description',
		taskName: 'Fourth task name',
		Role: 'Teacher',
		createdAt: '2024-01-04',
	},
	{
		id: 'bhqecj4p',
		taskDescription: 'Final task description',
		taskName: 'Fifth task name',
		Role: 'Pupil',
		createdAt: '2024-01-05',
	},
]

export type Payment = {
	id: string
	taskDescription: string
	taskName: string
	Role: string
	createdAt?: string
}

export const columns: ColumnDef<Payment>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: 'taskNumber',
		header: '№',
		cell: ({ row }) => {
			return <div>{row.index + 1}</div>
		},
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: 'taskName',
		header: 'Task name',
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('taskName')}</div>
		),
	},

	{
		accessorKey: 'Role',
		header: ({ column }) => {
			return (
				<div
					className='flex gap-2 items-center cursor-pointer'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Role
					<ArrowUpDown size={20} className='text-muted-foreground' />
				</div>
			)
		},
		cell: ({ row }) => <div className='lowercase'>{row.getValue('Role')}</div>,
	},
	{
		accessorKey: 'taskDescription',
		header: () => <div className='text-left'>Task Description</div>,
		cell: ({ row }) => {
			const description = row.getValue('taskDescription') as string
			return <div className='text-left font-medium'>{description}</div>
		},
	},

	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Created time
				</div>
			)
		},
		cell: ({ row }) => {
			const date = row.getValue('createdAt') as string
			const formatted = new Date(date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			})

			return <div className='text-sm text-muted-foreground'>{formatted}</div>
		},
	},

	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const payment = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild></DropdownMenuTrigger>
					<div className='flex items-center gap-3 p-2 '>
						<Link href={`/edit/${123}`}>
							<Edit3Icon className='size-5' />
						</Link>
						<Trash2 className='size-5 text-red-500 cursor-pointer' />
					</div>
				</DropdownMenu>
			)
		},
	},
]

export function MyTaskTable() {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	)
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})

	return (
		<div className='max-w-7xl mx-auto'>
			<div className='flex items-center py-4'>
				<Input
					placeholder='Filter role...'
					value={(table.getColumn('Role')?.getFilterValue() as string) ?? ''}
					onChange={event =>
						table.getColumn('Role')?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='ml-auto'>
							Columns <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter(column => column.getCanHide())
							.map(column => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={value => column.toggleVisibility(!!value)}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='overflow-hidden rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id} className=''>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id} className='text-start'>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id} className='text-start'>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end space-x-2 py-4'>
				<div className='text-muted-foreground flex-1 text-sm'>
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className='space-x-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}
