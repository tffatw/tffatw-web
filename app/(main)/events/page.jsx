import { eventService } from '@/lib/eventService'
import EventsClient from './EventsClient'

export default function EventsPage() {
  const allEvents = eventService.getAllEvents()
  return <EventsClient initialEvents={allEvents} />
}
