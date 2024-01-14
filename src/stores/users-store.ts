import { defineStore } from 'pinia'
import { $api } from '@/services/api'
import { IOption, IUser } from '@/interfaces'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useNotify from '@/composables/useNotify'
const { notifyError } = useNotify()

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
        const users: IUser[] = await $api.users.listAll()
        this.$patch({ users })
        return this.users
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      const users = await this.listAll()
      return users.map((users: IUser) => {
        return { id: users.id, label: users.name } as IOption
      })
    },
    async getById (id: number): Promise<IUser> {
      try {
        const users = this.$state.users.filter((userRow: IUser) => userRow.id === id)
        let user: IUser
        if (users.length === 0) {
          user = await $api.users.getById(id)
        } else {
          user = users[0]
        }
        return user
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async create (user: IUser): Promise<IUser> {
      try {
        const userCreated: IUser = await $api.users.create(user)
        this.$patch({
          users: [
            userCreated,
            ...this.$state.users
          ]
        })
        return userCreated
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async update (user: IUser): Promise<IUser> {
      try {
        const userUpdated: IUser = await $api.users.update(user)
        // atualizando usuario no state da store
        const users = this.$state.users
        users[this.$state.users.findIndex(userRow => userRow.id === user.id)] = userUpdated
        this.$patch({ users })

        return userUpdated
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      try {
        const deleted = await $api.users.delete(id)
        // removendo user da state da store
        const users = this.$state.users
        users.splice(this.$state.users.findIndex(userRow => userRow.id === id), 1)
        this.$patch({ users })

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
