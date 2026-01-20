import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/my-tasks',
      name: 'My Tasks',
      component: () => import('@/views/MytasksView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('@/views/UsersView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/user/add-new',
      name: 'Add New User',
      component: () => import('@/views/AddUserView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/user/:id',
      name: 'Edit User',
      component: () => import('@/views/EditUserView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('@/views/ProjectsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/project/add-new',
      name: 'Add Project',
      component: () => import('@/views/AddProjectView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/teams',
      name: 'Teams',
      component: () => import('@/views/TeamsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/team/add-new',
      name: 'Add Team',
      component: () => import('@/views/AddTeamView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/team/:id',
      name: 'Edit Team',
      component: () => import('@/views/EditTeamView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuth()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next({ name: 'Login' })
    return
  }

  if (to.name === 'Login' && auth.isLoggedIn) {
    next({ name: 'Dashboard' })
    return
  }

  next()
})

export default router
