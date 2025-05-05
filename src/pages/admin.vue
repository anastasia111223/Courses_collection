<script setup>

// definePageMeta({
//   middleware: ["admin-only"],
// });

// const { logout } = useAuth();

// import {useFetch} from "nuxt/app";
import SectionMain from '../components/SectionMain.vue';
import AdminLayout from '../components/layouts/AdminLayout.vue';
import UserChange from '../components/UserChange.vue';
import UserDelete from '../components/UserDelete.vue';
import { computed, ref, watch } from 'vue'
import { useAdminStore } from './../stores/admin';
import { mdiAccountEdit, mdiAccountRemove, mdiAccountLock, mdiAccountLockOpen } from '@mdi/js'


const adminStore = useAdminStore()
const isModalEditActive = ref(false)
const isModalDeleteActive = ref(false)


adminStore.getUsersQuantity()
adminStore.fillRoles()
adminStore.fillUserData(adminStore.currentPage, adminStore.perPage)


const user_role = (user) => {
  return adminStore.roles.filter(obj => obj.id === user.id_role)[0].name
}

const blockedIcon = (blockedStatus) => {
  let b_icon = null
  if (blockedStatus) {
    b_icon = mdiAccountLock
  } else {
    b_icon = mdiAccountLockOpen
  }
  return b_icon
}

const changeBlockStatus = async (user) => {
  let blockedStatus = user.is_blocked
  user.is_blocked = !blockedStatus;
  let adminStoreUser = adminStore.selected_users.filter(obj => obj.id === user.id)[0]
  adminStoreUser.is_blocked = user.is_blocked;
  let data = {
    id: adminStore.currentUserID,
    is_blocked: user.is_blocked
  }
  await fetch('/api/set_user', {
    method: 'POST',
    body: data
  })
  adminStore.currentUserID = null
}

const chosenUserID = (id) => {
  adminStore.currentUserID = id;
}

const currentUserIDDisable = () => {
  adminStore.currentUserID = null
}

watch(
    () => adminStore.users,
    () => adminStore.selected_users = adminStore.users)

computed(() => adminStore.selected_flag)
computed(() => adminStore.selected_users)
const currentPageHuman = computed(() => adminStore.currentPage)


</script>
<template>
  <div>
    <h2>name="admin"</h2>
    <AdminLayout>
      <SectionMain>

        <UserChange v-model="isModalEditActive"
                    title="Изменить данные пользователя" v-bind:current-user-i-d="adminStore.currentUserID">
        </UserChange>

        <UserDelete @confirm="currentUserIDDisable()" v-model="isModalDeleteActive"
                    title="Удаление пользователя" v-bind:current-user-i-d="adminStore.currentUserID">
        </UserDelete>

        <CardBox has-table>
          <table>
            <thead>
            <tr>
              <th  />
              <th>ID</th>
              <th>Роль</th>
              <th>Имя и фамилия</th>
              <th>Электронная почта</th>
              <th>Дата создания аккаунта</th>
              <th />
            </tr>
            </thead>
            <tbody>
            <tr  v-for="user in adminStore.selected_users" :key="user.id"
                 :class="{ 'border-rose-400 border-2 bg-rose-200': user.is_blocked }">
              <td class="border-b-0 lg:w-6 before:hidden"
                  :class="{ 'bg-rose-200': user.is_blocked }">
                <p :data-letters="FIO"> </p>
              </td>
              <td data-label="ID" :class="{ 'bg-rose-200': user.is_blocked }">
                {{ user.id }}
              </td>
              <td data-label="Role" :class="{ 'bg-rose-200': user.is_blocked }">
                {{ user_role(user) }}
              </td>
              <td data-label="Name" :class="{ 'bg-rose-200': user.is_blocked }">
                {{ `${user.name } ${user.surname }` }}
              </td>
              <td data-label="Email" :class="{ 'bg-rose-200': user.is_blocked }">
                {{ user.email }}
              </td>
              <td data-label="Created" :class="{ 'bg-rose-200': user.is_blocked }">
                {{ `${user.dt_create.slice(0, 10)} ${user.dt_create.slice(11, 19)}` }}
              </td>
              <td class="before:hidden lg:w-1 whitespace-nowrap" :class="{ 'bg-rose-200': user.is_blocked}">
                <BaseButton :icon="mdiAccountEdit" class="flex min-w-0 w-160" color="whiteDark" icon-size="24"
                            @click="isModalEditActive = true; chosenUserID(user.id)" />
                <BaseButton :icon="mdiAccountRemove" class="flex min-w-0 w-160 ml-5 mr-5" color="whiteDark"
                            icon-size="24" @click="isModalDeleteActive = true; chosenUserID(user.id)" />
                <BaseButton :icon="blockedIcon(user.is_blocked)" class="flex min-w-0 w-160" color="whiteDark"
                            icon-size="24" @click="chosenUserID(user.id); changeBlockStatus(user)" />
              </td>
            </tr>
            </tbody>
          </table>
        </CardBox>

        <div v-if="adminStore.selected_flag === true"
             class="mt-5 p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
          <BaseLevel v-if="adminStore.pagesQuantity?.length">
            <BaseButtons>
              <BaseButton
                  v-for="page in adminStore.pagesQuantity"
                  :key="page"
                  :active="page === adminStore.currentPage"
                  :label="page"
                  :color="page === adminStore.currentPage ? 'lightDark' : 'whiteDark'"
                  small
                  @click="adminStore.currentPage = page;
                  adminStore.fillUserData(adminStore.currentPage, adminStore.perPage)"
              />
            </BaseButtons>
            <small>Page {{ currentPageHuman }} of {{ adminStore.pagesQuantity }}</small>
          </BaseLevel>
        </div>
      </SectionMain>
    </AdminLayout>
  </div>
</template>

<style scoped>
  [data-letters]:before {
    content:attr(data-letters);
    display:inline-block;
    font-size:1em;
    width:2.5em;
    height:2.5em;
    line-height:2.5em;
    text-align:center;
    border-radius:50%;
    background:plum;
    vertical-align:middle;
    margin-right:1em;
    color:white;
  }


</style>
