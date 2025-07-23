import MeetupDetails from '@/components/meetups/MeetupDetails';

export default function MeetupDetailsPage() {
  return (
    <MeetupDetails
      id='m2'
      title='A second meetup'
      image='https://media.istockphoto.com/id/2153261979/photo/green-residential-area.jpg?s=612x612&w=0&k=20&c=4mNHWILonAFZjgPmrfaRas7dCJ3itiFIlXqXYS_TPH8='
      address='Street 6, 12346, City'
      description='This is a second meetup!'
    />
  );
}
export function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupID: 'm1',
        },
      },
      {
        params: {
          meetupID: 'm2',
        },
      },
    ],
  };
}
export function getStaticProps(context) {
  const meetupID = context.params.meetupID;
  return {
    props: {
      meetup: {
        id: 'm1',
        title: 'A first meetup',
        image:
          'https://media.istockphoto.com/id/2153261979/photo/green-residential-area.jpg?s=612x612&w=0&k=20&c=4mNHWILonAFZjgPmrfaRas7dCJ3itiFIlXqXYS_TPH8=',
        address: 'Street 5, 12345, City',
        description: 'This is a first meetup!',
      },
    },
  };
}
