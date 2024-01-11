import { IUser } from '@/interfaces';

export interface IResponse<T = [], L = []> {
  data: T,
  message: string,
  metadata: L,
  success: boolean
}

export interface IAuthResponse<T = []> {
  data: {
    token: {
      accessToken: {
        abilities: string[],
        created_at?: string,
        expires_at: string|null,
        id: number,
        name: string,
        tokenable_id: number,
        tokenable_type: string,
        updated_at: string
      },
      plainTextToken: string,
    },
    user: IUser
  },
  message: string,
  metadata: T,
  success: boolean
}
