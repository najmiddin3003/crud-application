'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { cn } from './../../lib/utils'
import Navbar from './navbar'

export default function EditTopicForm({ id, taskName, taskDescription, role }) {
	const [newTaskName, setNewTaskName] = useState(taskName)
	const [newTaskDescription, setNewTaskDescription] = useState(taskDescription)
	const [newRole, setNewRole] = useState(role)

	const [buttonLoading, setButtonLoading] = useState(false)

	const router = useRouter()
	const handleSubmit = async e => {
		e.preventDefault()
		setButtonLoading(true)

		console.log('Task name: ', newTaskName)
		console.log('Task description: ', newTaskDescription)
		console.log('Task role: ', newRole)

		if (newTaskName === '' || newTaskDescription === '' || newRole === '') {
			toast.error('Please fill in all fields!', {
				className:
					'dark:!bg-black dark:!border-0 dark:!text-red-500 font-semibold !bg-red-500 !text-white !border-0',
			})
			setButtonLoading(false)
			return // ✅ Shu return fetch() ni to‘xtatadi
		}

		try {
			const res = await fetch(
				`https://crud-application-zeta-peach.vercel.app/api/topics/${id}`,
				{
					method: 'PUT',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify({ newTaskName, newTaskDescription, newRole }),
				}
			)

			if (!res.ok) {
				throw new Error('Failed to update topic')
			}

			setButtonLoading(false)
			toast.success('Data submitted successfully!', {
				className:
					'dark:!bg-green-950 dark:!border-0 dark:!text-green-500 font-semibold !bg-green-500 !text-white !border-0',
			})
		} catch (error) {
			console.log(error)
			setButtonLoading(false)
		}
	}

	return (
		<div>
			<Navbar />

			<div className='max-w-[1400px] mx-auto px-4'>
				<div className='bg-slate-50 dark:bg-black shadow-2xl py-4 px-10 rounded-2xl mt-5'>
					<h1 className='text-3xl text-center font-bold uppercase my-4'>
						Edit task
					</h1>

					<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
						<Label className='mb-2' htmlFor='input'>
							Task name
						</Label>
						<Input
							onChange={e => setNewTaskName(e.target.value)}
							value={newTaskName}
							type='text'
							placeholder='Topic taskName'
						/>

						<Label className='mb-2' htmlFor='input'>
							Task description
						</Label>
						<Input
							onChange={e => setNewTaskDescription(e.target.value)}
							value={newTaskDescription}
							type='text'
							placeholder='Topic taskDescription'
						/>

						<Label className='mb-2' htmlFor='input'>
							Select role
						</Label>

						{/* 💡 Selectda avvalgi role qiymati chiqadi */}
						<Select value={newRole} onValueChange={value => setNewRole(value)}>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Select role' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Roles</SelectLabel>
									<SelectItem value='teacher'>Teacher</SelectItem>
									<SelectItem value='pupil'>Pupil</SelectItem>
									<SelectItem value='viewer'>Viewer</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<div className='flex justify-end mt-4'>
							{buttonLoading ? (
								<div className='opacity-60 cursor-no-drop'>
									<Button disabled type='submit'>
										<LoaderIcon
											role='status'
											aria-label='Loading'
											className={cn('size-4 animate-spin')}
										/>
										Sending
									</Button>
								</div>
							) : (
								<Button type='submit' variant={'outline'}>
									Send
								</Button>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
