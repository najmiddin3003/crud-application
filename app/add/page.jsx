'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectGroup, SelectLabel } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import Navbar from '@/components/shared/navbar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const Add = () => {
	const [taskName, setTaskName] = useState('')
	const [taskDescription, setTaskDescription] = useState('')
	const [role, setRole] = useState('')
	const [buttonLoading, setButtonLoading] = useState(false)

	const router = useRouter()

	const sendData = async e => {
		e.preventDefault()
		setButtonLoading(true)

		if (taskName === '' || taskDescription === '' || role === '') {
			toast.error('Please fill in all fields!', {
				className:
					'dark:!bg-black dark:!border-0 dark:!text-red-500 font-semibold !bg-red-500 !text-white !border-0',
			})
			setButtonLoading(false)
		} else {
			setTimeout(() => {
				setButtonLoading(false)
				toast.success('Data submitted successfully!', {
					className:
						'dark:!bg-green-950 dark:!border-0 dark:!text-green-500 font-semibold !bg-green-500 !text-white !border-0',
				})

				setTaskName('')
				setTaskDescription('')
				setRole('')
			}, 1400)
		}

		try {
			const res = await fetch(
				'https://crud-application-zeta-peach.vercel.app/api/topics',
				{
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify({ taskDescription, taskName, role }),
				}
			)

			if (res.ok) {
				router.refresh()
			} else {
				throw new Error('Failed to create a topic')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Navbar />
			<div className='max-w-[1400px] mx-auto px-4'>
				<div className='bg-slate-50 dark:bg-black shadow-2xl py-4 px-10 rounded-2xl mt-5'>
					<h1 className='text-3xl text-center font-bold uppercase my-4'>
						Add Task
					</h1>

					<form onSubmit={sendData}>
						<div className='flex items-center justify-between'>
							<div className='w-full flex flex-col gap-4'>
								<div>
									<Label className='mb-2' htmlFor='input'>
										Task name
									</Label>
									<Input
										onChange={e => setTaskName(e.target.value)}
										value={taskName}
										placeholder='Add task name'
									/>
								</div>
								<div>
									<Label className='mb-2' htmlFor='input'>
										Task description
									</Label>

									<Textarea
										onChange={e => setTaskDescription(e.target.value)}
										value={taskDescription}
										className=''
										placeholder='Add task description'
									/>
								</div>
								<div>
									<Label className='mb-2' htmlFor='input'>
										Select role
									</Label>

									<Select onValueChange={value => setRole(value)}>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Select role' />
										</SelectTrigger>
										<SelectContent className='w-full'>
											<SelectGroup className='w-full'>
												<SelectLabel>Roles</SelectLabel>
												<SelectItem value='teacher'>Teacher</SelectItem>
												<SelectItem value='pupil'>Pupil</SelectItem>
												<SelectItem value='viewer'>Viewer</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>

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
		</>
	)
}

export default Add
