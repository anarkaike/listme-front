import { IOption } from '@/interfaces'
import {
  ESaasClientBusinessSectorLabels,
  ESaasClientBusinessSectorValues,
  ESaasClientStatusLabels,
  ESaasClientStatusValues
} from '@/enums'

export default function optionsOfSaasClient () {
  const statusOption: IOption[] = [
    { id: ESaasClientStatusValues.active, label: ESaasClientStatusLabels.active } as IOption,
    { id: ESaasClientStatusValues.active_testing, label: ESaasClientStatusLabels.active_testing } as IOption,
    { id: ESaasClientStatusValues.active_pending_payment, label: ESaasClientStatusLabels.active_pending_payment } as IOption,
    { id: ESaasClientStatusValues.blocked, label: ESaasClientStatusLabels.blocked } as IOption,
    { id: ESaasClientStatusValues.blocked_pending_payment, label: ESaasClientStatusLabels.blocked_pending_payment } as IOption,
    { id: ESaasClientStatusValues.archived, label: ESaasClientStatusLabels.archived } as IOption
  ] as IOption[]

  const businessSectorOption: IOption[] = [
    { id: ESaasClientBusinessSectorValues.bar, label: ESaasClientBusinessSectorLabels.bar } as IOption,
    { id: ESaasClientBusinessSectorValues.boate, label: ESaasClientBusinessSectorLabels.boate } as IOption,
    { id: ESaasClientBusinessSectorValues.produtor_de_festas, label: ESaasClientBusinessSectorLabels.produtor_de_festas } as IOption,
    { id: ESaasClientBusinessSectorValues.cerimonialista, label: ESaasClientBusinessSectorLabels.cerimonialista } as IOption,
    { id: ESaasClientBusinessSectorValues.outros, label: ESaasClientBusinessSectorLabels.outros } as IOption
  ] as IOption[]

  return {
    statusOption,
    businessSectorOption
  }
}

export const $optionsOfSaasClient = {
  status: optionsOfSaasClient().statusOption,
  businessSector: optionsOfSaasClient().businessSectorOption
}
