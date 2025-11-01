import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
	{
		email: {
			type: String,
		},
		password: {
			type: String,
		},
	},
	{ timestamps: true }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
