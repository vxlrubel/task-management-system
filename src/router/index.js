import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
    },
    {
      path: '/my-tasks',
      name: 'My Tasks',
      component: () => import('../views/MytasksView.vue'),
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('../views/UsersView.vue'),
    },
    {
      path: '/user/:id',
      name: 'Edit User',
      component: () => import('../views/EditUserView.vue'),
    },
    {
      path: '/user/add-new',
      name: 'Add new user',
      component: () => import('../views/AddUserView.vue'),
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('../views/ProjectsView.vue'),
    },
    {
      path: '/project/add-new',
      name: 'Add new project',
      component: () => import('../views/AddProjectView.vue'),
    },
    {
      path: '/teams',
      name: 'Teams',
      component: () => import('../views/TeamsView.vue'),
    },
    {
      path: '/team/add-new',
      name: 'Add new team',
      component: () => import('../views/AddTeamView.vue'),
    },
  ],
})

export default router
