import { ESaasClientStatusValues } from '@/enums'

export default function stylesByStatusOfSaasClient () {
  const background = (status: ESaasClientStatusValues): string => {
    switch (status) {
      case ESaasClientStatusValues.active:
      case ESaasClientStatusValues.active_testing:
      case ESaasClientStatusValues.active_pending_payment:
        return 'color: green; background-color: #f8fcf4; background: linear-gradient(150deg, #f8fcf4 20%, #FFF 100%);'
      case ESaasClientStatusValues.archived:
        return 'color: gray; background-color: #f4f4f4; background: linear-gradient(150deg, #f4f4f4 20%, #FFF 100%)'
      case ESaasClientStatusValues.blocked:
      case ESaasClientStatusValues.blocked_pending_payment:
        return 'color: red; background-color: #f9f2f2; background: linear-gradient(150deg, #f9f2f2 20%, #FFF 100%)'
    }
    return ''
  }

  const chip = (status: ESaasClientStatusValues): string => {
    switch (status) {
      case ESaasClientStatusValues.active:
      case ESaasClientStatusValues.active_testing:
      case ESaasClientStatusValues.active_pending_payment:
        return 'border-color: green; color: green; background-color: #bcff7a !important;'
      case ESaasClientStatusValues.archived:
        return 'border-color: gray; color: gray; background-color: #e0e0e0 !important;'
      case ESaasClientStatusValues.blocked:
      case ESaasClientStatusValues.blocked_pending_payment:
        return 'border-color: red; color: red; background-color: #ffc6c6 !important;'
    }
    return ''
  }

  return {
    background,
    chip
  }
}

export const $stylesByStatusOfSaasClient = {
  background: stylesByStatusOfSaasClient().background,
  chip: stylesByStatusOfSaasClient().chip
}
