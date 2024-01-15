import { defineStore } from 'pinia'
import { $loading, $notify } from '@/composables'
import { $api } from '@/services/api'
import { IEventListItem, IOption } from '@/interfaces'

export const eventsListsItemsStore = defineStore('eventsListsItemsStore', {
  state: () => ({
    eventsListsItems: [] as IEventListItem[],
    eventListItemEdit: null as IEventListItem|null
  }),
  // getters: {
  // isLoggedIn: (state) => {
  //   return !!state.token
  // }
  // },
  actions: {
    async listAll (): Promise<IEventListItem[]> {
      try {
        // Buscando nomes na lista de eventos na API
        const eventsListsItems: IEventListItem[] = await $api.eventsListsItems.listAll()
        this.$patch({ eventsListsItems })

        return this.eventsListsItems
      } catch (err) {
        console.error('Erro ao listar nomes das listas de eventos: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao obter listas de eventos')
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
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao listar nomes das listas de eventos para preencher campo de opções')
        throw err
      }
    },
    async getById (id: number): Promise<IEventListItem> {
      $loading.show('Buscando nome da lista de eventos...')
      try {
        // Buscando nome da lista de eventos no state antes de buscar na API
        const eventsListsItems = this.$state.eventsListsItems.filter((eventListItemRow: IEventListItem) => eventListItemRow.id === id)
        let eventListItem: IEventListItem
        if (eventsListsItems.length === 0) {
          eventListItem = await $api.eventsListsItems.getById(id)
        } else {
          eventListItem = eventsListsItems[0]
        }

        $loading.hide()
        $notify.success(`Dados do nome da lista de evento "${eventListItem.name}" foi carregada com sucesso`)
        return eventListItem
      } catch (err) {
        $loading.hide()
        console.error(`Erro ao carregar os dados do nome da evento de ID "${id}": `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao carregar os dados do evento de ID ${id}`)
        throw err
      }
    },
    async create (eventListItem: IEventListItem): Promise<IEventListItem> {
      $loading.show(`Cadastrando lista de evento "${eventListItem.name}"...`)
      try {
        // Criando nome na lista de evento na API e adicionando ao state
        const eventListItemCreated: IEventListItem = await $api.eventsListsItems.create(eventListItem)
        this.$patch({
          eventsListsItems: [
            eventListItemCreated,
            ...this.$state.eventsListsItems
          ]
        })

        $loading.hide()
        $notify.success(`Lista de evento "${eventListItem.name}" foi cadastrada com sucesso`)
        return eventListItemCreated
      } catch (err) {
        console.error('Erro ao cadastrar a lista de evento:', eventListItem, err)
        $loading.hide()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao cadastrar o evento ${eventListItem.name}`)
        throw err
      }
    },
    async update (eventListItem: IEventListItem): Promise<IEventListItem> {
      $loading.show(`Atualizando o nome da lista de evento "${eventListItem.name}"...`)
      try {
        // Buscando evento na API e state
        const eventListItemUpdated: IEventListItem = await $api.eventsListsItems.update(eventListItem)
        const eventsListsItems = this.$state.eventsListsItems
        eventsListsItems[this.$state.eventsListsItems.findIndex(eventListItemRow => eventListItemRow.id === eventListItem.id)] = eventListItemUpdated
        this.$patch({ eventsListsItems })

        $loading.hide()
        $notify.success(`Nome da lista de evento "${eventListItem.name}" foi atualizada com sucesso`)
        return eventListItemUpdated
      } catch (err) {
        console.error('Erro ao atualizar nome da lista de evento: ', eventListItem, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao atualizar nome da lista de evento ${eventListItem.name}`)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      $loading.show('Deletando lista de evento...')
      try {
        // Deletando nome da lista de evento na API e state
        const deleted = await $api.eventsListsItems.delete(id)
        // removendo eventListItem da state da store
        const eventsListsItems = this.$state.eventsListsItems
        eventsListsItems.splice(this.$state.eventsListsItems.findIndex(eventListItemRow => eventListItemRow.id === id), 1)
        this.$patch({ eventsListsItems })

        $loading.hide()
        $notify.success('Nom da lista de evento deletado com sucesso')
        return deleted
      } catch (err) {
        console.error(`Erro ao deletar nome da lista de evento de ID ${id}: `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao deletar nnome da lista de evento de ID "${id}"`)
        throw err
      }
    }
  },
  persist: true
})
