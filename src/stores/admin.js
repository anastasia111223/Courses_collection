import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import {useFetch} from "nuxt/app";

export const useAdminStore = defineStore('admin', () => {
    const userEmail = ref('doe.doe.doe@example.com')
    // const userAvatar = computed(
    //     () =>
    //         `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail.value.replace(
    //             /[^a-z0-9]+/gi,
    //             '-'
    //         )}`
    // )

    const roles = ref(null)
    const users = ref(null)
    const selected_users = ref(null)
    const selected_flag = ref(true)
    const currentUserID = ref(null)

    const perPage = ref(15)
    const currentPage = ref(1)
    const usersQuantity = ref(0)
    const pagesQuantity = ref(0)

    const getUsersQuantity = async () => {
        const { data } = await fetch('/api/get_quantity_pages')
        usersQuantity.value = data?.value
        pagesQuantity.value = Math.ceil(usersQuantity.value / perPage.value)
    }
    const fillRoles = async () => {
        const { data } = await fetch('/api/get_roles')
        roles.value = data?.value || []

    }
    const fillUserData = async (currentPage, perPage) => {
        let data_to_send = {
            currentPage: currentPage,
            perPage: perPage
        }
        const { data } = await fetch('/api/get_users', {method: 'POST', body: data_to_send})
        console.log(data)
        selected_users.value = data?.value || []
        users.value = data?.value || []
    }

    return {
        userEmail,
        roles,
        users,
        selected_users,
        selected_flag,
        currentUserID,
        perPage,
        currentPage,
        usersQuantity,
        pagesQuantity,
        getUsersQuantity,
        fillRoles,
        fillUserData
    }
})
