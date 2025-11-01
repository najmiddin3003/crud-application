import mongoose, { Schema } from 'mongoose'

const topicSchema = new Schema(
	{
		taskDescription: String,
		taskName: String,
		role: String,
	},
	{
		timestamps: true,
	}
)

const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema)

export default Topic
