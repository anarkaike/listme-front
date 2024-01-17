export default interface ISaasClientGeneralSettings {
  preferences: {
    darkmode?: boolean,
    starts_with_menu_open?: boolean
    starts_in_saas_client_id?: number | null
  },
  colors?: {
    light?: IGeneralSettingsColors,
    dark?: IGeneralSettingsColors
  }
}

export interface IGeneralSettingsColors {
  primary_color?: string,
  secondary_color?: string,
  accent_color?: string
}
