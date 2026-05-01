import { eventService } from '@/lib/eventService'
import EventDetailClient from './EventDetailClient'
import Link from 'next/link'

export function generateStaticParams() {
  return ['1', '2', '3', '4', '5', '6', '7', '8'].map(id => ({ id }))
}

export default function EventDetailPage({ params }) {
  const event = eventService.getEventById(params.id)

  if (!event) {
    return (
      <div className="py-32 text-center">
        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="mt-4 text-2xl font-bold text-gray-700">未找到活動</h2>
        <p className="mt-2 text-gray-500">抱歉，未找到您請求的活動信息</p>
        <div className="mt-6">
          <Link href="/events" className="btn btn-primary">返回活動列表</Link>
        </div>
      </div>
    )
  }

  const relatedEvents = eventService.getRelatedEvents(params.id, 3)
  return <EventDetailClient event={event} relatedEvents={relatedEvents} />
}
