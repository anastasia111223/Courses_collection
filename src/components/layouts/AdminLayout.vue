<script setup>

import {mdiAccountMultiple, mdiCardAccountDetailsOutline } from '@mdi/js'
import { ref } from 'vue';
import { useRouter } from 'vue-router'
// import menuNavBar from '@/menuNavBar.js'
// import { useDarkModeStore } from '@/stores/darkMode.js'
// import BaseIcon from '../components/BaseIcon.vue'
// import FormControl from '../components/FormControl.vue'
// import NavBar from '../components/NavBar.vue'
// import NavBarItemPlain from '../components/NavBarItemPlain.vue'
import AsideMenu from '../../components/AsideMenu.vue'
// import FooterBar from '../components/FooterBar.vue'

const menuAside = [
  {
    to: '/admin',
    icon: mdiAccountMultiple,
    label: 'Пользователи'
  },
  {
    to: '/cards',
    icon: mdiCardAccountDetailsOutline,
    label: 'Карточки'
  },

]

const layoutAsidePadding = 'xl:pl-60';
const router = useRouter()

const isAsideMobileExpanded = ref(false)
const isAsideLgActive = ref(false)

router.beforeEach(() => {
  isAsideMobileExpanded.value = false
  isAsideLgActive.value = false
})

// import { useAuthStore } from './../../stores/auth';
// const { logUserOut } = useAuthStore();
// const { logout } = useAuth();


const menuClick = (event, item) => {
  // if (item.isToggleLightDark) {
  //   darkModeStore.set()
  // }
  if (item.isLogout) {
    // call authenticateUser
    // logout();
    router.push("/")
  }
}


</script>
<template>
  <div
      :class="{
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded
    }"
  >
    <div
        :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
        class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >

     
      <AsideMenu
          :is-aside-mobile-expanded="isAsideMobileExpanded"
          :is-aside-lg-active="isAsideLgActive"
          :menu="menuAside"
          @menu-click="menuClick"
          @aside-lg-close-click="isAsideLgActive = false"
      />
      <slot />

    </div>
  </div>
</template>
