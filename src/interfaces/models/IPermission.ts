import type { IUser } from '@/interfaces'
import IModel from '@/interfaces/models/IModel'

export default interface IPermission extends IModel {
  id?: number | null;
  name?: string | null;
  allow?: boolean | null;
  created_at?: string | null;
  created_by?: number | null;
  created?: IUser | null;
  updated_at?: string | null;
  updated_by?: number | null;
  updated?: IUser | null;
  deleted_at?: string | null;
  deleted_by?: number | null;
  deleted?: IUser | null;
}
