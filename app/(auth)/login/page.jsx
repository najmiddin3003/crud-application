'use client'

import { SpinnerCustom } from '@/components/shared/loader'
import ModeToggle from '@/components/shared/mode-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import GithubIcon from '../../_components/assets/icons/github.png'
import GoogleIcon from '../../_components/assets/icons/google-logo.png'

const Login = () => {
	const [eye, setEye] = useState(false)

	const [emailInput, setEmailInput] = useState('')
	const [passwordInput, setPasswordInput] = useState('')
	const [loader, setLoader] = useState(false)
	const router = useRouter()

	const handleData = e => {
		e.preventDefault()
		if (emailInput === '' || passwordInput === '') {
			setTimeout(() => {
				toast.error('Please fill the inputs!', {
					className: 'bg-red-500 text-white font-semibold',
				})
				return
			})

			setLoader(false)
		} else {
			setTimeout(() => {
				toast.success('Successfully logged in', {
					className: 'bg-green-500 text-white font-semibold',
				})
				setLoader(false)
				router.push('/add')
			}, 3400)
			setLoader(true)
		}
	}

	const handleEye = () => {
		setEye(!eye)
	}

	return (
		<div className='h-screen flex items-center justify-center '>
			<div className='rounded-xl dark:bg-[#000] py-4 px-10 w-120 min-h-content shadow-lg shadow-neutral-900/50'>
				<h1 className='text-center font-bold uppercase my-5 text-4xl light:text-[#4a4a4a]'>
					Login
				</h1>
				<form onSubmit={handleData}>
					<div>
						<Label className='mb-2' htmlFor='email'>
							Email
						</Label>
						<Input
							onChange={e => setEmailInput(e.target.value)}
							value={emailInput}
							className='dark:bg-input border border-input
'
							type='email'
							placeholder='Please enter your email'
						/>
						<Label className='mt-4 mb-2' htmlFor='email'>
							Password
						</Label>
						<div className='flex items-center justify-between gap-2 relative'>
							<Input
								onChange={e => setPasswordInput(e.target.value)}
								value={passwordInput}
								className='dark:bg-input border border-input
'
								type='text'
								placeholder='Please enter your password'
							/>

							{eye ? (
								<Eye
									onClick={handleEye}
									className='absolute right-2 cursor-pointer'
								/>
							) : (
								<EyeOff
									onClick={handleEye}
									className='absolute right-2 cursor-pointer opacity-50'
								/>
							)}
						</div>

						<div className='mt-4'>
							{loader ? (
								<Button
									type='submit'
									className='w-full bg-gradient-to-r text-white 
										 from-[#2a2a2a] cursor-no-drop to-[#4a4a4a] transition-all duration-300
										 border border-neutral-700 shadow-md shadow-black/30 opacity-40 
				'
								>
									<SpinnerCustom /> Signing in...
								</Button>
							) : (
								<Button
									type='submit'
									variant={'outline'}
									className='w-full
				'
								>
									Sign in
								</Button>
							)}
						</div>

						<div className='mt-4 text-center'>
							<span className='text-[#999]'>Don’t have an account? </span>
							<Link href={'/register'}>Register</Link>
						</div>

						<Separator className='my-4' />

						<p className='text-center'>or</p>

						<div className='flex items-center justify-center gap-4 mt-4'>
							<Button variant={'outline'} size={'icon'} type='button'>
								<div className='bg-white w-fit rounded-full'>
									<div className='cursor-pointer'>
										<Image className='w-5' src={GithubIcon} alt='Github icon' />
									</div>
								</div>
							</Button>
							<Button variant={'outline'} size={'icon'} type='button'>
								<div className='cursor-pointer'>
									<Image className='w-5' src={GoogleIcon} alt='Github icon' />
								</div>
							</Button>
							<ModeToggle />
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
