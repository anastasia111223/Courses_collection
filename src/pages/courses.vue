<script setup>
    import BaseIcon from '../components/BaseIcon.vue';
    import { mdiStar, mdiAccount, mdiMail, mdiBriefcase, mdiFileDocument, mdiChevronDown,mdiPencil, mdiDelete, mdiCog, mdiFileDocumentOutline,mdiContentCopy } from '@mdi/js';
    import { computed, ref, watch } from 'vue'
    import { useCoursesStore } from './../stores/courses';
    import router from './../router';

    const coursesStore = useCoursesStore()
    coursesStore.getCoursesWithProgress();
    computed(() => coursesStore.courses)

    const entities_name1 = ref(['материалов','материал','материала']);


    const getDate = (val) => {
        let date = new Date(val * 1000);
        let data1 = date.toLocaleDateString('ru', {day: 'numeric', month: 'numeric', year: 'numeric'}); 
        return data1;
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

    const routeToCourse = (id) => {
        router.push({name: 'CoursePage', params: {'courseId': id}})
    }

</script>

<template>
    <div class="w-full flex flex-col gap-5 bg-slate-100 p-22 min-h-screen">
        <h2>{{ 'List of courses' }}</h2>
        <div v-for="course in coursesStore.courses" class="p-6 shadow-lg bg-white rounded-lg w-240">
            <a :href="course.href" target="_blank"  class="flex gap-5 items-start">
                <div class="min-w-40 max-w-40 overflow-hidden flex items-center justify-center" v-if="course?.image">
                    <img :src="course?.image?.href" class="h-20 object-cover rounded-lg max-w-full" :alt="course?.image?.name" />
                </div>
                <div class="flex flex-col gap-5 w-4/5">
                    <div class="flex gap-5 items-center justify-between">
                        <div class="flex gap-5 items-center overflow-hidden">
                            <div class="bg-slate-600 text-white p-1 text-sm">
                                <span>{{ getDate(course.date_start)  }}</span>
                            </div>
                            <div class="text-lg text-nowrap text-ellipsis overflow-hidden" @click="routeToCourse(course.course_id)">{{ course.name }}</div>
                        </div>
                        <div class="flex items-center">
                            <BaseIcon :path="mdiStar"  :size="20" class="text-yellow-400"/>
                            <span v-if="course?.rate" class="text-slate-600">{{ course.rate }}</span>
                        </div>
                    </div>
                    <div class="text-slate-600 text-sm text-start" v-if="course?.desc "> 
                        {{ course.desc }}
                    </div>
                    <div class="flex items-center gap-5">
                        <div class="flex items-center">
                            <BaseIcon :path="mdiBriefcase"  :size="16" class="text-slate-600"/>
                            <span v-if="course?.rate" class="text-slate-600 text-sm">{{ 'Курс' }}</span>
                        </div>
                        <div class="flex items-center">
                            <BaseIcon :path="mdiBriefcase"  :size="16" class="text-slate-600"/>
                            <span v-if="course?.tasks" class="text-slate-600">{{ interpretation({num: course?.tasks?.length, entities_name: entities_name1}) }}</span>
                            <span v-else class="text-slate-600 text-sm">0</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>