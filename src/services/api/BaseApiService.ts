// import { $notify } from '@/composables'
// import { $stores } from '@/stores/all'
import { LocalStorage } from 'quasar'
import { api } from '@/boot/axios'
// import { useRouter } from 'vue-router'
// import router from '@/router'

// const $q = useQuasar()

export default class BaseApiService {
  resource?: string

  constructor (resource?: string) {
    this.resource = resource
  }

  getUrlForListAll () {
    return `${this.resource}`
  }

  getUrlForGetById (id: number) {
    return `${this.resource}/${id}`
  }

  getUrlForCreate () {
    return `${this.resource}`
  }

  getUrlForUpdate (id: number) {
    return `${this.resource}/${id}`
  }

  getUrlForDelete (id: number) {
    return `${this.resource}/${id}`
  }

  getUrlForBi () {
    return `${this.resource}/bi`
  }

  setToken () {
    const token: string | null = LocalStorage.getItem('LmToken')
    if (token) {
      api.defaults.headers.common.Authorization = 'Bearer ' + token
    }
  }

  handleErrors (err: unknown) {
    console.log('Erro axiosssss: ', JSON.stringify(err))
    LocalStorage.clear()
    // Queria redirecionar para o login aqui mas não consegui
    // $stores.auth.logout()
    // const router = useRouter()
    // const r = router.getRoutes()
    // console.log('Junio', $q)
    // router.push({ name: 'login' }).then(r => {
    //   $notify.info('A sessão encerrou. Entre novamente.')
    //   console.log('Junio error handle', r)
    // })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // notifyError('Erro: ' + err.message)
  }
}
