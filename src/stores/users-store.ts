import { defineStore } from 'pinia'
import { $loading, $notify } from '@/composables'
import { $api } from '@/services/api'
import { IOption, IUser } from '@/interfaces'

export const usersStore = defineStore('usersStore', {
  state: () => ({
    users: [] as IUser[],
    userEdit: null as IUser|null
  }),
  // getters: {
  // isLoggedIn: (state) => {
  //   return !!state.token
  // }
  // },
  actions: {
    async listAll (): Promise<IUser[]> {
      try {
        // Buscando na store antes deusuarios na API
        if (this.users.length === 0) {
          this.users = await $api.users.listAll()
        }
        setTimeout(async () => {
          this.users = await $api.users.listAll()
        }, 100)

        return this.users
      } catch (err) {
        console.error('Erro ao listar os usuários: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao listar os usuários')
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      try {
        // Buscando usuarios e formatando saida
        const users = await this.listAll()

        return users.map((users: IUser) => { return { id: users.id, label: users.name } as IOption })
      } catch (err) {
        console.error('Erro ao listar os usuários para options: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao listar os usuários para preencher campo de opções')
        throw err
      }
    },
    async getById (id: number): Promise<IUser> {
      $loading.show('Buscando usuário...')
      try {
        // Buscando usuário no state antes de buscar na API
        const users = this.$state.users.filter((userRow: IUser) => userRow.id === id)
        let user: IUser
        if (users.length === 0) {
          user = await $api.users.getById(id)
        } else {
          user = users[0]
        }

        $loading.hide()
        $notify.success(`Dados do usuário "${user.name}" foi carregado com sucesso`)
        return user
      } catch (err) {
        $loading.hide()
        console.error(`Erro ao carregar os dados do usuário de ID "${id}": `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao carregar os dados do usuário de ID ${id}`)
        throw err
      }
    },
    async create (user: IUser): Promise<IUser> {
      $loading.show(`Cadastrando usuário "${user.name}"...`)
      try {
        // Criando usuário na API e adicionando ao state
        const userCreated: IUser = await $api.users.create(user)
        this.$patch({
          users: [
            userCreated,
            ...this.$state.users
          ]
        })

        this.listAll()
        $loading.hide()
        $notify.success(`Usuário "${user.name}" foi cadastrado com sucesso`)
        return userCreated
      } catch (err) {
        console.error('Erro ao cadastrar o usuário:', user, err)
        $loading.hide()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao cadastrar o usuário ${user.name}`)
        throw err
      }
    },
    async update (user: IUser): Promise<IUser> {
      $loading.show(`Atualizando usuário "${user.name}"...`)
      try {
        // Atualizando usuário na api e state
        const userUpdated: IUser = await $api.users.update(user)
        const users = this.$state.users
        users[this.$state.users.findIndex(userRow => userRow.id === user.id)] = userUpdated
        this.$patch({ users })

        this.listAll()
        $loading.hide()
        $notify.success(`Usuário "${user.name}" foi atualizado com sucesso`)
        return userUpdated
      } catch (err) {
        $loading.hide()
        console.error('Erro ao atualizar usuário: ', user, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao atualizar o usuário "${user.name}"`)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      $loading.show('Deletando usuário...')
      try {
        // Deletando usuario na API e state
        const deleted = await $api.users.delete(id)
        const users = this.$state.users
        users.splice(this.$state.users.findIndex(userRow => userRow.id === id), 1)
        this.$patch({ users })

        $loading.hide()
        $notify.success('Usuário deletado com sucesso')
        return deleted
      } catch (err) {
        $loading.hide()
        console.error(`Erro ao deletar usuario de ID ${id}`, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao deletar o usuário de ID ${id}`)
        throw err
      }
    }
  },
  persist: true
})
