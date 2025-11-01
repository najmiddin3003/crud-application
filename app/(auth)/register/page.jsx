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

const Register = () => {
	const router = useRouter()

	const [eye, setEye] = useState(false)
	const [confirmPasswordEye, setConfirmPasswordEye] = useState(false)
	const [buttonLoader, setButtonLoader] = useState(false)

	const [nameInput, setNameInput] = useState('')
	const [passwordInput, setPasswordInput] = useState('')
	const [confirmPasswordInput, setConfirmPasswordInput] = useState('')

	const handleData = async e => {
		e.preventDefault()
		setButtonLoader(true)

		if (!nameInput || !passwordInput || !confirmPasswordInput) {
			toast.error('Please fill in all fields!', {
				className: 'bg-red-500 text-white font-semibold',
			})
			setButtonLoader(false)
			return
		}

		try {
			const res = await fetch('/api/newUser', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: nameInput,
					password: passwordInput,
					confirmPassword: confirmPasswordInput,
				}),
			})

			const data = await res.json()

			if (!res.ok) {
				toast.error(data.message || 'Something went wrong', {
					className: 'bg-red-500 text-white font-semibold',
				})
				setButtonLoader(false)
				return
			}

			toast.success('Successfully registered!', {
				className: 'bg-green-500 text-white font-semibold',
			})

			setButtonLoader(false)
			router.push('/login')
		} catch (error) {
			toast.error('Server error!', {
				className: 'bg-red-500 text-white font-semibold',
			})
			setButtonLoader(false)
		}
	}

	const handleEye = () => {
		setEye(!eye)
	}

	const handleConfirmPasswordEye = () => {
		setConfirmPasswordEye(!confirmPasswordEye)
	}

	return (
		<div className='h-screen flex items-center justify-center '>
			<div className='rounded-xl dark:bg-[#000] py-4 px-10 w-120 min-h-content shadow-lg shadow-neutral-900/50'>
				<h1 className='text-center font-bold uppercase my-5 text-4xl dark:text-white'>
					Register
				</h1>
				<div>
					<form onSubmit={handleData} autoComplete='off'>
						<Label className='mb-2' htmlFor='email'>
							Email
						</Label>
						<Input
							onChange={e => setNameInput(e.target.value)}
							value={nameInput}
							className='dark:bg-neutral-900 border border-neutral-700
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
								className='dark:bg-neutral-900 border border-neutral-700 pr-8
'
								type={eye ? 'password' : 'eye'}
								placeholder='Please enter your password'
							/>
							{eye ? (
								<EyeOff
									onClick={handleEye}
									className=' absolute right-2 cursor-pointer opacity-50'
								/>
							) : (
								<Eye
									onClick={handleEye}
									className='absolute right-2 cursor-pointer'
								/>
							)}
						</div>
						<Label className='mt-4 mb-2' htmlFor='email'>
							Confirm password
						</Label>
						<div className='flex items-center justify-between gap-2 relative'>
							<Input
								onChange={e => setConfirmPasswordInput(e.target.value)}
								value={confirmPasswordInput}
								className='dark:bg-neutral-900 border border-neutral-700 pr-8
'
								type={confirmPasswordEye ? 'password' : 'eye'}
								placeholder='Confirm your password'
							/>
							{confirmPasswordEye ? (
								<EyeOff
									onClick={handleConfirmPasswordEye}
									className=' absolute right-2 cursor-pointer opacity-50'
								/>
							) : (
								<Eye
									onClick={handleConfirmPasswordEye}
									className='absolute right-2 cursor-pointer'
								/>
							)}
						</div>
						<div className='mt-4'>
							{buttonLoader ? (
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
					</form>
					<div className='mt-4 text-center'>
						<span className='text-[#999]'>Already have an account? </span>
						<Link href={'/login'}>Sign in</Link>
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
			</div>
		</div>
	)
}

export default Register
