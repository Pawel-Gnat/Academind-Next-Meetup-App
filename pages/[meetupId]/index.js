import { MongoClient } from 'mongodb'

import MeetupDetail from '../../components/meetups/MeetupDetail'

function MeetupDetails() {
	return <MeetupDetail />
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		'mongodb+srv://test:rGEZorSTBVVcWA4s@cluster0.mpllfxh.mongodb.net/meetups?retryWrites=true&w=majority'
	)
	const db = client.db()
	const meetupsCollection = db.collection('meetups')

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()

	client.close()

	return {
		fallback: false,
		paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } })),
	}
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId

	return {
		props: {
			meetupData: {
				image: '',
				id: meetupId,
				title: '',
				address: '',
				description: '',
			},
		},
	}
}

export default MeetupDetails
