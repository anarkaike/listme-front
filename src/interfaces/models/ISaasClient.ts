import type { IUser } from '@/interfaces'

export default interface ISaasClient {
  id?: number | null;
  contact_name?: string | null;
  company_name?: string | null;
  email?: string | null;
  phone?: string | null;
  url_logo?: string | null;
  url_logo_up?: File | null;
  observation?: string | null;
  status?: string | null;
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
