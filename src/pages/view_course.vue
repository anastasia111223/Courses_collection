<script setup>
    import BaseIcon from '../components/BaseIcon.vue';
    import ProgressLine from '../components/ProgressLine.vue';
    import ProgressCircle from '../components/ProgressCircle.vue';

    import { mdiStar, mdiAccount, mdiMail, mdiBriefcase, mdiFileDocument, mdiChevronDown,mdiPencil, mdiDelete, mdiCog, mdiFileDocumentOutline,mdiContentCopy,mdiCalendarCheckOutline,mdiAbTesting,mdiTextBoxOutline,mdiVideoBox, mdiCheckCircle,mdiCheckCircleOutline } from '@mdi/js';
    import { computed, ref, watch,onMounted } from 'vue'
    import { useCoursesStore } from './../stores/courses';
    import router from './../router';
    import { useRoute, useRouter } from 'vue-router'

    const coursesStore = useCoursesStore()
    coursesStore.getCoursesWithProgress();
    const nameTasks = ref({
        test: "Тесты", video: "Видео", task: "Задания", info: "Материалы"
    });
    const nameTask = ref({
        test: "Тест", video: "Видео", task: "Задание", info: "Документ"
    })
    
    const route = useRoute()
    console.log(route, 'route')
    const id = ref(route?.params?.courseId)
    // if (!id.value) id.value = 1;
    const course = ref(coursesStore.getOneCourse(id))
    console.log(course, ProgressCircle,'course')

    // computed(() => coursesStore.getOneCourse(id));

    const entities_name1 = ref(['материалов','материал','материала']);
    const typesTask = ref([]);
    const getTypes = () => {
        let indK = 0;
        for (let key in course.value.type_task) {
            if (course.value.type_task[key]?.count > 0) {
                indK++
                let obj = {
                    ind: indK,
                    name: nameTasks.value[key],
                    type: key,
                    count: course.value.type_task[key].count,
                    progress: course.value.type_task[key].progress,
                }
                typesTask.value.push(obj);
            }
            
        }
    }
    
    onMounted(() => {
        getTypes();
    })
    
    const getDate = (val) => {
        let date = new Date(val * 1000);
        let data1 = date.toLocaleDateString('ru', {day: 'numeric', month: 'numeric', year: 'numeric'}); 
        return data1;
    }
    const getTime = (time) => {
        let min = Math.floor((time % 3600) / 60);
        let hour = Math.floor((time % 86400) / 3600);
        let day = Math.floor((time % 2592000) / 86400); 
        let data = '';
        if(day >= 1) {
            data =  day + 'д. ' +  hour + 'ч.';
        }
        else if(hour >= 1) {
            data = hour + 'ч. ' +  min + 'мин.';
        }
        else {
            data = min + 'мин.';
        }
        return data;
    }
    
    const interpretation = (params = {}) => {
        if(!Number.isInteger(params.num) || !params.entities_name || params.entities_name?.length < 3) { 
            return '';
        }
        let a = params.num;
        let str = "";
        if (a / 10 >= 10) a = parseInt(a.toString().slice(-2));

        if (a >= 5 && a <= 20) str = params.num + " " + params.entities_name[0];
        else if (a % 10 == 1) str = params.num + " " + params.entities_name[1];
        else if (a % 10 > 1 && a % 10 < 5) str = params.num + " " +params.entities_name[2];
        else if (a % 10 >= 5 || a % 10 == 0) str = params.num + " " + params.entities_name[0];
        return str;
    }
    function getIcon(val) {
        if (val == 'video') return mdiVideoBox 
        else if (val == 'test') return mdiAbTesting
        else if (val == 'task') return mdiCalendarCheckOutline
        else if (val == 'info') return mdiTextBoxOutline
    }
    function goTask () {

    }

</script>

<template>
    <div>
        <h2 class="text-slate-600 italic">{{ course.name }}</h2>
        <div class="flex justify-between w-full">
            <div  class="w-full">
                <div class="w-full mt-6 gap-3 flex flex-col">
                    <div class="text-slate-600 text-lg text-left font-medium">Прогресс</div>
                    <div class="flex w-full gap-6">
                        <ProgressLine :progress="course.progress? course.progress : 0" colorProgress="bg-violet-800"/>
                        <div v-if="course.progress">
                            <span class="text-violet-900 font-medium text-lg">{{ Math.trunc(course.progress*100)+'%' }}</span>
                        </div>
                    </div>
                </div>
                <div class="text-left text-slate-400">{{ `Затрачено времени: ${getTime(course?.time_task)}` }}</div>
                <div class="flex justify-between w-full mt-6">
                    <div v-for="tp in typesTask" :key="tp.ind+'t'">
                        <ProgressCircle :progress="tp.progress? tp.progress : 0" :count="tp.count" :text="tp.name" :icon="tp.type"/>
                    </div>
                </div>
                <div class="text-left text-slate-500 text-lg font-medium mt-8">Содержание курса</div>
                <div class="flex flex-col w-full mt-4 shadow">
                    <div v-for="bl in course.task_block" :key="bl?.block_id+'bl'">
                        <div class="p-4 bg-slate-200 text-left">{{ bl.block_name }}</div>
                        <div v-for="task in bl.tasks" class="p-4 border-t-1 border-slate-200 cursor-pointer flex justify-between items-center gap-6" :key="task.task_id+ 'ts'" @click="goTask">
                            <div class="flex items-center gap-6 w-1/2">
                                <BaseIcon :path="getIcon(task.type)"  :size="22" class="text-slate-500"/>
                                <span>{{ task.name }}</span>
                            </div>
                            <div class="flex items-center gap-10 justify-between w-1/2">
                                <div class="text-left text-slate-400">{{ nameTask[task.type] }}</div>
                                <BaseIcon :path="mdiCheckCircle"  :size="16" class="text-green-500" v-if="task?.progress == 100"/>
                                <BaseIcon :path="mdiCheckCircleOutline"  :size="16" class="text-slate-300" v-else/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <!-- TODO summery card of course -->
            </div>
        </div>
    </div>

</template>