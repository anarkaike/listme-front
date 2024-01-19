import ModelApiService from '@/services/api/ModelApiService'
import { IEvent, IResponse } from '@/interfaces'

export default class EventsApiService extends ModelApiService {
  constructor () {
    super('events')
  }

  async listAll (params = {}): Promise<IEvent[]> {
    const res: IResponse<IEvent[]> = await super.listAll(params)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async getById (id: number): Promise<IEvent> {
    const res: IResponse<IEvent> = await super.getById(id)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async create (user: IEvent): Promise<IEvent> {
    const res: IResponse<IEvent> = await super.create(user)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async update (user: IEvent): Promise<IEvent> {
    const res: IResponse<IEvent> = await super.update(user)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async delete (id: number): Promise<boolean> {
    const res: IResponse<IEvent> = await super.delete(id)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.success
  }
}
