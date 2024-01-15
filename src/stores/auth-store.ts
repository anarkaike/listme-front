import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { $api } from '@/services/api'
import { IAuthResponse, ISaasClient, IUser } from '@/interfaces'
import { $notify, $loading } from '@/composables'

export const authStore = defineStore('authStore', {
  state: () => ({
    user: null as IUser | null,
    saasClient: null as ISaasClient | null,
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
      $loading.show('Realizando acesso...')
      try {
        // Chamando login da API e verificando sucesso
        const res = await $api.auth.login(email, password)
        if (!res.success) {
          console.error('Erro no requst login: ', res)
          throw new Error(res.message)
        }

        // Gravando dados no state
        LocalStorage.set('LmToken', res.data.token.plainTextToken)
        this.$patch({
          user: res.data.user,
          saasClient: res.data.saasClient,
          token: res.data.token.plainTextToken
        })

        $loading.hide()
        $notify.success('Acesso realizado com sucesso')
        return res
      } catch (err) {
        $loading.hide()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao acessar o sistema')
        console.error('Erro no login no catch:  ', err)
        throw err
      }
    },
    async autoRegister (user: IUser): Promise<IAuthResponse> {
      $loading.show('Realizando cadastro...')
      try {
        // Chamando autoRegister da API
        const res = await $api.auth.autoRegister(user)
        if (!res.success) {
          console.error('Erro no request autoRegister: ', res)
          throw new Error(res.message)
        }

        // Gravando retorno no state
        LocalStorage.set('LmToken', res.data.token.plainTextToken)
        this.$patch({
          user: res.data.user,
          saasClient: res.data.saasClient,
          token: res.data.token.plainTextToken
        })

        $loading.hide()
        $notify.success('Cadastro realizado com sucesso')
        return res
      } catch (err) {
        $loading.hide()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (err?.response?.data?.message === 'denied_access') this.router.push({ name: 'login' })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao realizar o cadastro')
        console.error('Erro no autoRegister: ', err)
        throw err
      }
    },
    async logout (): Promise<boolean> {
      $loading.show('Encerrando acesso...')
      try {
        // Resetando estado
        this.$patch({
          user: null,
          user_impersonation: null,
          token: null
        })

        // Chamando logout da api e verificando sucesso
        const res = await $api.auth.logout()
        if (!res.success) {
          console.error('Erro no request logout: ', res)
          throw new Error(res.message)
        }

        $loading.hide()
        $notify.success('Acesso encerrado com sucesso')
        LocalStorage.clear()
        return true
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao encerrar o sistema')
        $loading.hide()
        console.error('Erro no logou no catch: ', err)
        throw err
      }
    }
  },
  persist: true
})
