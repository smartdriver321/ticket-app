import EditTicketForm from '../../../components/EditTicketForm'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
const getTicketById = async (id) => {
	try {
		const res = await fetch(`${APP_URL}/api/Tickets/${id}`, {
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

let updateTicketData = {}
const TicketPage = async ({ params }) => {
	const EDITMODE = params.id === 'new' ? false : true

	if (EDITMODE) {
		updateTicketData = await getTicketById(params.id)
		updateTicketData = updateTicketData.foundTicket
	} else {
		updateTicketData = {
			_id: 'new',
		}
	}

	return <EditTicketForm ticket={updateTicketData} />
}

export default TicketPage
