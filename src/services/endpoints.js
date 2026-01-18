export const user = {
  list: '/users',
  create: '/users',
  single: (id) => `/users/${id}`,
  update: (id) => `/users/${id}`,
  delete: (id) => `/users/${id}`,
}

export const team = {
  list: '/teams',
  create: '/teams',
  single: (id) => `/teams/${id}`,
  update: (id) => `/teams/${id}`,
  delete: (id) => `/teams/${id}`,
}
