import { defineStore } from 'pinia'
import { $api } from '@/services/api'
import { IEventListItem, IOption } from '@/interfaces'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useNotify from '@/composables/useNotify'
const { notifyError } = useNotify()

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
        const eventsListsItems: IEventListItem[] = await $api.eventsListsItems.listAll()
        this.$patch({ eventsListsItems })
        return this.eventsListsItems
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      const eventsListsItems = await this.listAll()
      return eventsListsItems.map((eventListItem: IEventListItem) => {
        return { id: eventListItem.id, label: eventListItem.name } as IOption
      })
    },
    async getById (id: number): Promise<IEventListItem> {
      try {
        const eventsListsItems = this.$state.eventsListsItems.filter((eventListItemRow: IEventListItem) => eventListItemRow.id === id)
        let eventListItem: IEventListItem
        if (eventsListsItems.length === 0) {
          eventListItem = await $api.eventsListsItems.getById(id)
        } else {
          eventListItem = eventsListsItems[0]
        }
        return eventListItem
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async create (eventListItem: IEventListItem): Promise<IEventListItem> {
      try {
        const eventListItemCreated: IEventListItem = await $api.eventsListsItems.create(eventListItem)
        this.$patch({
          eventsListsItems: [
            eventListItemCreated,
            ...this.$state.eventsListsItems
          ]
        })
        return eventListItemCreated
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async update (eventListItem: IEventListItem): Promise<IEventListItem> {
      try {
        const eventListItemUpdated: IEventListItem = await $api.eventsListsItems.update(eventListItem)
        // atualizando usuario no state da store
        const eventsListsItems = this.$state.eventsListsItems
        eventsListsItems[this.$state.eventsListsItems.findIndex(eventListItemRow => eventListItemRow.id === eventListItem.id)] = eventListItemUpdated
        this.$patch({ eventsListsItems })

        return eventListItemUpdated
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      try {
        const deleted = await $api.eventsListsItems.delete(id)
        // removendo eventListItem da state da store
        const eventsListsItems = this.$state.eventsListsItems
        eventsListsItems.splice(this.$state.eventsListsItems.findIndex(eventListItemRow => eventListItemRow.id === id), 1)
        this.$patch({ eventsListsItems })

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
