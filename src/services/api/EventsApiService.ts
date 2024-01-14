import ModelApiService from '@/services/api/ModelApiService'
import { IEvent, IResponse } from '@/interfaces'

export default class EventsApiService extends ModelApiService {
  constructor () {
    super('events')
  }

  async listAll (): Promise<IEvent[]> {
    const res: IResponse<IEvent[]> = await super.listAll()
    return res.data
  }

  async getById (id: number): Promise<IEvent> {
    const res: IResponse<IEvent> = await super.getById(id)
    return res.data
  }

  async create (user: IEvent): Promise<IEvent> {
    const res: IResponse<IEvent> = await super.create(user)
    return res.data
  }

  async update (user: IEvent): Promise<IEvent> {
    const res: IResponse<IEvent> = await super.update(user)
    return res.data
  }

  async delete (id: number): Promise<boolean> {
    const res: IResponse<IEvent> = await super.delete(id)
    return res.success
  }
}
