import ModelApiService from '@/services/api/ModelApiService'
import { IEventListItem, IResponse } from '@/interfaces'

export default class EventsListsItemsApiService extends ModelApiService {
  constructor () {
    super('events-lists-items')
  }

  async listAll (): Promise<IEventListItem[]> {
    const res: IResponse<IEventListItem[]> = await super.listAll()
    return res.data
  }

  async getById (id: number): Promise<IEventListItem> {
    const res: IResponse<IEventListItem> = await super.getById(id)
    return res.data
  }

  async create (user: IEventListItem): Promise<IEventListItem> {
    const res: IResponse<IEventListItem> = await super.create(user)
    return res.data
  }

  async update (user: IEventListItem): Promise<IEventListItem> {
    const res: IResponse<IEventListItem> = await super.update(user)
    return res.data
  }

  async delete (id: number): Promise<boolean> {
    const res: IResponse<IEventListItem> = await super.delete(id)
    return res.success
  }
}
