import eventsData from '../data/events.json';

// 導入所有事件圖片
import event1Img from '../assets/event1.jpg';
// import event2Img from '../assets/event2.jpg';
// import event3Img from '../assets/event3.jpg';
// import event4Img from '../assets/event4.jpg';
// import event5Img from '../assets/event5.jpg';
// import event6Img from '../assets/event6.jpg';

// 圖片映射表
const eventImages = {
  '/src/assets/event1.jpg': event1Img,
//   '/src/assets/event2.jpg': event2Img,
//   '/src/assets/event3.jpg': event3Img,
//   '/src/assets/event4.jpg': event4Img,
//   '/src/assets/event5.jpg': event5Img,
//   '/src/assets/event6.jpg': event6Img
};

// 處理事件數據，轉換圖片路徑
const processedEvents = eventsData.map(event => ({
  ...event,
  image: eventImages[event.image] || event.image
}));

/**
 * 事件服務 - 提供獲取事件數據的方法
 */
export const eventService = {
  /**
   * 獲取所有事件
   * @returns {Array} 所有事件數據
   */
  getAllEvents() {
    return processedEvents;
  },

  /**
   * 獲取特定ID的事件
   * @param {string} id 事件ID
   * @returns {Object|null} 事件對象，若未找到則返回null
   */
  getEventById(id) {
    return processedEvents.find(event => event.id === id) || null;
  },

  /**
   * 獲取精選事件
   * @param {number} limit 限制返回的數量，若為0則返回所有精選事件
   * @returns {Array} 精選事件數據
   */
  getFeaturedEvents(limit = 0) {
    const featured = processedEvents.filter(event => event.featured);
    return limit > 0 ? featured.slice(0, limit) : featured;
  },

  /**
   * 獲取即將舉辦的事件
   * @param {number} limit 限制返回的數量，若為0則返回所有未結束事件
   * @returns {Array} 即將舉辦的事件數據
   */
  getUpcomingEvents(limit = 0) {
    const upcoming = processedEvents.filter(event => 
      event.status === '報名中' || event.status === '籌備中'
    );
    return limit > 0 ? upcoming.slice(0, limit) : upcoming;
  },

  /**
   * 獲取相關事件（除了當前事件外的其他事件）
   * @param {string} currentEventId 當前事件ID
   * @param {number} limit 限制返回的數量
   * @returns {Array} 相關事件數據
   */
  getRelatedEvents(currentEventId, limit = 3) {
    return processedEvents
      .filter(event => event.id !== currentEventId)
      .slice(0, limit);
  },

  /**
   * 根據狀態獲取事件
   * @param {string} status 事件狀態（'報名中', '籌備中', '已結束'）
   * @returns {Array} 符合狀態的事件數據
   */
  getEventsByStatus(status) {
    return processedEvents.filter(event => event.status === status);
  }
}; 