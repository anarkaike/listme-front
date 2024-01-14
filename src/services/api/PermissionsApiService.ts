import ReadOnlyApiService from '@/services/api/ReadOnlyApiService'
import { IPermission, IResponse } from '@/interfaces'

export default class PermissionsApiService extends ReadOnlyApiService {
  constructor () {
    super('permissions')
  }

  async listAll (): Promise<IPermission[]> {
    const res: IResponse<IPermission[]> = await super.listAll()
    return res.data
  }

  async getById (id: number): Promise<IPermission> {
    const res: IResponse<IPermission> = await super.getById(id)
    return res.data
  }
}
