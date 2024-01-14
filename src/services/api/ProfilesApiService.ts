import ModelApiService from '@/services/api/ModelApiService'
import { IProfile, IResponse } from '@/interfaces'

export default class ProfilesApiService extends ModelApiService {
  constructor () {
    super('profiles')
  }

  async listAll (): Promise<IProfile[]> {
    const res: IResponse<IProfile[]> = await super.listAll()
    return res.data
  }

  async getById (id: number): Promise<IProfile> {
    const res: IResponse<IProfile> = await super.getById(id)
    return res.data
  }

  async create (user: IProfile): Promise<IProfile> {
    const res: IResponse<IProfile> = await super.create(user)
    return res.data
  }

  async update (user: IProfile): Promise<IProfile> {
    const res: IResponse<IProfile> = await super.update(user)
    return res.data
  }

  async delete (id: number): Promise<boolean> {
    const res: IResponse<IProfile> = await super.delete(id)
    return res.success
  }
}
