import { defineStore } from 'pinia'
import { Dialog, LocalStorage } from 'quasar'
import { $api } from '@/services/api'
import { IAuthResponse, ISaasClient, IUser } from '@/interfaces'
import { $notify, $loading } from '@/composables'
import { Router } from 'vue-router'

export const authStore = defineStore('authStore', {
  state: () => ({
    user: null as IUser | null,
    saas_client: null as ISaasClient | null,
    user_impersonation: null as IUser | null,
    token: null as string|null
  }),
  getters: {
    isLoggedIn: (state) => {
      return !!state.token
    }
  },
  actions: {
    /**
     * Login - Gerar token de acesso na API e criar sessão do usuário
     *
     * @param email
     * @param password
     * @param router - Se passar o router, um redirect para /login é feito automaticamente apos a limpesa da sessão
     */
    async login (email: string, password: string, router: Router|null = null): Promise<IAuthResponse> {
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
          saas_client: res.data.saasClient,
          token: res.data.token.plainTextToken
        })

        $loading.hide()
        $notify.success('Acesso realizado com sucesso')
        if (router) await router.push({ name: 'home' })
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
    /**
     * AutoRegister - Auto cadastro feito pelo cliete que cai na landing page. Cria sessão apos realizado
     *
     * @param user
     * @param router - Se passar o router, um redirect para /login é feito automaticamente apos a limpesa da sessão
     */
    async autoRegister (user: IUser, router: Router|null = null): Promise<IAuthResponse> {
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
          saas_client: res.data.saasClient,
          token: res.data.token.plainTextToken
        })

        $loading.hide()
        $notify.success('Cadastro realizado com sucesso')
        if (router) await router.push({ name: 'home' })
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

    /**
     * Logout - Encerramento da sessão do usuário na API e limpeza da sessão
     *
     * @param router - Se passar o router, um redirect para /login é feito automaticamente apos a limpesa da sessão
     */
    async logout (router: Router|null = null): Promise<void> {
      try {
        Dialog.create({
          title: 'Sair do sistema?',
          message: 'Deseja realmente encerrar seu acesso?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          $loading.show('Encerrando acesso...')
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
          if (router) await router.push({ name: 'login' })
        })
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao encerrar o sistema')
        $loading.hide()
        console.error('Erro no logou no catch: ', err)
        throw err
      }
    },

    /**
     * Obtem dados atual do saas usando o dominio
     */
    async getSaasClientByDomain (): Promise<ISaasClient|null> {
      try {
        // Buscando cliente saas no state antes de buscar na API
        if (!this.saas_client) {
          this.saas_client = await $api.auth.getCurrentSaasClientByDomain()
        }

        return this.saas_client
      } catch (err) {
        console.error('Erro ao carregar os dados do cliente saas": ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao carregar os dados do cliente saas')
        throw err
      }
    }
  },
  persist: true
})
