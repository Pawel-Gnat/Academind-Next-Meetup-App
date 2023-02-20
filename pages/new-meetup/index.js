//meetup page

import NewMeetupForm from '../../components/meetups/NewMeetupForm'

function NewMeetupPage() {
	function addMeetupHandler(enteredMeetupData) {
		console.log(enteredMeetupData)
	}

	return <NewMeetupForm onAddmeetup={addMeetupHandler} />
}

export default NewMeetupPage
