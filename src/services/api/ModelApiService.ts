import ReadOnlyApiService from '@/services/api/ReadOnlyApiService'
import { AxiosResponse } from 'axios'
import { api } from '@/boot/axios'

export default class ModelApiService extends ReadOnlyApiService {
  makeFormData (data: object) {
    const formData = new FormData()
    for (const key in data) {
      // Verificar se a propriedade pertence ao objeto diretamente, não aos protótipos
      if (key in data) {
        const value = data[key as keyof object] as object // Usar keyof para garantir a validade da chave
        // Verificar se o valor não é nulo ou indefinido antes de adicioná-lo ao FormData
        if (value !== null && value !== undefined) {
          // Se for um objeto do tipo File, você pode adicionar diretamente
          if (value instanceof File) {
            formData.append(key, value)
          } else if (typeof value === 'object') {
            // Caso contrário, converte o valor para string e adiciona ao FormData
            for (const kSubValue in value) {
              const subValues = value as number[]
              formData.append(`${key}[]`, String(subValues[kSubValue as unknown as number]))
            }
          } else {
            // Caso contrário, converte o valor para string e adiciona ao FormData
            formData.append(key, String(value))
          }
        }
      }
    }
    return formData
  }

  async create (data = {}) {
    try {
      this.setToken()
      const res: AxiosResponse = await api.post(this.getUrlForCreate(), this.makeFormData(data), {
        // proxy: {
        //   protocol: 'https',
        //   host: 'api.listme.local',
        //   port: 8890
        // },
        headers: {
          'Content-Type': 'multipart/form-data',
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        }//,
        // withCredentials: true
      })
      return res.data
    } catch (err: unknown) {
      this.handleErrors(err)
      throw err
    }
  }

  async update (data: object) {
    try {
      if (!('id' in data)) {
        throw new Error('O ID dve ser enviado para atualizar o registro')
      }
      this.setToken()
      const res: AxiosResponse = await api.post(this.getUrlForUpdate(data.id as number) + '&_method=PUT', this.makeFormData(data), {
        headers: {
          'Content-Type': 'multipart/form-data',
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        }
      })
      return res.data
    } catch (err) {
      this.handleErrors(err)
      throw err
    }
  }

  async delete (id: number) {
    try {
      this.setToken()
      const res: AxiosResponse = await api.delete(this.getUrlForDelete(id))
      return res.data
    } catch (err) {
      this.handleErrors(err)
      throw err
    }
  }
}
