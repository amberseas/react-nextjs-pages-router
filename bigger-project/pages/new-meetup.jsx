import NewMeetupForm from '@/components/meetups/NewMeetupForm';

export default function HomePage() {
  function addMeetupHandler() {}
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}
