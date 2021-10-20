import storage from './storage'

const tokenKey = 'v_token'

export const setToken = token => storage.set(tokenKey, token)
export const getToken = () => storage.get(tokenKey) || ''
export const clearToken = () => storage.clear(tokenKey)
