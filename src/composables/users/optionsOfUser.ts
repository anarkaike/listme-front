import { IOption } from '@/interfaces'
import {
  EUserStatusLabels,
  EUserStatusValues
} from '@/enums'

export default function optionsOfUser () {
  const statusOption: IOption[] = [
    { id: EUserStatusValues.active, label: EUserStatusLabels.active } as IOption,
    { id: EUserStatusValues.blocked, label: EUserStatusLabels.blocked } as IOption,
    { id: EUserStatusValues.inactive, label: EUserStatusLabels.inactive } as IOption
  ] as IOption[]

  return {
    statusOption
  }
}

export const $optionsOfUser = {
  status: optionsOfUser().statusOption
}
