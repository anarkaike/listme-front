import type { IUser } from '@/interfaces'

export default interface IAudit {
  id?: number | null;
  modelName?: '';
  object?: object | null;
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
