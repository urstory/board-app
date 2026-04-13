const BASE_URL = 'https://api.fullstackfamily.com/api/edu/ws-283fc1'

function getToken() {
  return localStorage.getItem('token')
}

function setToken(token) {
  localStorage.setItem('token', token)
}

function removeToken() {
  localStorage.removeItem('token')
}

function getUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

function removeUser() {
  localStorage.removeItem('user')
}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`
  const headers = { ...options.headers }

  const token = getToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(options.body)
  }

  const response = await fetch(url, { ...options, headers })

  if (response.status === 204) {
    return null
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message = data?.message || `요청 실패 (${response.status})`
    throw new Error(message)
  }

  // API 응답이 { success, message, data } 래퍼로 감싸져 있으면 data만 반환
  if (data && data.success !== undefined && data.data !== undefined) {
    return data.data
  }

  return data
}

// Auth
export async function signup(username, password, nickname) {
  return request('/auth/signup', {
    method: 'POST',
    body: { username, password, nickname },
  })
}

export async function login(username, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: { username, password },
  })
  setToken(data.token)
  setUser(data.user)
  return data
}

export function logout() {
  removeToken()
  removeUser()
}

export function isLoggedIn() {
  return !!getToken()
}

export { getUser }

// Posts
export async function getPosts(page = 0, size = 5) {
  return request(`/posts?page=${page}&size=${size}`)
}

export async function getPost(id) {
  return request(`/posts/${id}`)
}

export async function createPost(title, content) {
  // 1. Draft 생성
  const draft = await request('/posts', {
    method: 'POST',
    body: { title, content },
  })
  // 2. 바로 발행
  const published = await request(`/posts/${draft.id}/publish`, {
    method: 'PUT',
    body: { title, content },
  })
  return published
}

export async function updatePost(id, title, content) {
  // 수정 후 다시 발행
  await request(`/posts/${id}`, {
    method: 'PUT',
    body: { title, content },
  })
  return request(`/posts/${id}/publish`, {
    method: 'PUT',
    body: { title, content },
  })
}

export async function deletePost(id) {
  return request(`/posts/${id}`, { method: 'DELETE' })
}

// Comments
export async function getComments(postId) {
  return request(`/posts/${postId}/comments`)
}

export async function createComment(postId, content) {
  return request(`/posts/${postId}/comments`, {
    method: 'POST',
    body: { content },
  })
}

export async function updateComment(id, content) {
  return request(`/comments/${id}`, {
    method: 'PUT',
    body: { content },
  })
}

export async function deleteComment(id) {
  return request(`/comments/${id}`, { method: 'DELETE' })
}
