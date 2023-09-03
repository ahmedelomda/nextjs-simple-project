import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from 'next/Head';
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
    // const router = useRouter();
    return (<Fragment>
        <Head>
            <title>{props.MeetupData.title}</title>
            <meta name='description' content={props.MeetupData.description} />
        </Head>
        <MeetupDetail image={props.MeetupData.image}
            title={props.MeetupData.title}
            address={props.MeetupData.address}
            description={props.MeetupData.description} />
    </Fragment>
    );
}
export async function getStaticPaths() {
    const client = await MongoClient.connect("mongodb+srv://amohamed5535:j1IJSAFLlXtQEgdf@cluster0.gnskzxn.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db()
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close()
    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        })),
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect("mongodb+srv://amohamed5535:j1IJSAFLlXtQEgdf@cluster0.gnskzxn.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db()
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne(({ _id: new ObjectId(meetupId) }));

    client.close()

    return {
        props: {
            MeetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            }
        }
    }
}
export default MeetupDetails;