import bcrypt from 'bcryptjs'
import connectMongoDB from '../../../libs/mongodb'
import User from '../../../models/user'

export async function POST(req) {
	try {
		const { email, password } = await req.json()

		// 1️⃣ Maydonlar to‘ldirilganmi?
		if (!email || !password) {
			return new Response(
				JSON.stringify({ message: 'All fields are required' }),
				{ status: 400 }
			)
		}

		// 2️⃣ Bazaga ulanamiz
		await connectMongoDB()

		// 3️⃣ Foydalanuvchi mavjudligini tekshirish
		const user = await User.findOne({ email })
		if (!user) {
			return new Response(JSON.stringify({ message: 'User not found' }), {
				status: 404,
			})
		}

		// 4️⃣ Parolni tekshirish
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			return new Response(JSON.stringify({ message: 'Invalid password' }), {
				status: 401,
			})
		}

		// 5️⃣ Muvaffaqiyatli login
		return new Response(
			JSON.stringify({
				message: 'Login successful ✅',
				user: {
					id: user._id,
					email: user.email,
				},
			}),
			{ status: 200 }
		)
	} catch (error) {
		console.error('Login Error:', error)
		return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
			status: 500,
		})
	}
}
