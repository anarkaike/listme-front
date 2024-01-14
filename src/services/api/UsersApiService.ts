import ModelApiService from '@/services/api/ModelApiService'
import { IResponse, IUser } from '@/interfaces'

export default class UsersApiService extends ModelApiService {
  constructor () {
    super('users')
  }

  async listAll (): Promise<IUser[]> {
    const res: IResponse<IUser[]> = await super.listAll()
    return res.data
  }

  async getById (id: number): Promise<IUser> {
    const res: IResponse<IUser> = await super.getById(id)
    return res.data
  }

  async create (user: IUser): Promise<IUser> {
    const res: IResponse<IUser> = await super.create(user)
    return res.data
  }

  async update (user: IUser): Promise<IUser> {
    const res: IResponse<IUser> = await super.update(user)
    return res.data
  }

  async delete (id: number): Promise<boolean> {
    const res: IResponse<IUser> = await super.delete(id)
    return res.success
  }
}
