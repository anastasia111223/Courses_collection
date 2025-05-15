<script setup>
    import BaseIcon from '../components/BaseIcon.vue';
    import ProgressLine from '../components/ProgressLine.vue';

    import { mdiStar, mdiAccount, mdiMail, mdiBriefcase, mdiFileDocument, mdiChevronDown,mdiPencil, mdiDelete, mdiCog, mdiFileDocumentOutline,mdiContentCopy } from '@mdi/js';
    import { computed, ref, watch } from 'vue'
    import { useCoursesStore } from './../stores/courses';
    import router from './../router';
    import { useRoute, useRouter } from 'vue-router'

    const coursesStore = useCoursesStore()
    coursesStore.getCoursesWithProgress();
    const route = useRoute()
    console.log(route, 'route')
    const id = ref(route?.params?.courseId)
    // if (!id.value) id.value = 1;
    const course = ref(coursesStore.getOneCourse(id))
    console.log(course, 'course')

    // computed(() => coursesStore.getOneCourse(id));

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

</script>

<template>
    <div>
        <h2>{{ course.name }}</h2>
        <div class="flex justify-between">
            <div>
                <div>
                    <div>Прогресс</div>
                    <div class="flex w-full gap-6">
                        <ProgressLine :progress="course.progress? course.progress/100 : 0"/>
                        <div v-if="course.progress">
                            <span>{{ course.progress }}</span>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div>
                <!-- TODO summery card of course -->
            </div>
        </div>
    </div>

</template>