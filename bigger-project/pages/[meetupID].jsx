import MeetupDetails from '@/components/meetups/MeetupDetails';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

export default function MeetupDetailsPage(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetails
        {...props.meetupData}
        // id='m2'
        // title='A second meetup'
        // image='https://media.istockphoto.com/id/2153261979/photo/green-residential-area.jpg?s=612x612&w=0&k=20&c=4mNHWILonAFZjgPmrfaRas7dCJ3itiFIlXqXYS_TPH8='
        // address='Street 6, 12346, City'
        // description='This is a second meetup!'
      />
    </>
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://gintareba:UlbpXZgSU8EF7K2Y@cluster0.7ehcv9e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const result = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths: result.map((meetup) => ({
      params: { meetupID: meetup._id.toString() },
    })),
    // [
    //   {
    //     params: {
    //       meetupID: 'm1',
    //     },
    //   },
    //   {
    //     params: {
    //       meetupID: 'm2',
    //     },
    //   },
    // ],
  };
}
export async function getStaticProps(context) {
  const meetupID = context.params.meetupID;
  const client = await MongoClient.connect(
    'mongodb+srv://gintareba:UlbpXZgSU8EF7K2Y@cluster0.7ehcv9e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupID),
  });
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
      // {
      //   id: 'm1',
      //   title: 'A first meetup',
      //   image:
      //     'https://media.istockphoto.com/id/2153261979/photo/green-residential-area.jpg?s=612x612&w=0&k=20&c=4mNHWILonAFZjgPmrfaRas7dCJ3itiFIlXqXYS_TPH8=',
      //   address: 'Street 5, 12345, City',
      //   description: 'This is a first meetup!',
      // },
    },
  };
}
