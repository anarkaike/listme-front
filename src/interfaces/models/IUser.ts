import type { IProfile, ISaasClient } from '@/interfaces'

export default interface IUser {
  id?: number | null;
  name?: string | null;
  email?: string | null;
  email_verified_at?: string | null;
  password?: string | null;
  password2?: string | null;
  phone?: string | null;
  is_super_admin?: boolean;
  url_photo?: string | null;
  url_photo_up?: string | null | File;
  status?: string;
  created_at?: string | null;
  created_by?: string | null;
  created?: IUser | null;
  updated_at?: string | null;
  updated_by?: string | null;
  updated?: IUser | null;
  deleted_at?: string | null;
  deleted_by?: string | null;
  deleted?: IUser | null;
  profiles?: IProfile[];
  profile_ids?: number[];
  profile_id?: number;
  saas_clients?: ISaasClient[];
  saas_client_ids?: number[];
  saas_client_id?: number;
}
