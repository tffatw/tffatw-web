import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'tffatw_auth_session'

function loadAccounts() {
  try {
    const raw = import.meta.env.VITE_MEMBER_ACCOUNTS
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const currentUser = ref(null)

  function login(account, password) {
    const accounts = loadAccounts()
    const match = accounts.find(
      (a) => a.account === account && a.password === password
    )
    if (!match) return false

    isLoggedIn.value = true
    currentUser.value = { account: match.account, name: match.name }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser.value))
    return true
  }

  function logout() {
    isLoggedIn.value = false
    currentUser.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  function restoreSession() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        currentUser.value = JSON.parse(saved)
        isLoggedIn.value = true
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return { isLoggedIn, currentUser, login, logout, restoreSession }
})
