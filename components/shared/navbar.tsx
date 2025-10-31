import Link from 'next/link'
import { Button } from '../ui/button'
import ModeToggle from './mode-toggle'
import { ProfileButton } from './profileButton'

const Navbar = () => {
	return (
		<div className=' light:bg-slate-100 dark:shadow-[#000] rounded-md px-4 py-4 shadow-md'>
			<div className='max-w-7xl mx-auto'>
				<div className='flex items-center justify-between '>
					<div>
						<Link href={'/'}>
							<h1>Crud Application</h1>
						</Link>
					</div>
					<div className='flex items-center gap-2'>
						<ModeToggle />
						<Link href={'/add'}>
							<Button variant={'outline'}>Add Task</Button>
						</Link>
						<ProfileButton />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Navbar
