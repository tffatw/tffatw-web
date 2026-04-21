import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import LeadershipPage from '../views/LeadershipPage.vue'
import BrandsPage from '../views/BrandsPage.vue'
import EventsPage from '../views/EventsPage.vue'
import ContactPage from '../views/ContactPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/leadership',
    name: 'Leadership',
    component: LeadershipPage
  },
  {
    path: '/brands',
    name: 'Brands',
    component: BrandsPage
  },
  {
    path: '/events',
    name: 'Events',
    component: EventsPage
  },
  {
    path: '/events/:id',
    name: 'EventDetail',
    component: () => import('../views/EventDetailPage.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage
  },
  {
    path: '/redOrange',
    name: 'RedOrange',
    component: () => import('../views/RedOrangePage.vue'),
    meta: { standalone: true }
  },
  {
    path: '/redOrange-backend',
    name: 'RedOrangeBackend',
    component: () => import('../views/RedOrangeBackendPage.vue'),
    meta: { standalone: true }
  },
  {
    path: '/association-login',
    name: 'AssociationLogin',
    component: () => import('../views/AssociationLoginPage.vue'),
    meta: { standalone: true }
  },
  {
    path: '/news',
    name: 'NewsList',
    component: () => import('../views/NewsListPage.vue'),
    meta: { standalone: true }
  },
  {
    path: '/news/editor',
    name: 'NewsEditor',
    component: () => import('../views/NewsEditorPage.vue'),
    meta: { standalone: true }
  },
  {
    path: '/news/editor/:id',
    name: 'NewsEditorEdit',
    component: () => import('../views/NewsEditorPage.vue'),
    meta: { standalone: true }
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

export default router 
