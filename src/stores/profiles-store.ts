import { defineStore } from 'pinia'
import { $loading, $notify } from '@/composables'
import { $api } from '@/services/api'
import { IOption, IProfile } from '@/interfaces'

export const profilesStore = defineStore('profilesStore', {
  state: () => ({
    profiles: [] as IProfile[],
    profileEdit: null as IProfile|null
  }),
  // getters: {
  // isLoggedIn: (state) => {
  //   return !!state.token
  // }
  // },
  actions: {
    async listAll (): Promise<IProfile[]> {
      try {
        // Buscando na store antes deusuarios na API
        if (this.profiles.length === 0) {
          this.profiles = await $api.profiles.listAll()
        }
        setTimeout(async () => {
          this.profiles = await $api.profiles.listAll()
        }, 100)

        return this.profiles
      } catch (err) {
        console.error('Erro ao listar os perfis: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao listar os perfis')
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      try {
        // Buscando perfis e formatando de saida
        const profiles = await this.listAll()

        return profiles.map((profile: IProfile) => { return { id: profile.id, label: profile.name } as IOption })
      } catch (err) {
        console.error('Erro ao listar os perfis para options: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? 'Erro ao listar os perfis para preencher campo de opções')
        throw err
      }
    },
    async getById (id: number): Promise<IProfile> {
      $loading.show('Buscando perfil...')
      try {
        // Buscando perfil no state antes de buscar na API
        const profiles = this.$state.profiles.filter((profileRow: IProfile) => profileRow.id === id)
        let profile: IProfile
        if (profiles.length === 0) {
          profile = await $api.profiles.getById(id)
        } else {
          profile = profiles[0]
        }

        $loading.hide()
        $notify.success(`Dados do perfil "${profile.name}" foi carregado com sucesso`)
        return profile
      } catch (err) {
        $loading.hide()
        console.error(`Erro ao carregar os dados do perfil de ID "${id}": `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao carregar os dados do perfil de ID ${id}`)
        throw err
      }
    },
    async create (profile: IProfile): Promise<IProfile> {
      $loading.show(`Cadastrando perfil "${profile.name}"...`)
      try {
        // Criando perfil na API e adicionando ao state
        const profileCreated: IProfile = await $api.profiles.create(profile)
        this.$patch({
          profiles: [
            profileCreated,
            ...this.$state.profiles
          ]
        })

        this.listAll()
        $loading.hide()
        $notify.success(`Perfil "${profile.name}" foi cadastrado com sucesso`)
        return profileCreated
      } catch (err) {
        console.error('Erro ao cadastrar o perfil:', profile, err)
        $loading.hide()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao cadastrar o perfil ${profile.name}`)
        throw err
      }
    },
    async update (profile: IProfile): Promise<IProfile> {
      $loading.show(`Atualizando perfil "${profile.name}"...`)
      try {
        // Buscando perfil na API e state
        const profileUpdated: IProfile = await $api.profiles.update(profile)
        const profiles = this.$state.profiles
        profiles[this.$state.profiles.findIndex(profileRow => profileRow.id === profile.id)] = profileUpdated
        this.$patch({ profiles })

        this.listAll()
        $loading.hide()
        $notify.success(`Perfil "${profile.name}" foi atualizado com sucesso`)
        return profileUpdated
      } catch (err) {
        console.error('Erro ao atualizar perfil: ', profile, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao atualizar o perfil ${profile.name}`)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      $loading.show('Deletando perfil...')
      try {
        // Deletando perfil na API e state
        const deleted = await $api.profiles.delete(id)
        const profiles = this.$state.profiles
        profiles.splice(this.$state.profiles.findIndex(profileRow => profileRow.id === id), 1)
        this.$patch({ profiles })

        $loading.hide()
        $notify.success('Perfil deletado com sucesso')
        return deleted
      } catch (err) {
        console.error(`Erro ao deletar perfil de ID ${id}: `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response.data.message ?? err.message ?? `Erro ao deletar o perfil de ID "${id}"`)
        throw err
      }
    }
  },
  persist: true
})
