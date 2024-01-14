import { LocalStorage } from 'quasar'
import { api } from '@/boot/axios'

export default class BaseApiService {
  resource?: string

  constructor (resource?: string) {
    this.resource = resource
  }

  getUrlForListAll () {
    return `${this.resource}`
  }

  getUrlForGetById (id: number) {
    return `${this.resource}/${id}`
  }

  getUrlForCreate () {
    return `${this.resource}`
  }

  getUrlForUpdate (id: number) {
    return `${this.resource}/${id}`
  }

  getUrlForDelete (id: number) {
    return `${this.resource}/${id}`
  }

  getUrlForBi () {
    return `${this.resource}/bi`
  }

  setToken () {
    const token: string | null = LocalStorage.getItem('LmToken')
    if (token) {
      api.defaults.headers.common.Authorization = 'Bearer ' + token
    }
  }

  handleErrors (err: unknown) {
    console.log('Erro axios: ', JSON.stringify(err))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // notifyError('Erro: ' + err.message)
  }
}
