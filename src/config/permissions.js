export const ROLES = {
  ADMIN: 1,
  HR: 2,
  EMPLOYEE: 3,
}

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    'dashboard:view',
    'users:view',
    'users:create',
    'users:edit',
    'projects:view',
    'projects:create',
    'teams:view',
    'teams:create',
  ],

  [ROLES.HR]: ['dashboard:view', 'projects:view', 'projects:create', 'teams:view', 'teams:create'],

  [ROLES.EMPLOYEE]: ['dashboard:view', 'tasks:view'],
}
