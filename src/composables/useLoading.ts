import { Loading, QSpinnerFacebook } from 'quasar'

export default function useLoading () {
  const hideLoading = () => {
    Loading.hide()
  }
  const showLoading = (message = 'Carregando...') => {
    Loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'yellow',
      messageColor: 'yellow',
      spinnerSize: 140,
      // backgroundColor: 'purple',
      customClass: 'box-loading',
      message: message,
      boxClass: 'box-loading-inner'
      // messageColor: 'black'
    })
  }

  return {
    showLoading,
    hideLoading
  }
}
