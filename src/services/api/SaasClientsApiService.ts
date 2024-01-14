import ModelApiService from '@/services/api/ModelApiService'
import { IResponse, ISaasClient } from '@/interfaces'

export default class SaasClientsApiService extends ModelApiService {
  constructor () {
    super('saas-clients')
  }

  async listAll (): Promise<ISaasClient[]> {
    const res: IResponse<ISaasClient[]> = await super.listAll()
    return res.data
  }

  async getById (id: number): Promise<ISaasClient> {
    const res: IResponse<ISaasClient> = await super.getById(id)
    return res.data
  }

  async create (user: ISaasClient): Promise<ISaasClient> {
    const res: IResponse<ISaasClient> = await super.create(user)
    return res.data
  }

  async update (user: ISaasClient): Promise<ISaasClient> {
    const res: IResponse<ISaasClient> = await super.update(user)
    return res.data
  }

  async delete (id: number): Promise<boolean> {
    const res: IResponse<ISaasClient> = await super.delete(id)
    return res.success
  }
}
