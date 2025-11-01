/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ArrowUpDown, ChevronDown, Edit3Icon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
import RemoveBtn from './removeBtn'

export type Payment = {
	id: string
	taskDescription: string
	taskName: string
	Role: string
	createdAt?: string
}

// 🔹 API dan ma’lumot olish
const getTopics = async () => {
	try {
		const res = await fetch(
			'https://crud-application-zeta-peach.vercel.app/api/topics',
			{
				cache: 'no-store',
			}
		)

		if (!res.ok) {
			throw new Error('Failed to fetch topics')
		}

		// Agar API `{ topics: [...] }` qaytarsa:
		const { topics } = await res.json()
		return topics
	} catch (error) {
		console.error('Error loading topics:', error)
		return []
	}
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
		cell: ({ row }) => <div>{row.index + 1}</div>,
	},
	{
		accessorKey: 'taskName',
		header: 'Task name',
		cell: ({ row }) => <div>{row.getValue('taskName')}</div>,
	},

	{
		accessorKey: 'Role',
		header: ({ column }) => (
			<div
				className='flex gap-2 items-center cursor-pointer'
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Role <ArrowUpDown size={20} className='text-muted-foreground' />
			</div>
		),
		cell: ({ row }) => <div>{row.getValue('Role')}</div>,
	},
	{
		accessorKey: 'taskDescription',
		header: () => <div className='text-left'>Task Description</div>,
		cell: ({ row }) => (
			<div className='text-left font-medium'>
				{row.getValue('taskDescription')}
			</div>
		),
	},
	{
		accessorKey: 'createdAt',
		header: 'Created Time',
		cell: ({ row }) => {
			const date = row.getValue('createdAt') as string
			const formatted = new Date(date).toLocaleString()
			return <div className='text-sm text-muted-foreground'>{formatted}</div>
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const topic = row.original
			return (
				<div className='flex items-center gap-3 p-2'>
					<Link href={`/edit/${topic.id}`}>
						<Edit3Icon className='size-5' />
					</Link>
					<RemoveBtn id={topic.id} />
				</div>
			)
		},
	},
]

export function MyTaskTable() {
	const [data, setData] = useState<Payment[]>([])
	const [loading, setLoading] = useState(true)
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})

	// 🔹 Komponent yuklanganda ma’lumotni yuklash
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			const topics = await getTopics()

			// Agar backend dagi nomlar boshqa bo‘lsa, shu yerda moslashtirasan:
			const formatted = topics.map((t: any) => ({
				id: t._id,
				taskName: t.taskName,
				taskDescription: t.taskDescription,
				Role: t.role,
				createdAt: t.createdAt,
			}))

			setData(formatted)
			setLoading(false)
		}

		fetchData()
	}, [])

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

	if (loading) {
		return <div className='text-center py-10'>Loading topics...</div>
	}

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
							.map(column => (
								<DropdownMenuCheckboxItem
									key={column.id}
									className='capitalize'
									checked={column.getIsVisible()}
									onCheckedChange={value => column.toggleVisibility(!!value)}
								>
									{column.id}
								</DropdownMenuCheckboxItem>
							))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className='overflow-hidden rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<TableHead key={header.id} className='text-start'>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id}>
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
									className='text-center h-24'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
