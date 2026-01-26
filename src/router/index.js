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
      meta: {
        requiresAuth: true,
        permission: 'dashboard:view',
      },
    },
    {
      path: '/my-tasks',
      name: 'My Tasks',
      component: () => import('@/views/task/MytasksView.vue'),
      meta: {
        requiresAuth: true,
        permission: 'tasks:view',
      },
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('@/views/user/ListView.vue'),
      meta: {
        requiresAuth: true,
        permission: 'users:view',
      },
    },
    {
      path: '/user/add-new',
      name: 'Add New User',
      component: () => import('@/views/user/AddView.vue'),
      meta: {
        requiresAuth: true,
        permission: 'users:create',
      },
    },
    {
      path: '/user/:id',
      name: 'Edit User',
      component: () => import('@/views/user/EditView.vue'),
      meta: {
        requiresAuth: true,
        permission: 'users:edit',
      },
    },
    {
      path: '/user/show/:id/',
      name: 'User Profile',
      component: () => import('@/views/user/ShowView.vue'),
      meta: {
        requiresAuth: true,
        permission: 'users:view',
      },
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('@/views/project/ProjectsView.vue'),
      meta: {
        requiresAuth: true,
        permission: 'projects:view',
      },
    },
    {
      path: '/project/add-new',
      name: 'Add Project',
      component: () => import('@/views/project/AddProjectView.vue'),
      meta: {
        requiresAuth: true,
        permission: 'projects:create',
      },
    },
    {
      path: '/teams',
      name: 'Teams',
      component: () => import('@/views/team/ListView.vue'),
      meta: {
        requiresAuth: true,
        permission: 'teams:view',
      },
    },
    {
      path: '/team/add-new',
      name: 'Add Team',
      component: () => import('@/views/team/AddView.vue'),
      meta: {
        requiresAuth: true,
        permission: 'teams:create',
      },
    },
    {
      path: '/team/:id',
      name: 'Edit Team',
      component: () => import('@/views/team/EditView.vue'),
      meta: {
        requiresAuth: true,
        permission: 'teams:edit',
      },
    },
    {
      path: '/team/show/:id',
      name: 'Team Information',
      component: () => import('@/views/team/ShowView.vue'),
      meta: {
        requiresAuth: true,
        permission: 'teams:view',
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: () => import('@/views/UnauthorizedView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Not Found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

/**
 * 🔐 Global Auth + Permission Guard
 */
router.beforeEach((to, from, next) => {
  const auth = useAuth()

  // 1️⃣ Authentication
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next({ name: 'Login' })
    return
  }

  // 2️⃣ Permission check
  if (to.meta.permission && !auth.hasPermission(to.meta.permission)) {
    next({ name: 'Unauthorized' })
    return
  }

  // 3️⃣ Logged-in user accessing login
  if (to.name === 'Login' && auth.isLoggedIn) {
    next({ name: 'Dashboard' })
    return
  }

  next()
})

export default router
