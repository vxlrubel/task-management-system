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
