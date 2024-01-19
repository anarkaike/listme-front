import { $stores } from '@/stores/all'
import { defineStore } from 'pinia'
import { $loading, $notify } from '@/composables'
import { $api } from '@/services/api'
import { IEventList, IEventListItem, IOption } from '@/interfaces'

export const eventsListsItemsStore = defineStore('eventsListsItemsStore', {
  state: () => ({
    eventsListsItemsWithParams: { all: [] } as {[key: string]: IEventListItem[]},
    eventListItemEdit: null as IEventListItem|null
  }),
  getters: {
    list: (state) => {
      return state.eventsListsItemsWithParams.all
    },
    eventsLists: (state) => {
      return state.eventsListsItemsWithParams.all
    }
  },
  actions: {
    async listAll (params = {}): Promise<IEventListItem[]> {
      try {
        const key = Object.keys(params).length === 0 ? 'all' : JSON.stringify(params)

        // Buscando na store antes deusuarios na API
        if (!this.eventsListsItemsWithParams[key] || this.eventsListsItemsWithParams[key].length === 0) {
          this.eventsListsItemsWithParams[key] = await $api.eventsListsItems.listAll(params)
        }
        setTimeout(async () => {
          this.eventsListsItemsWithParams[key] = await $api.eventsListsItems.listAll(params)
        }, 100)

        return this.eventsListsItemsWithParams[key]
      } catch (err) {
        console.error('Erro ao obter nomes das listas de eventos: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao obter nomes das listas de eventos')
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      try {
        // Listando nomes das listas de eventos e formatando de saida
        const eventsListsItems = await this.listAll()

        return eventsListsItems.map((eventListItem: IEventListItem) => { return { id: eventListItem.id, label: eventListItem.name } as IOption })
      } catch (err) {
        console.error('Erro ao listar nomes das listas de eventos para options: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao listar nomes das listas de eventos para preencher campo de opções')
        throw err
      }
    },
    async getById (id: number): Promise<IEventListItem> {
      $loading.show('Buscando nome da lista de eventos...')
      try {
        // Buscando lista de eventos no state antes de buscar na API
        const eventsListsItems = this.$state.eventsListsItemsWithParams.all.filter((eventListRow: IEventList) => eventListRow.id === id)
        let eventList: IEventList
        if (eventsListsItems.length === 0) {
          eventList = await $api.eventsListsItems.getById(id)
        } else {
          eventList = eventsListsItems[0]
        }

        $loading.hide()
        $notify.success(`Dados da lista de evento "${eventList.name}" foi carregada com sucesso`)
        return eventList
      } catch (err) {
        $loading.hide()
        console.error(`Erro ao carregar os dados do nome da evento de ID "${id}": `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao carregar os dados do evento de ID ${id}`)
        throw err
      }
    },
    async create (eventListItem: IEventListItem): Promise<IEventListItem> {
      $loading.show(`Cadastrando lista de evento "${eventListItem.name}"...`)
      try {
        if (!eventListItem.saas_client_id) {
          eventListItem.saas_client_id = $stores.auth.saas_client?.id
        }
        // Criando lista de evento na API e adicionando ao state
        const eventListItemCreated: IEventList = await $api.eventsListsItems.create(eventListItem)
        this.eventsListsItemsWithParams.all.push(eventListItemCreated)

        $loading.hide()
        $notify.success(`Lista de evento "${eventListItem.name}" foi cadastrada com sucesso`)
        return eventListItemCreated
      } catch (err) {
        console.error('Erro ao cadastrar a lista de evento:', eventListItem, err)
        $loading.hide()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao cadastrar o evento ${eventListItem.name}`)
        throw err
      }
    },
    async update (eventListItem: IEventListItem): Promise<IEventListItem> {
      $loading.show(`Atualizando o nome da lista de evento "${eventListItem.name}"...`)
      try {
        if (eventListItem.saas_client_id) {
          delete eventListItem.saas_client_id
        }
        // Buscando evento na API e state
        const eventListItemUpdated: IEventList = await $api.eventsListsItems.update(eventListItem)
        this.eventsListsItemsWithParams.all[this.eventsListsItemsWithParams.all.findIndex(eventListItemRow => eventListItemRow.id === eventListItem.id)] = eventListItemUpdated

        $loading.hide()
        $notify.success(`Nome da lista de evento "${eventListItem.name}" foi atualizada com sucesso`)
        return eventListItemUpdated
      } catch (err) {
        console.error('Erro ao atualizar nome da lista de evento: ', eventListItem, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao atualizar nome da lista de evento ${eventListItem.name}`)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      $loading.show('Deletando lista de evento...')
      try {
        // Deletando lista de evento na API e state
        const deleted = await $api.eventsListsItems.delete(id)
        this.eventsListsItemsWithParams.all.splice(this.eventsListsItemsWithParams.all.findIndex(eventListRow => eventListRow.id === id), 1)

        $loading.hide()
        $notify.success('Nom da lista de evento deletado com sucesso')
        return deleted
      } catch (err) {
        console.error(`Erro ao deletar nome da lista de evento de ID ${id}: `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao deletar nnome da lista de evento de ID "${id}"`)
        throw err
      }
    }
  },
  persist: true
})
