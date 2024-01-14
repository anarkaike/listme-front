import { defineStore } from 'pinia'
import { $api } from '@/services/api'
import { IOption, IPermission } from '@/interfaces'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useNotify from '@/composables/useNotify'
const { notifyError } = useNotify()

export const permissionsStore = defineStore('permissionsStore', {
  state: () => ({
    permissions: [] as IPermission[],
    permissionEdit: null as IPermission|null
  }),
  // getters: {
  // isLoggedIn: (state) => {
  //   return !!state.token
  // }
  // },
  actions: {
    async listAll (): Promise<IPermission[]> {
      try {
        const permissions: IPermission[] = await $api.permissions.listAll()
        this.$patch({ permissions })
        return this.permissions
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      const permissions = await this.listAll()
      return permissions.map((permission: IPermission) => {
        return { id: permission.id, label: permission.name } as IOption
      })
    },
    async getById (id: number): Promise<IPermission> {
      try {
        const permissions = this.$state.permissions.filter((permissionRow: IPermission) => permissionRow.id === id)
        let permission: IPermission
        if (permissions.length === 0) {
          permission = await $api.permissions.getById(id)
        } else {
          permission = permissions[0]
        }
        return permission
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
