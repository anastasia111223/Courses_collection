<script setup>
import {computed, watch} from 'vue'
import { mdiClose } from '@mdi/js';

import BaseButton from '../components/BaseButton.vue'
import BaseButtons from '../components/BaseButtons.vue'
import CardBox from '../components/CardBox.vue'
import OverlayLayer from '../components/OverlayLayer.vue'
import CardBoxComponentTitle from '../components/CardBoxComponentTitle.vue'
import { useAdminStore } from './../stores/admin'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
// import { useFetch } from "nuxt/app";

const adminStore = useAdminStore()
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  button: {
    type: String,
    default: 'info'
  },
  buttonLabel: {
    type: String,
    default: 'Подтвердить'
  },
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  }
})

let form = {}
let selectedUser = {}

let selected_role = {
  name: "Выберите роль"
}
const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const confirmCancel = (mode) => {
  value.value = false
  adminStore.currentUserID = null
  emit(mode)
}

const get_user = () => {
  if (adminStore.currentUserID) {
    selectedUser = adminStore.selected_users.filter(obj => obj.id === adminStore.currentUserID)[0]
    selected_role = adminStore.roles.filter(obj => obj.id === selectedUser.id_role)[0]
    form = {
      id: selectedUser.id,
      name: selectedUser.name,
      surname: selectedUser.surname,
      email: selectedUser.email,
      id_role: selectedUser.id_role,
      biografi: selectedUser.biografi,
      passwd: selectedUser.passwd,
      patronim: selectedUser.patronim,
      phone: selectedUser.phone
    }
  }
}

const confirm = async () => {
  selectedUser = adminStore.selected_users.filter(obj => obj.id === adminStore.currentUserID)[0]
  selectedUser.name = form.name
  selectedUser.surname = form.surname
  selectedUser.email = form.email
  selectedUser.id_role = selected_role.id
  selectedUser.biografi = form.biografi
  selectedUser.passwd = form.passwd
  selectedUser.patronim = form.patronim
  selectedUser.phone = form.phone
  await fetch('/api/set_user', {
    method: 'POST',
    body: selectedUser})
  adminStore.currentUserID = null
  confirmCancel('confirm')
}

const cancel = () => confirmCancel('cancel')

watch(
    () => adminStore.currentUserID,
    () => get_user())

</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox
        v-show="value"
        class="shadow-lg max-h w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50 overflow-y-auto"
        is-modal
    >
      <CardBoxComponentTitle :title="title" class="pb-3 mb-5 border-b-2 border-blue-800 font-semibold text-blue-800">
        <BaseButton
            small
            rounded-full
            :icon="mdiClose"
            @click.prevent="cancel"
        />
      </CardBoxComponentTitle>

      <div class="space-y-3">

        <div class="flex-col mb-2">
          <h3 class="font-semibold text-blue-800 mb-1">Имя:</h3>
          <input v-model="form.name"
                 class="w-full text-black border-zinc-300 rounded-md hover:border-zinc-500 mb-2"/>
        </div>

        <div class="flex-col mb-2">
          <h3 class="font-semibold text-blue-800 mb-1">Фамилия:</h3>
          <input v-model="form.surname"
                 class="w-full text-black border-zinc-300 rounded-md hover:border-zinc-500 mb-2"/>
        </div>

        <div class="flex-col mb-2">
          <h3 class="font-semibold text-blue-800 mb-1">Отчество:</h3>
          <input v-model="form.patronim" placeholder="Не заполнено"
                 class="w-full text-black border-zinc-300 rounded-md hover:border-zinc-500 mb-2"/>
        </div>

        <div class="flex w-full justify-between mb-2">
          <div class="flex-col w-5/12">
            <h3 class="font-semibold text-blue-800 mb-1">Телефон:</h3>
            <input v-model="form.phone"
                   class="w-full text-black border-zinc-300 rounded-md hover:border-zinc-500 mb-2"/>
          </div>

          <div class="flex-col w-5/12">
            <h3 class="flex font-semibold text-blue-800 mb-1">Роль:</h3>

            <Menu as="div" class="relative inline-block text-left w-full">
              <div>
                <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm
                text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 h-[2.6rem]">
                  {{ selected_role.name }}
                  <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </MenuButton>
              </div>

              <transition enter-active-class="transition ease-out duration-100"
                          enter-from-class="transform opacity-0 scale-95"
                          enter-to-class="transform opacity-100 scale-100"
                          leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100"
                          leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg
                ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1 flex-col">
                    <MenuItem v-slot="{ active }" v-for="role in adminStore.roles" @click="selected_role = role">
                      <a href="#"
                         :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                        {{ role.name }}</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>

        <div class="flex-col mb-2">
          <h3 class="font-semibold text-blue-800 mb-1">Адрес электронной почты:</h3>
          <input v-model="form.email"
                 class="w-full text-black border-zinc-300 rounded-md hover:border-zinc-500 mb-2"/>
        </div>

        <div class="flex-col">
          <h3 class="font-semibold text-blue-800 mb-1">Пароль:</h3>
          <input v-model="form.passwd"
                 class="w-full text-black border-zinc-300 rounded-md hover:border-zinc-500 mb-2"/>
        </div>

        <div class="flex-col">
          <h3 class="font-semibold text-blue-800 mb-1">Биография:</h3>
          <textarea v-model="form.biografi" placeholder="Не заполнено"
                    class="w-full text-black border-zinc-300 rounded-md hover:border-zinc-500"/>
        </div>
      </div>


      <BaseButtons class="mt-2">
        <BaseButton class="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out"
                    :label="buttonLabel" @click="confirm()"  color="bg-blue-600" />
        <BaseButton class="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out"
                    :label="'Отменить'" outline @click="cancel" color="bg-blue-600"/>
      </BaseButtons>

    </CardBox>
  </OverlayLayer>
</template>
