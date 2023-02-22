import Head from 'next/head'
import { MongoClient } from 'mongodb'

import MeetupList from '../components/meetups/MeetupList'

function HomePage(props) {
	return (
		<>
			<Head>
				<title>Meetup App</title>
				<meta
					name='description'
					content='Best app ever'
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	)
}

export async function getStaticProps() {
	const client = await MongoClient.connect(
		'mongodb+srv://test:rGEZorSTBVVcWA4s@cluster0.mpllfxh.mongodb.net/meetups?retryWrites=true&w=majority'
	)
	const db = client.db()
	const meetupsCollection = db.collection('meetups')

	const meetups = await meetupsCollection.find().toArray()

	client.close()

	return {
		props: {
			meetups: meetups.map(meetup => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 10,
	}
}

export default HomePage
