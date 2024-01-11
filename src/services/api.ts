import { api } from '@/boot/axios'
import { useNotify } from '@/composables'
import { AxiosResponse } from 'axios'
import { IAuthResponse, IUser } from '@/interfaces'
import { LocalStorage } from 'quasar'

const { notifyError } = useNotify()

class BaseApiService {
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    notifyError('Erro: ' + err.message)
  }
}

class ReadOnlyApiService extends BaseApiService {
  async listAll () {
    try {
      this.setToken()
      const res: AxiosResponse = await api.get(this.getUrlForListAll())
      return res.data
    } catch (err) {
      this.handleErrors(err)
    }
  }

  async getById (id: number) {
    try {
      this.setToken()
      const res: AxiosResponse = await api.get(this.getUrlForGetById(id))
      return res.data
    } catch (err: unknown) {
      this.handleErrors(err)
    }
  }
}

class ModelApiService extends ReadOnlyApiService {
  async create (data = {}) {
    try {
      this.setToken()
      const res: AxiosResponse = await api.post(this.getUrlForCreate(), JSON.stringify(data))
      return res.data
    } catch (err: unknown) {
      this.handleErrors(err)
    }
  }

  async update (id: number, data: unknown = {}) {
    try {
      this.setToken()
      const res: AxiosResponse = await api.put(this.getUrlForUpdate(id), JSON.stringify(data))
      return res.data
    } catch (err) {
      this.handleErrors(err)
    }
  }

  async delete (id: number) {
    try {
      this.setToken()
      const res: AxiosResponse = await api.delete(this.getUrlForDelete(id))
      return res.data
    } catch (err) {
      this.handleErrors(err)
    }
  }
}

class AuthApiService extends BaseApiService {
  async login (email: string, password: string): Promise<IAuthResponse> {
    const res: AxiosResponse = await api.post('/login', { email, password })
    console.log(JSON.stringify(res))
    return res.data
  }

  async logout (): Promise<IAuthResponse> {
    this.setToken()
    const res: AxiosResponse = await api.post('/logout')
    return res.data
  }
}

class UsersApiService extends ReadOnlyApiService {
  constructor () {
    super('users')
  }

  listAll (): Promise<IUser[]> {
    return super.listAll()
  }

  getById (id: number): Promise<IUser> {
    return super.getById(id)
  }
}

class EventsApiService extends ModelApiService {
  constructor () {
    super('events')
  }
}

class EventsListsApiService extends ModelApiService {
  constructor () {
    super('events-lists')
  }
}

class EventsListsItemsApiService extends ModelApiService {
  constructor () {
    super('events-lists-items')
  }
}

class SaasClientsApiService extends ModelApiService {
  constructor () {
    super('saas-clients')
  }
}

class ProfilesApiService extends ModelApiService {
  constructor () {
    super('profiles')
  }
}

class PermissionsApiService extends ReadOnlyApiService {
  constructor () {
    super('permissions')
  }
}

export const $api = {
  auth: new AuthApiService(),
  users: new UsersApiService(),
  events: new EventsApiService(),
  eventsLists: new EventsListsApiService(),
  eventsListsItems: new EventsListsItemsApiService(),
  saasClients: new SaasClientsApiService(),
  profiles: new ProfilesApiService(),
  permissions: new PermissionsApiService()
}
