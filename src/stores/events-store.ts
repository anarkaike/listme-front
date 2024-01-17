import { defineStore } from 'pinia'
import { $loading, $notify } from '@/composables'
import { $api } from '@/services/api'
import { IEvent, IOption } from '@/interfaces'

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
        // Buscando na store antes deusuarios na API
        if (this.events.length === 0) {
          this.events = await $api.events.listAll()
        }
        setTimeout(async () => {
          this.events = await $api.events.listAll()
        }, 100)

        return this.events
      } catch (err) {
        console.error('Erro ao listar os eventos: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao listar os eventos')
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      try {
        // Buscando eventos e formatando de saida
        const events = await this.listAll()

        return events.map((event: IEvent) => { return { id: event.id, label: event.name } as IOption })
      } catch (err) {
        console.error('Erro ao listar os eventos para options: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao listar os eventos para preencher campo de opções')
        throw err
      }
    },
    async getById (id: number): Promise<IEvent> {
      $loading.show('Buscando eventos...')
      try {
        // Buscando eventos no state antes de buscar na API
        const events = this.$state.events.filter((eventRow: IEvent) => eventRow.id === id)
        let event: IEvent
        if (events.length === 0) {
          event = await $api.events.getById(id)
        } else {
          event = events[0]
        }

        $loading.hide()
        $notify.success(`Dados do evento "${event.name}" foi carregado com sucesso`)
        return event
      } catch (err) {
        $loading.hide()
        console.error(`Erro ao carregar os dados do evento de ID "${id}": `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao carregar os dados do evento de ID ${id}`)
        throw err
      }
    },
    async create (event: IEvent): Promise<IEvent> {
      $loading.show(`Cadastrando evento "${event.name}"...`)
      try {
        // Criando evento na API e adicionando ao state
        const eventCreated: IEvent = await $api.events.create(event)
        this.$patch({
          events: [
            eventCreated,
            ...this.$state.events
          ]
        })

        $loading.hide()
        $notify.success(`Evento "${event.name}" foi cadastrado com sucesso`)
        return eventCreated
      } catch (err) {
        console.error('Erro ao cadastrar o evento:', event, err)
        $loading.hide()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao cadastrar o evento ${event.name}`)
        throw err
      }
    },
    async update (event: IEvent): Promise<IEvent> {
      $loading.show(`Atualizando evento "${event.name}"...`)
      try {
        // Buscando evento na API e state
        const eventUpdated: IEvent = await $api.events.update(event)
        const events = this.$state.events
        events[this.$state.events.findIndex(eventRow => eventRow.id === event.id)] = eventUpdated
        this.$patch({ events })

        $loading.hide()
        $notify.success(`Evento "${event.name}" foi atualizado com sucesso`)
        return eventUpdated
      } catch (err) {
        console.error('Erro ao atualizar evento: ', event, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao atualizar o evento ${event.name}`)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      $loading.show('Deletando evento...')
      try {
        // Deletando evento na API e state
        const deleted = await $api.events.delete(id)
        const events = this.$state.events
        events.splice(this.$state.events.findIndex(eventRow => eventRow.id === id), 1)
        this.$patch({ events })

        $loading.hide()
        $notify.success('Evento deletado com sucesso')
        return deleted
      } catch (err) {
        console.error(`Erro ao deletar evento de ID ${id}: `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao deletar o evento de ID "${id}"`)
        throw err
      }
    }
  },
  persist: true
})
