
import { createRouter, createWebHistory } from 'vue-router'

import Admin from "../pages/admin.vue";
import Courses from "../pages/courses.vue";



const routes = [
  {
    path: '/',
    name: 'Index',
    component: '',
    props: {
      rootState: 'Index',
      pageTitle: 'Olimp',
    },
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin,
    props: {
      pageTitle: 'Admin page',
    },
  },
  {
    path:'/courses',
    name: 'Courses',
    component: Courses,
    props: {
      pageTitle: 'Courses page',
    },
  }
  
]


const router = createRouter({
  history: createWebHistory(),
  routes 
})


export default router;
