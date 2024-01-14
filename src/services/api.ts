import AuthApiService from './api/AuthApiService'
import UsersApiService from './api/UsersApiService'
import EventsApiService from './api/EventsApiService'
import EventsListsApiService from './api/EventsListsApiService'
import EventsListsItemsApiService from './api/EventsListsItemsApiService'
import SaasClientsApiService from './api/SaasClientsApiService'
import ProfilesApiService from './api/ProfilesApiService'
import PermissionsApiService from './api/PermissionsApiService'

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
