export const users = {
  list: '/users',
  create: '/users',
  single: (id) => `/users/${id}`,
  update: (id) => `/users/${id}`,
  delete: (id) => `/users/${id}`,
}

export const teamEndpoint = {
  list: '/teams',
  create: '/teams',
  single: (id) => `/teams/${id}`,
  update: (id) => `/teams/${id}`,
  delete: (id) => `/teams/${id}`,
}

export const memberEndpoint = {
  list: '/team_members',
  create: '/team_members',
  single: (id) => `/team_members/${id}`,
  update: (id) => `/team_members/${id}`,
  delete: (id) => `/team_members/${id}`,
}

export const projectEndpoint = {
  list: '/projects',
  create: '/projects',
  single: (id) => `/projects/${id}`,
  update: (id) => `/projects/${id}`,
  delete: (id) => `/projects/${id}`,
}

export const taskEndpoint = {
  list: '/tasks',
  create: '/tasks',
  single: (id) => `/tasks/${id}`,
  update: (id) => `/tasks/${id}`,
  delete: (id) => `/tasks/${id}`,
}

export const commentEndpoint = {
  list: '/task_comments',
  create: '/task_comments',
  single: (id) => `/task_comments/${id}`,
  update: (id) => `/task_comments/${id}`,
  delete: (id) => `/task_comments/${id}`,
}

export const logsEndpoint = {
  list: '/task_activity_logs',
  create: '/task_activity_logs',
  single: (id) => `/task_activity_logs/${id}`,
  update: (id) => `/task_activity_logs/${id}`,
  delete: (id) => `/task_activity_logs/${id}`,
}

export const notificationEndpoint = {
  list: '/notifications',
  create: '/notifications',
  single: (id) => `/notifications/${id}`,
  update: (id) => `/notifications/${id}`,
  delete: (id) => `/notifications/${id}`,
}
