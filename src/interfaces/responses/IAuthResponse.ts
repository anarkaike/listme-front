import type { IUser, IToken } from '@/interfaces'

export default interface IAuthResponse<T = []> {
  data: {
    token: IToken,
    user: IUser
  },
  message: string,
  metadata: T,
  success: boolean
}
