import Head from 'next/head';
import MeetupList from '@/components/meetups/MeetupList';
import { MongoClient } from 'mongodb';

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A first meetup',
//     image:
//       'https://media.istockphoto.com/id/2153261979/photo/green-residential-area.jpg?s=612x612&w=0&k=20&c=4mNHWILonAFZjgPmrfaRas7dCJ3itiFIlXqXYS_TPH8=',
//     address: 'Street 5, 12345, City',
//     description: 'This is a first meetup!',
//   },
//   {
//     id: 'm2',
//     title: 'A second meetup',
//     image:
//       'https://media.istockphoto.com/id/2153261979/photo/green-residential-area.jpg?s=612x612&w=0&k=20&c=4mNHWILonAFZjgPmrfaRas7dCJ3itiFIlXqXYS_TPH8=',
//     address: 'Street 6, 12346, City',
//     description: 'This is a second meetup!',
//   },
// ];

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { req, res } = context;
//   // fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

//better if data doesn't change frequently

export async function getStaticProps() {
  // fetch data from API
  const client = await MongoClient.connect(
    'mongodb+srv://gintareba:UlbpXZgSU8EF7K2Y@cluster0.7ehcv9e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const result = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: result.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
