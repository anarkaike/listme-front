import { defineStore } from 'pinia'
import { $api } from '@/services/api'
import { IOption, ISaasClient } from '@/interfaces'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useNotify from '@/composables/useNotify'
const { notifyError } = useNotify()

export const saasClientsStore = defineStore('saasClientsStore', {
  state: () => ({
    saasClients: [] as ISaasClient[],
    saasClientEdit: null as ISaasClient|null
  }),
  // getters: {
  // isLoggedIn: (state) => {
  //   return !!state.token
  // }
  // },
  actions: {
    async listAll (): Promise<ISaasClient[]> {
      try {
        const saasClients: ISaasClient[] = await $api.saasClients.listAll()
        this.$patch({ saasClients })
        return this.saasClients
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      const saasClients = await this.listAll()
      return saasClients.map((saasClient: ISaasClient) => {
        return { id: saasClient.id, label: saasClient.company_name } as IOption
      })
    },
    async getById (id: number): Promise<ISaasClient> {
      try {
        const saasClients = this.$state.saasClients.filter((saasClientRow: ISaasClient) => saasClientRow.id === id)
        let saasClient: ISaasClient
        if (saasClients.length === 0) {
          saasClient = await $api.saasClients.getById(id)
        } else {
          saasClient = saasClients[0]
        }
        return saasClient
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async create (saasClient: ISaasClient): Promise<ISaasClient> {
      try {
        const saasClientCreated: ISaasClient = await $api.saasClients.create(saasClient)
        this.$patch({
          saasClients: [
            saasClientCreated,
            ...this.$state.saasClients
          ]
        })
        return saasClientCreated
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async update (saasClient: ISaasClient): Promise<ISaasClient> {
      try {
        const saasClientUpdated: ISaasClient = await $api.saasClients.update(saasClient)
        // atualizando usuario no state da store
        const saasClients = this.$state.saasClients
        saasClients[this.$state.saasClients.findIndex(saasClientRow => saasClientRow.id === saasClient.id)] = saasClientUpdated
        this.$patch({ saasClients })

        return saasClientUpdated
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      try {
        const deleted = await $api.saasClients.delete(id)
        // removendo saasClient da state da store
        const saasClients = this.$state.saasClients
        saasClients.splice(this.$state.saasClients.findIndex(saasClientRow => saasClientRow.id === id), 1)
        this.$patch({ saasClients })

        return deleted
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
