import { authStore } from '@/stores/auth-store'
import { usersStore } from '@/stores/users-store'
import { saasClientsStore } from '@/stores/saas-clients-store'
import { eventsStore } from '@/stores/events-store'
import { eventsListsStore } from '@/stores/events-lists-store'
import { eventsListsItemsStore } from '@/stores/events-lists-items-store'
import { profilesStore } from '@/stores/profiles-store'
import { permissionsStore } from '@/stores/permissions-store'

export const $stores = {
  auth: authStore(),
  users: usersStore(),
  saasClients: saasClientsStore(),
  events: eventsStore(),
  eventsLists: eventsListsStore(),
  eventsListsItems: eventsListsItemsStore(),
  profiles: profilesStore(),
  permissions: permissionsStore()
}
