import { defineStore } from 'pinia'
import { $loading, $notify } from '@/composables'
import { $api } from '@/services/api'
import { IOption, IPermission } from '@/interfaces'

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
    async listAll (params = []): Promise<IPermission[]> {
      try {
        this.permissions = await $api.permissions.listAll(params)

        return this.permissions
      } catch (err) {
        console.error('Erro ao listar as permissões: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao listar permissões')
        throw err
      }
    },
    async listByProfile (profileId: number): Promise<IPermission[]> {
      try {
        // Buscando permissões na API
        const permissions: IPermission[] = await $api.permissions.listAll({
          profile_id: profileId
        })
        if (permissions.length === 0) {
          $notify.info('Nenhuma permissão foi encontrada')
        }
        this.$patch({ permissions })

        return this.permissions
      } catch (err) {
        console.error('Erro ao listar as permissões: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao listar permissões')
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      try {
        // Buscando permissões e formatando de saida
        const permissions = await this.listAll()

        return permissions.map((permission: IPermission) => { return { id: permission.id, label: permission.name } as IOption })
      } catch (err) {
        console.error('Erro ao listar as permissões para options: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao listar as permissões para preencher campo de opções')
        throw err
      }
    },
    async getById (id: number): Promise<IPermission> {
      $loading.show('Buscando permissão...')
      try {
        // Buscando permissão no state antes de buscar na API
        const permissions = this.$state.permissions.filter((permissionRow: IPermission) => permissionRow.id === id)
        let permission: IPermission
        if (permissions.length === 0) {
          permission = await $api.permissions.getById(id)
        } else {
          permission = permissions[0]
        }

        $loading.hide()
        $notify.success(`Dados da permissão "${permission.name}" foi carregada com sucesso`)
        return permission
      } catch (err) {
        $loading.hide()
        console.error(`Erro ao carregar os dados da permissão de ID "${id}": `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao carregar os dados da permissão de ID ${id}`)
        throw err
      }
    }
  },
  persist: true
})
