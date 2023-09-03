import { Fragment } from "react";
import Head from 'next/Head';
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {

    return (<Fragment>
        <Head>
            <title>React Meetups</title>
            <meta name='description' content='huge list of meetups' />
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>)
}

// Server Side Rendering (SSR) for pre-rendering component
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     // fetch data

//     return {
//         props: {
//             meetups: dummy
//         }
//     }
// }

// Static Site  Generation (SSG) for pre-rendering component
export async function getStaticProps() {
    const client = await MongoClient.connect("mongodb+srv://amohamed5535:j1IJSAFLlXtQEgdf@cluster0.gnskzxn.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db()

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();

    client.close()

    return {
        props: {
            meetups: meetups.map((item) => ({
                title: item.title,
                address: item.address,
                image: item.image,
                id: item._id.toString(),
            }))
        },
        revalidate: 1  // every second get data
    }
}
export default HomePage;