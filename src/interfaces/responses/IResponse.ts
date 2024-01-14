export default interface IResponse<T = [], L = []> {
  data: T,
  message: string,
  metadata: L,
  success: boolean
}
