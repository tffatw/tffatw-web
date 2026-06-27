import { getAllEvents } from '@/lib/articleService'
import EventsClient from './EventsClient'

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  const allEvents = await getAllEvents()
  return <EventsClient initialEvents={allEvents} />
}
