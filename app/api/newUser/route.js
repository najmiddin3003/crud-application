import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import User from '../../../models/user'
import connectMongoDB from './../../../libs/mongodb'

export async function POST(req) {
	try {
		await connectMongoDB()

		const { email, password, confirmPassword } = await req.json()

		if (!email || !password || !confirmPassword) {
			return new Response(
				JSON.stringify({ message: 'All fields are required' }),
				{
					status: 400,
				}
			)
		}

		// 2️⃣ Parollar bir xilmi?
		if (password !== confirmPassword) {
			return new Response(
				JSON.stringify({ message: 'Passwords do not match' }),
				{
					status: 400,
				}
			)
		}

		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return new Response(JSON.stringify({ message: 'User already exists' }), {
				status: 400,
			})
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const newUser = new User({
			email,
			password: hashedPassword,
		})

		await newUser.save()

		return new Response(
			JSON.stringify({
				message: 'User registered successfully',
				user: {
					id: newUser._id,
					email: newUser.email,
				},
			}),
			{ status: 201 }
		)
	} catch (error) {
		console.error('Register Error:', error)
		return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
			status: 500,
		})
	}
}

export async function GET() {
	await connectMongoDB()
	const user = await User.find()
	return NextResponse.json({ user })
}
