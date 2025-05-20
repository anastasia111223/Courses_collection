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
const progressWidth = computed(() => {
  if (props.progress>0) return Math.trunc(props.progress*100) 
  else return 1
})
const spanClass = computed(() => ` ${props.h} ${props?.colorProgress || 'bg-violet-900'}`)

const divClass = computed(() =>`flex ${props.w} ${props.h}`)

</script>

<template>
  <div :class="divClass">
    <div :class="spanClass" v-if="Number(props.progress)" :style="{'width': `${progressWidth}%`}">
    </div>
  </div>
</template>

