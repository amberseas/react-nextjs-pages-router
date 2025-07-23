import Layout from '@/components/layout/Layout';
import MeetupList from '@/components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A first meetup',
    image:
      'https://media.istockphoto.com/id/2153261979/photo/green-residential-area.jpg?s=612x612&w=0&k=20&c=4mNHWILonAFZjgPmrfaRas7dCJ3itiFIlXqXYS_TPH8=',
    address: 'Street 5, 12345, City',
    description: 'This is a first meetup!',
  },
  {
    id: 'm2',
    title: 'A second meetup',
    image:
      'https://media.istockphoto.com/id/2153261979/photo/green-residential-area.jpg?s=612x612&w=0&k=20&c=4mNHWILonAFZjgPmrfaRas7dCJ3itiFIlXqXYS_TPH8=',
    address: 'Street 6, 12346, City',
    description: 'This is a second meetup!',
  },
];

export default function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
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
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10,
  };
}
