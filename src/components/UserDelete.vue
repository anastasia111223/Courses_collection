<script setup>
import { computed, ref } from 'vue'
import { mdiClose } from '@mdi/js'
import { useAdminStore } from './../stores/admin'
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
  },
  currentUserID: Number,
})

let user_name = ref(null)
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

const confirm = async () => {
  const data = {
    id: props.currentUserID,
  }
  await fetch('/api/delete_user', {
    method: 'DELETE',
    body: data})
  adminStore.users = adminStore.users.filter(obj => obj.id !== props.currentUserID)
  adminStore.currentUserID = null
  await adminStore.getUsersQuantity()
  await adminStore.fillUserData(adminStore.currentPage, adminStore.perPage)
  adminStore.currentUserID = null
  confirmCancel('confirm')
}

const cancel = () => confirmCancel('cancel')

</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox
        v-show="value"
        class="shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50"
        is-modal
    >
      <CardBoxComponentTitle :title="title">
        <BaseButton
            small
            rounded-full
            :icon="mdiClose"
            @click.prevent="cancel"
        />
      </CardBoxComponentTitle>

      <div class="space-y-3">
        <div class="flex">
          <h3 class="flex">Удалить данного пользователя?</h3>
        </div>
      </div>

      <template #footer>
        <BaseButtons>
          <BaseButton :label="'Удалить'" @click="confirm()" color="text-white bg-blue-600"/>
          <BaseButton :label="'Отменить'" outline @click="cancel" color="text-white bg-blue-600"/>
        </BaseButtons>
      </template>
    </CardBox>
  </OverlayLayer>
</template>