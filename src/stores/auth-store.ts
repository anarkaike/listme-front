import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { $api } from '@/services/api'
import { IAuthResponse, IUser } from '@/interfaces'
import useNotify from '@/composables/useNotify'
const { notifySuccess, notifyError } = useNotify()

export const authStore = defineStore('authStore', {
  state: () => ({
    user: null as IUser | null,
    user_impersonation: null as IUser | null,
    token: null as string|null
  }),
  getters: {
    isLoggedIn: (state) => {
      return !!state.token
    }
  },
  actions: {
    async login (email: string, password: string): Promise<IAuthResponse> {
      try {
        const res = await $api.auth.login(email, password)
        if (!res.success) {
          throw new Error('Erro ao tentar realizar o acesso.')
        }
        LocalStorage.set('LmToken', res.data.token.plainTextToken)
        this.$patch({
          user: res.data.user,
          token: res.data.token.plainTextToken
        })
        notifySuccess('Acesso realizado com sucesso')
        return res
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(JSON.stringify(err).substring(650))
        throw err
      }
    },
    async logout (): Promise<boolean> {
      try {
        const res = await $api.auth.logout()
        if (!res.success) {
          throw new Error('Erro ao tentar encerrar o acesso.')
        }
        this.$patch({
          user: null,
          user_impersonation: null,
          token: null
        })
        LocalStorage.set('LmToken', null)
        notifySuccess('Acesso encerrado com sucesso')
        return true
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    }
  },
  persist: true
})
