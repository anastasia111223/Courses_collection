<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    required: true
  },
  w: {
    type: String,
    default: 'w-full'
  },
  h: {
    type: String,
    default: 'h-6'
  },
  colorProgress: {
    type: String,
    required: false
  }
})
const progressWidth = computed(() => progress>0? `w-${Math.trunc(progress*12)}/12` : 'w-0')
const spanClass = computed(() => `${progressWidth} ${props.h} ${colorProgress || ''}`)
// const divClass = computed(() => props.size ?? 16)
const divClass = computed(() =>`flex ${props.w} ${props.h}`)



</script>

<template>
  <div :class="divClass">
    <div :class="spanClass" v-if="!!progress">
    </div>
  </div>
</template>

