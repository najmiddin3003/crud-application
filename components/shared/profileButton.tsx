import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

export function ProfileButton() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant={'outline'}>Profile</Button>
			</PopoverTrigger>
			<PopoverContent className='w-80'>
				<div className='grid gap-4'>
					<div className='space-y-2'>
						<h4 className='leading-none font-medium'>
							Najmiddin Turg`unpo`latov
						</h4>
						<p className='text-muted-foreground text-sm'>developer@gmail.com</p>
					</div>

					<Link href={'/myTasks'}>
						<div className='border py-2 px-3 rounded-md'>My tasks</div>
					</Link>
					<div className='grid gap-2'>
						<Button variant={'destructive'}>
							{' '}
							<LogOut className='rotate-180' /> Logout
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
