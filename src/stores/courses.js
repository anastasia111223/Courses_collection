import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const useCoursesStore = defineStore('courses', () => {
    
    const courses = ref([
        { 
            name: 'JS beginning. Материалы курса ОШ',
            course_id: 11,
            desc: 'This course is ..',
            date_start: '1738678727',
            date_end: '1762494146',
            category: 1,
            href: '',
            tasks: [{name: 'task1'},{name: 'task2'},{name: 'task3'},{name: 'task4'},],
            image: {name: 'ava_js', href: '/vite.svg'},
            rate: 5
        },
        { 
            name: 'Docker k8s, OpenShift, Deploy, CI/CD. Материалы курса (ОШ-2024) Материалы курса (ОШ-2024)',
            course_id: 12,
            desc: 'Docker — программная платформа для удобной разработки, доставки, тестирования и автоматизации развёртывания приложений.',
            date_start: '1739978727',
            date_end: '1763494146',
            category: 1,
            href: '',
            tasks: [{name: 'task1'},{name: 'task2'},{name: 'task3'},{name: 'task4'},,{name: 'task5'},{name: 'task6'}],
            image: {name: 'ava_js', href: '/univ_year.jpg'},
            rate: 5
        }
    ])
    

    const getCourses = async () => {
        // const { data } = await fetch('/api/get_courses')
        
    }

    return {
        courses,
        getCourses,
    }
})