import eventsData from './events.json'

export const eventService = {
  getAllEvents() {
    const parseDate = (dateString) => {
      const [year, month, day] = dateString.match(/\d+/g).map(Number)
      return new Date(year, month - 1, day)
    }
    return eventsData.slice().sort((a, b) => {
      return parseDate(b.date) - parseDate(a.date)
    })
  },

  getEventById(id) {
    return eventsData.find(event => event.id === id) || null
  },

  getFeaturedEvents(limit = 0) {
    const parseDate = (dateString) => {
      const [year, month, day] = dateString.match(/\d+/g).map(Number)
      return new Date(year, month - 1, day)
    }
    const featured = eventsData
      .filter(event => event.featured)
      .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    return limit > 0 ? featured.slice(0, limit) : featured
  },

  getUpcomingEvents(limit = 0) {
    const upcoming = eventsData.filter(event =>
      event.status === '報名中' || event.status === '籌備中'
    )
    return limit > 0 ? upcoming.slice(0, limit) : upcoming
  },

  getRelatedEvents(currentEventId, limit = 3) {
    return eventsData
      .filter(event => event.id !== currentEventId)
      .slice(0, limit)
  },

  getEventsByStatus(status) {
    return eventsData.filter(event => event.status === status)
  },
}
