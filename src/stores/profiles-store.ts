import { defineStore } from 'pinia'
import { $api } from '@/services/api'
import { IOption, IProfile } from '@/interfaces'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useNotify from '@/composables/useNotify'
const { notifyError } = useNotify()

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
        const profiles: IProfile[] = await $api.profiles.listAll()
        this.$patch({ profiles })
        return this.profiles
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      const profiles = await this.listAll()
      return profiles.map((profile: IProfile) => {
        return { id: profile.id, label: profile.name } as IOption
      })
    },
    async getById (id: number): Promise<IProfile> {
      try {
        const profiles = this.$state.profiles.filter((profileRow: IProfile) => profileRow.id === id)
        let profile: IProfile
        if (profiles.length === 0) {
          profile = await $api.profiles.getById(id)
        } else {
          profile = profiles[0]
        }
        return profile
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async create (profile: IProfile): Promise<IProfile> {
      try {
        const profileCreated: IProfile = await $api.profiles.create(profile)
        this.$patch({
          profiles: [
            profileCreated,
            ...this.$state.profiles
          ]
        })
        return profileCreated
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async update (profile: IProfile): Promise<IProfile> {
      try {
        const profileUpdated: IProfile = await $api.profiles.update(profile)
        // atualizando usuario no state da store
        const profiles = this.$state.profiles
        profiles[this.$state.profiles.findIndex(profileRow => profileRow.id === profile.id)] = profileUpdated
        this.$patch({ profiles })

        return profileUpdated
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifyError(err.message)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      try {
        const deleted = await $api.profiles.delete(id)
        // removendo profile da state da store
        const profiles = this.$state.profiles
        profiles.splice(this.$state.profiles.findIndex(profileRow => profileRow.id === id), 1)
        this.$patch({ profiles })

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
