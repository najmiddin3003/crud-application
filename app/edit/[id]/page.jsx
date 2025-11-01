import EditTopicForm from '../../../components/shared/editForm'

const getTopicById = async id => {
	try {
		const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
			cache: 'no-store',
		})

		if (!res.ok) {
			throw new Error('Failed to fetch topic')
		}

		return res.json()
	} catch (error) {
		console.log(error)
	}
}

export default async function EditTopic({ params }) {
	const { id } = params
	const { topic } = await getTopicById(id)
	const { taskName, taskDescription, role } = topic

	return (
		<EditTopicForm
			id={id}
			taskName={taskName}
			taskDescription={taskDescription}
			role={role}
		/>
	)
}
