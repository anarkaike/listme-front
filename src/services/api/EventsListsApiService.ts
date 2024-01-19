import ModelApiService from '@/services/api/ModelApiService'
import { IEventList, IResponse } from '@/interfaces'

export default class EventsListsApiService extends ModelApiService {
  constructor () {
    super('events-lists')
  }

  async listAll (params = {}): Promise<IEventList[]> {
    const res: IResponse<IEventList[]> = await super.listAll(params)
    return res.data
  }

  async getById (id: number): Promise<IEventList> {
    const res: IResponse<IEventList> = await super.getById(id)
    return res.data
  }

  async create (user: IEventList): Promise<IEventList> {
    const res: IResponse<IEventList> = await super.create(user)
    return res.data
  }

  async update (user: IEventList): Promise<IEventList> {
    const res: IResponse<IEventList> = await super.update(user)
    return res.data
  }

  async delete (id: number): Promise<boolean> {
    const res: IResponse<IEventList> = await super.delete(id)
    return res.success
  }
}
