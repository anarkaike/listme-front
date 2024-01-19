import { $stores } from '@/stores/all'
import { defineStore } from 'pinia'
import { $loading, $notify } from '@/composables'
import { $api } from '@/services/api'
import { IEventList, IOption } from '@/interfaces'

export const eventsListsStore = defineStore('eventsListsStore', {
  state: () => ({
    // eventsLists: [] as IEventList[],
    eventsListsWithParams: { all: [] } as {[key: string]: IEventList[]},
    eventListEdit: null as IEventList|null
  }),
  getters: {
    list: (state) => {
      return state.eventsListsWithParams.all
    },
    eventsLists: (state) => {
      return state.eventsListsWithParams.all
    }
  },
  actions: {
    async listAll (params = {}): Promise<IEventList[]> {
      try {
        const key = Object.keys(params).length === 0 ? 'all' : JSON.stringify(params)
        this.eventsListsWithParams[key] = await $api.eventsLists.listAll(params)

        return this.eventsListsWithParams[key]
      } catch (err) {
        console.error('Erro ao obter listas de eventos: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao obter listas de eventos')
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      try {
        // Obtendo listas de eventos e formatando de saida
        const eventsLists = await this.listAll()

        return eventsLists.map((eventList: IEventList) => { return { id: eventList.id, label: eventList.name } as IOption })
      } catch (err) {
        console.error('Erro ao obter listas de eventos para options: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao obter listas de eventos para preencher campo de opções')
        throw err
      }
    },
    async getById (id: number): Promise<IEventList> {
      $loading.show('Buscando listas de eventos...')
      try {
        // Buscando lista de eventos no state antes de buscar na API
        const eventsLists = this.$state.eventsListsWithParams.all.filter((eventListRow: IEventList) => eventListRow.id === id)
        let eventList: IEventList
        if (eventsLists.length === 0) {
          eventList = await $api.eventsLists.getById(id)
        } else {
          eventList = eventsLists[0]
        }

        $loading.hide()
        $notify.success(`Dados da lista de evento "${eventList.name}" foi carregada com sucesso`)
        return eventList
      } catch (err) {
        $loading.hide()
        console.error(`Erro ao carregar os dados da lista de evento de ID "${id}": `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao carregar os dados da lista de evento de ID ${id}`)
        throw err
      }
    },
    async create (eventList: IEventList): Promise<IEventList> {
      $loading.show(`Cadastrando lista de evento "${eventList.name}"...`)
      try {
        if (!eventList.saas_client_id) {
          eventList.saas_client_id = $stores.auth.saas_client?.id
        }
        // Criando lista de evento na API e adicionando ao state
        const eventListCreated: IEventList = await $api.eventsLists.create(eventList)
        this.eventsListsWithParams.all.push(eventListCreated)

        $loading.hide()
        $notify.success(`Lista de evento "${eventList.name}" foi cadastrada com sucesso`)
        return eventListCreated
      } catch (err) {
        console.error('Erro ao cadastrar a lista de evento:', eventList, err)
        $loading.hide()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao cadastrar o evento ${eventList.name}`)
        throw err
      }
    },
    async update (eventList: IEventList): Promise<IEventList> {
      $loading.show(`Atualizando a lista de evento "${eventList.name}"...`)
      try {
        if (eventList.saas_client_id) {
          delete eventList.saas_client_id
        }
        // Buscando evento na API e state
        const eventListUpdated: IEventList = await $api.eventsLists.update(eventList)
        this.eventsListsWithParams.all[this.eventsListsWithParams.all.findIndex(eventListRow => eventListRow.id === eventList.id)] = eventListUpdated

        $loading.hide()
        $notify.success(`Lista de evento "${eventList.name}" foi atualizada com sucesso`)
        return eventListUpdated
      } catch (err) {
        console.error('Erro ao atualizar lista de evento: ', eventList, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao atualizar o evento ${eventList.name}`)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      $loading.show('Deletando lista de evento...')
      try {
        // Deletando lista de evento na API e state
        const deleted = await $api.eventsLists.delete(id)
        this.eventsListsWithParams.all.splice(this.eventsListsWithParams.all.findIndex(eventListRow => eventListRow.id === id), 1)

        $loading.hide()
        $notify.success('Lista de evento deletada com sucesso')
        return deleted
      } catch (err) {
        console.error(`Erro ao deletar lista de evento de ID ${id}: `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao deletar a lista de evento de ID "${id}"`)
        throw err
      }
    }
  },
  persist: true
})
