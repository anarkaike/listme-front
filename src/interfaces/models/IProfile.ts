import type { IUser, IPermission } from '@/interfaces'

export default interface IProfile {
  id?: number | null;
  name?: string | null;
  description?: string | null;
  permissions?: IPermission[] | null;
  created_at?: string | null;
  created_by?: string | null;
  created?: IUser | null;
  updated_at?: string | null;
  updated_by?: string | null;
  updated?: IUser | null;
  deleted_at?: string | null;
  deleted_by?: string | null;
  deleted?: IUser | null;
}
