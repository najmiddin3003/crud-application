'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

function ModeToggle() {
	const [mount, setMount] = useState(false)
	const { setTheme, resolvedTheme } = useTheme()

	useEffect(() => setMount(true), [])

	return mount && resolvedTheme === 'dark' ? (
		<Button
			type='button'
			size={'icon'}
			variant={'outline'}
			onClick={() => setTheme('light')}
		>
			<Sun />
		</Button>
	) : (
		<Button
			type='button'
			size={'icon'}
			onClick={() => setTheme('dark')}
			variant={'outline'}
		>
			<Moon />
		</Button>
	)
}

export default ModeToggle
