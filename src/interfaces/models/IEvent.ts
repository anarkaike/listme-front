import type { IUser, ISaasClient } from '@/interfaces'

export default interface IEvent {
  id?: number | null;
  name?: string | null;
  description?: string | null;
  url_photo?: string | null;
  saas_client_id?: string | null;
  saas_client?: ISaasClient | null;
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