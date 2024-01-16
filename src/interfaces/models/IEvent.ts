import type { IUser, ISaasClient } from '@/interfaces'
import IModel from '@/interfaces/models/IModel'

export default interface IEvent extends IModel {
  id?: number | null;
  name?: string | null;
  starts_at?: string | null;
  ends_at?: string | null;
  duration_in_hours?: number | null;
  url_banner?: string | null;
  url_banner_up?: string | null | File;
  saas_client_id?: string | null;
  saas_client?: ISaasClient | null;
  description?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  contact_info?: string | null;
  attractions_info?: string | null;
  payment_info?: string | null;
  restrictions_info?: string | null;
  ticket_info?: string | null;
  social_networks?: string | object | null;
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
