import { Fragment } from 'react';
import Head from 'next/head';

import { useRouter } from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm.js';

const meetup = () => {
    const router = useRouter()
    const addMeetupHandler = async (enteredMeetupData) => {
        const res = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();
        console.log(data);

        router.push('/')
    }

    return (<Fragment>
        <Head>
            <title>Add New Meetup</title>
            <meta name='description' content='Add your own meetup' />
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
    </Fragment>)
}
export default meetup;