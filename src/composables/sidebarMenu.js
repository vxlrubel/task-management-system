import { computed, reactive } from 'vue'
import { useAuth } from '@/stores/auth'

export function useSidebarMenu() {
  const auth = useAuth()

  // =========================
  // MENU CONFIG (RAW)
  // =========================
  const menuGroup = reactive([
    {
      name: 'general',
      items: [
        {
          name: 'Dashboard',
          slug: '/',
          icon: 'D',
          permission: 'dashboard:view',
        },
        {
          name: 'My Tasks',
          slug: '/my-tasks',
          icon: 'M',
          permission: 'tasks:view',
        },
      ],
    },

    {
      name: 'projects',
      permission: 'projects:view',
      items: [
        {
          name: 'All Projects',
          slug: '/projects',
          icon: 'P',
          permission: 'projects:view',
        },
      ],
      addNew: {
        slug: '/project/add-new',
        permission: 'projects:create',
      },
    },

    {
      name: 'team',
      permission: 'teams:view',
      items: [
        {
          name: 'All Teams',
          slug: '/teams',
          icon: 'T',
          permission: 'teams:view',
        },
      ],
      addNew: {
        slug: '/team/add-new',
        permission: 'teams:create',
      },
    },

    {
      name: 'users',
      permission: 'users:view',
      items: [
        {
          name: 'All Users',
          slug: '/users',
          icon: 'U',
          permission: 'users:view',
        },
      ],
      addNew: {
        slug: '/user/add-new',
        permission: 'users:create',
      },
    },

    {
      name: 'appearance',
      items: [
        {
          name: 'Settings',
          slug: '/settings',
          icon: 'D',
          permission: 'dashboard:view',
        },
      ],
    },
  ])

  // =========================
  // FILTERED MENU (AUTO)
  // =========================
  const filteredMenu = computed(() => {
    return menuGroup
      .map((group) => {
        const filteredItems = group.items?.filter(
          (item) => !item.permission || auth.hasPermission(item.permission),
        )

        const groupAllowed = !group.permission || auth.hasPermission(group.permission)

        const addNewAllowed = group.addNew && auth.hasPermission(group.addNew.permission)

        if (!groupAllowed || !filteredItems?.length) {
          return null
        }

        return {
          ...group,
          items: filteredItems,
          addNew: addNewAllowed ? group.addNew.slug : null,
        }
      })
      .filter(Boolean)
  })

  return {
    menuGroup: filteredMenu,
  }
}
