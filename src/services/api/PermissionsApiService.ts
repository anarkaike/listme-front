import ReadOnlyApiService from '@/services/api/ReadOnlyApiService'
import { IPermission, IResponse } from '@/interfaces'

export default class PermissionsApiService extends ReadOnlyApiService {
  constructor () {
    super('permissions')
  }

  async listAll (params = {}): Promise<IPermission[]> {
    console.log('Junio params: ', params)
    const res: IResponse<IPermission[]> = await super.listAll(params)
    return res.data
  }

  async getById (id: number): Promise<IPermission> {
    const res: IResponse<IPermission> = await super.getById(id)
    return res.data
  }
}
