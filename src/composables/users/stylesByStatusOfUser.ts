import { EUserStatusValues } from '@/enums'

export default function stylesByStatusOfUser () {
  const background = (status: EUserStatusValues): string => {
    switch (status) {
      case EUserStatusValues.active:
        return 'color: green; background-color: #f8fcf4; background: linear-gradient(150deg, #f8fcf4 20%, #FFF 100%);'
      case EUserStatusValues.inactive:
        return 'color: gray; background-color: #f4f4f4; background: linear-gradient(150deg, #f4f4f4 20%, #FFF 100%)'
      case EUserStatusValues.blocked:
        return 'color: red; background-color: #f9f2f2; background: linear-gradient(150deg, #f9f2f2 20%, #FFF 100%)'
    }
    return ''
  }

  const chip = (status: EUserStatusValues): string => {
    switch (status) {
      case EUserStatusValues.active:
        return 'border-color: green; color: green; background-color: #bcff7a !important;'
      case EUserStatusValues.inactive:
        return 'border-color: gray; color: gray; background-color: #e0e0e0 !important;'
      case EUserStatusValues.blocked:
        return 'border-color: red; color: red; background-color: #ffc6c6 !important;'
    }
    return ''
  }

  return {
    background,
    chip
  }
}

export const $stylesByStatusOfUser = {
  background: stylesByStatusOfUser().background,
  chip: stylesByStatusOfUser().chip
}
