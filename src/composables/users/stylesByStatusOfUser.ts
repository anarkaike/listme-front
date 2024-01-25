import { EUserStatusValues } from '@/enums'

export default function stylesByStatusOfUser () {
  const background = (status: EUserStatusValues): string => {
    switch (status) {
      case EUserStatusValues.active:
        return 'color: green; background-color: rgba(148, 224, 136, 0.2); background: linear-gradient(150deg, rgba(148, 224, 136, 0.2) 20%, rgba(255, 255, 255, 0) 100%);'
      case EUserStatusValues.inactive:
        return 'color: gray; background-color: rgba(173, 173, 173, 0.2); background: linear-gradient(150deg, rgba(173, 173, 173, 0.2) 20%, rgba(255, 255, 255, 0) 100%)'
      case EUserStatusValues.blocked:
        return 'color: red; background-color: rgba(214, 130, 130, 0.2); background: linear-gradient(150deg, rgba(214, 130, 130, 0.2) 20%, rgba(255, 255, 255, 0) 100%)'
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
