import { defineStore } from 'pinia'
import { $api } from '@/services/api'
import { IEventList, IOption } from '@/interfaces'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useNotify from '@/composables/useNotify'
const { notifyError } = useNotify()

export const eventsListsStore = defineStore('eventsListsStore', {
  state: () => ({
    eventsLists: [] as IEventList[],
    eventListEdit: null as IEventList|null
  }),
  // getters: {
  // isLoggedIn: (state) => {
  //   return !!state.token
  // }
  // },
  actions: {
    async listAll (): Promise<IEventList[]> {
      try {
        const eventsLists: IEventList[] = await $api.eventsLists.listAll()
        this.$patch({ eventsLists })
        return this.eventsLists
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      const eventsLists = await this.listAll()
      return eventsLists.map((eventList: IEventList) => {
        return { id: eventList.id, label: eventList.name } as IOption
      })
    },
    async getById (id: number): Promise<IEventList> {
      try {
        const eventsLists = this.$state.eventsLists.filter((eventListRow: IEventList) => eventListRow.id === id)
        let eventList: IEventList
        if (eventsLists.length === 0) {
          eventList = await $api.eventsLists.getById(id)
        } else {
          eventList = eventsLists[0]
        }
        return eventList
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async create (eventList: IEventList): Promise<IEventList> {
      try {
        const eventListCreated: IEventList = await $api.eventsLists.create(eventList)
        this.$patch({
          eventsLists: [
            eventListCreated,
            ...this.$state.eventsLists
          ]
        })
        return eventListCreated
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async update (eventList: IEventList): Promise<IEventList> {
      try {
        const eventListUpdated: IEventList = await $api.eventsLists.update(eventList)
        // atualizando usuario no state da store
        const eventsLists = this.$state.eventsLists
        eventsLists[this.$state.eventsLists.findIndex(eventListRow => eventListRow.id === eventList.id)] = eventListUpdated
        this.$patch({ eventsLists })

        return eventListUpdated
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      try {
        const deleted = await $api.eventsLists.delete(id)
        // removendo eventList da state da store
        const eventsLists = this.$state.eventsLists
        eventsLists.splice(this.$state.eventsLists.findIndex(eventListRow => eventListRow.id === id), 1)
        this.$patch({ eventsLists })

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
