import { useQuasar } from 'quasar'
export default function useNotify () {
  const $q = useQuasar()
  const position = 'top'

  const notifySuccess = (message: string) => {
    $q.notify({
      icon: 'check_circle',
      position,
      type: 'positive',
      message: message || 'All right !',
      actions: [
        { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
      ]
    })
  }

  const notifyError = (message: string) => {
    $q.notify({
      icon: 'report',
      position,
      color: 'negative',
      message: message || 'Failed !',
      actions: [
        { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
      ]
    })
  }

  return {
    notifySuccess,
    notifyError
  }
}
