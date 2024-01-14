import { defineStore } from 'pinia'
import { $api } from '@/services/api'
import { IEvent, IOption } from '@/interfaces'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useNotify from '@/composables/useNotify'
const { notifyError } = useNotify()

export const eventsStore = defineStore('eventsStore', {
  state: () => ({
    events: [] as IEvent[],
    eventEdit: null as IEvent|null
  }),
  // getters: {
  // isLoggedIn: (state) => {
  //   return !!state.token
  // }
  // },
  actions: {
    async listAll (): Promise<IEvent[]> {
      try {
        const events: IEvent[] = await $api.events.listAll()
        this.$patch({ events })
        return this.events
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      const events = await this.listAll()
      return events.map((event: IEvent) => {
        return { id: event.id, label: event.name } as IOption
      })
    },
    async getById (id: number): Promise<IEvent> {
      try {
        const events = this.$state.events.filter((eventRow: IEvent) => eventRow.id === id)
        let event: IEvent
        if (events.length === 0) {
          event = await $api.events.getById(id)
        } else {
          event = events[0]
        }
        return event
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async create (event: IEvent): Promise<IEvent> {
      try {
        const eventCreated: IEvent = await $api.events.create(event)
        this.$patch({
          events: [
            eventCreated,
            ...this.$state.events
          ]
        })
        return eventCreated
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async update (event: IEvent): Promise<IEvent> {
      try {
        const eventUpdated: IEvent = await $api.events.update(event)
        // atualizando usuario no state da store
        const events = this.$state.events
        events[this.$state.events.findIndex(eventRow => eventRow.id === event.id)] = eventUpdated
        this.$patch({ events })

        return eventUpdated
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      try {
        const deleted = await $api.events.delete(id)
        // removendo event da state da store
        const events = this.$state.events
        events.splice(this.$state.events.findIndex(eventRow => eventRow.id === id), 1)
        this.$patch({ events })

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
