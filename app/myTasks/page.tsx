import { MyTaskTable } from '@/components/shared/myTasksTable'
import Navbar from '@/components/shared/navbar'

const page = () => {
	return (
		<div>
			<Navbar />

			<MyTaskTable />
		</div>
	)
}

export default page
