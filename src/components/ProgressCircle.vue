<script setup>
  import { mdiStar,mdiCalendarCheckOutline,mdiAbTesting,mdiTextBoxOutline,mdiVideoBox, mdiFileDocument,mdiFileDocumentOutline } from '@mdi/js';
  import { computed,useTemplateRef, onMounted } from 'vue'
  import BaseIcon from './BaseIcon.vue';

  const props = defineProps({
    progress: {
      type: Number,
      required: true
    },
    w: {
      type: String,
      default: 'w-14'
    },
    h: {
      type: String,
      default: 'h-14'
    },
    colorProgress: {
      type: String,
      required: false,
      default: 'bg-violet-800'
    },
    icon: {
      type: String,
      default: 'mdiFileDocument'
    },
    count: {
      type: Number,
      required: true,
      default: 1
    },
    text: {
      type: String,
      default: 'Task'
    }
  })
  const innerW = computed(() => parseInt(props.w.match(/\d+/))-3)
  // const spanClass = computed(() => ` ${props.h} ${props?.colorProgress || 'bg-violet-900'}`)
  //${parseInt(props.w.match(/\d+/))-3}  ${parseInt(props.h.match(/\d+/))-3}
  const divClass = computed(() =>`${props.w} ${props.h} before:rounded-full before:absolute before:w-12 before:h-12 before:bg-white before:content-['']`)

  // const progressGroup = document.querySelectorAll(".progess-group");
  let progressStartValue = 0;
  let progressStartEnd = Math.trunc((props.progress*100)/props.count*100)/100;
  // let speed = 50;
  // let progessTimer = setInterval(() => {
    // progressStartValue++;
    // if (progressStartValue == progressStartEnd) {
    //   clearInterval(progessTimer);
    // }
  const circle = useTemplateRef('circular');

  onMounted(() => {
    circle.value.style.background = `
      conic-gradient(#5b21b6 ${3.6 * progressStartEnd}deg, #e2e8f0 0deg)`;
  })
  // document.querySelector(".circular-progress").style.background = `
  //   conic-gradient(${props?.colorProgress} ${3.6 * progressStartEnd}deg, #fff 0deg)`;

  function getIcon(val) {
    if (val == 'video') return mdiVideoBox 
    else if (val == 'test') return mdiAbTesting
    else if (val == 'task') return mdiCalendarCheckOutline
    else if (val == 'info') return mdiTextBoxOutline
  }

</script>

<template>
  <div class="flex justify-between w-full gap-3">
    <div class="flex items-center justify-center relative rounded-full bg-slate-200" :class="divClass" ref="circular">
      <BaseIcon :path="getIcon(icon)"  :size="22" class="text-slate-200 absolute z-10"/>
        <!-- <span class="course-value" style="color:${course.color}">0%</span> -->
    </div>
    <div>
      <label class="text-slate-400 text-sm">{{text}}</label>
      <div class="text-slate-600 "> {{ `${progress} / ${count}` }}</div>
    </div>
  <!-- <div :class="divClass">
    <div :class="spanClass" v-if="Number(props.progress)" :style="{'width': `${progressWidth}%`}">
    </div> -->
  </div>
</template>

