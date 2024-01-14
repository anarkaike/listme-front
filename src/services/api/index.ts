import AuthApiService from './AuthApiService'
import UsersApiService from './UsersApiService'
import EventsApiService from './EventsApiService'
import EventsListsApiService from './EventsListsApiService'
import EventsListsItemsApiService from './EventsListsItemsApiService'
import SaasClientsApiService from './SaasClientsApiService'
import ProfilesApiService from './ProfilesApiService'
import PermissionsApiService from './PermissionsApiService'

export const $api = {
  auth: new AuthApiService(),
  users: new UsersApiService(),
  events: new EventsApiService(),
  eventsLists: new EventsListsApiService(),
  eventsListsItems: new EventsListsItemsApiService(),
  saasClients: new SaasClientsApiService(),
  profiles: new ProfilesApiService(),
  permissions: new PermissionsApiService()
}
