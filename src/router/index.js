import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import JourneyList from '@/views/JourneyList.vue'
import AddJourneyView from '@/views/AddJourneyView.vue'
import SingleJourney from '@/views/SingleJourney.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/journeylist',
      name: 'journey',
      component: JourneyList
    },
     {
      path: '/journey/add',
      name: 'newjourney',
      component: AddJourneyView
    },
        {
      path: '/journey/:id',
      name: 'singlejourney',
      component: SingleJourney
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
    // {
    //   path: '/journey/update',
    //   name: 'newjourney',
    //   component: AddJourneyView
    // }, 
  ]
})

export default router
