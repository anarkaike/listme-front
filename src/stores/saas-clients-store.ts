import { defineStore } from 'pinia'
import { $loading, $notify } from '@/composables'
import { $api } from '@/services/api'
import { IOption, ISaasClient } from '@/interfaces'

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
        // Buscando clintes saas na API
        const saasClients: ISaasClient[] = await $api.saasClients.listAll()
        if (saasClients.length === 0) {
          $notify.info('Nenhum cliente saas foi encontrado')
        }
        this.$patch({ saasClients })

        return this.saasClients
      } catch (err) {
        console.error('Erro ao listar os clientes saas: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao listar os clientes saas')
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      try {
        // Buscando clientes saas e formatando de saida
        const saasClients = await this.listAll()

        return saasClients.map((saasClient: ISaasClient) => { return { id: saasClient.id, label: saasClient.company_name } as IOption })
      } catch (err) {
        console.error('Erro ao listar os clientes saas para options: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao listar os clientes saas para preencher campo de opções')
        throw err
      }
    },
    async getById (id: number): Promise<ISaasClient> {
      $loading.show('Buscando cliente saas...')
      try {
        // Buscando cliente saas no state antes de buscar na API
        const saasClients = this.$state.saasClients.filter((saasClientRow: ISaasClient) => saasClientRow.id === id)
        let saasClient: ISaasClient
        if (saasClients.length === 0) {
          saasClient = await $api.saasClients.getById(id)
        } else {
          saasClient = saasClients[0]
        }

        $loading.hide()
        $notify.success(`Dados do clinte saas "${saasClient.company_name}" foi carregado com sucesso`)
        return saasClient
      } catch (err) {
        $loading.hide()
        console.error(`Erro ao carregar os dados do cliente saas de ID "${id}": `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao carregar os dados do cliente saas de ID ${id}`)
        throw err
      }
    },
    async create (saasClient: ISaasClient): Promise<ISaasClient> {
      $loading.show(`Cadastrando cliente saas "${saasClient.company_name}"...`)
      try {
        // Criando cliente saas na API e adicionando ao state
        const saasClientCreated: ISaasClient = await $api.saasClients.create(saasClient)
        this.$patch({
          saasClients: [
            saasClientCreated,
            ...this.$state.saasClients
          ]
        })

        $loading.hide()
        $notify.success(`Cliente saas "${saasClient.company_name}" foi cadastrado com sucesso`)
        return saasClientCreated
      } catch (err) {
        console.error('Erro ao cadastrar o clinte saas:', saasClient, err)
        $loading.hide()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao cadastrar o cliente saas ${saasClient.company_name}`)
        throw err
      }
    },
    async update (saasClient: ISaasClient): Promise<ISaasClient> {
      $loading.show(`Atualizando cliente saas "${saasClient.company_name}"...`)
      try {
        // Atualizando perfil na API e state
        const saasClientUpdated: ISaasClient = await $api.saasClients.update(saasClient)
        const saasClients = this.$state.saasClients
        saasClients[this.$state.saasClients.findIndex(saasClientRow => saasClientRow.id === saasClient.id)] = saasClientUpdated
        this.$patch({ saasClients })

        $loading.hide()
        $notify.success(`Cliente saas "${saasClient.company_name}" foi atualizado com sucesso`)
        return saasClientUpdated
      } catch (err) {
        console.error('Erro ao atualizar client saas: ', saasClient, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao atualizar o usuário ${saasClient.company_name}`)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      $loading.show('Deletando cliente saas...')
      try {
        // Deletando cliente saas na API e state
        const deleted = await $api.saasClients.delete(id)
        const saasClients = this.$state.saasClients
        saasClients.splice(this.$state.saasClients.findIndex(saasClientRow => saasClientRow.id === id), 1)
        this.$patch({ saasClients })

        $loading.hide()
        $notify.success('Cliente saas deletado com sucesso')
        return deleted
      } catch (err) {
        console.error(`Erro ao deletar cliente saas de ID ${id}: `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao deletar o cliente saas de ID "${id}"`)
        throw err
      }
    }
  },
  persist: true
})
