import type { ISaasClientGeneralSettings, IUser } from '@/interfaces'
import IModel from '@/interfaces/models/IModel'

export default interface ISaasClient extends IModel {
  id?: number | null;
  contact_name?: string | null;
  company_name?: string | null;
  domain_api?: string | null;
  domain_front?: string | null;
  phone?: string | null;
  email?: string | null;
  business_sector?: string | null;
  general_settings?: ISaasClientGeneralSettings | null;
  url_logo?: string | null;
  url_logo_up?: File | null;
  observation?: string | null;
  status?: string | null;
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
