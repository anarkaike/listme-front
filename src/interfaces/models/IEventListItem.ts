import type { IUser, ISaasClient, IEvent, IEventList } from '@/interfaces'

export default interface IEventListItem {
  id?: number | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  event_id?: number | null;
  event?: IEvent | null;
  event_list_id?: number | null;
  event_list?: IEventList | null;
  payment_status?: string | null;
  saas_client_id?: number | null;
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
