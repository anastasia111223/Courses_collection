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
            task_block: [
                {
                    block_name: 'Intro',
                    block_id: 1,
                    block_order: 1,
                    tasks: [{name: 'task2',task_id: '22', type: 'video',order: 1},{name: 'task1',task_id: '21', type: 'test', order: 2},{name: 'task6',task_id: '26', type: 'task'}],
                },
                {
                    block_name: 'JS start',
                    block_id: 1,
                    block_order: 2,
                    tasks: [{name: 'task3',task_id: '23', type: 'video'},{name: 'task4',task_id: '24', type: 'task'},]
                }
            ],
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
            task_block: [
                {
                    block_name: 'Intro Docker',
                    block_id: 1,
                    block_order: 1,
                    tasks:[{name: 'task1',task_id: '11', type: 'test'},{name: 'task2',task_id: '12', type: 'video'},{name: 'task3',task_id: '13', type: 'test'},{name: 'task4',task_id: '14', type: 'task'},{name: 'task5',task_id: '15', type: 'info'},{name: 'task6',task_id: '16', type: 'task'}],
                },
                {
                    block_name: 'Part 1: begin',
                    block_id: 4,
                    block_order: 2,
                    tasks:[{name: 'task71',task_id: '71', type: 'info'},{name: 'task72',task_id: '72', type: 'video'},],
                }
            ],
            image: {name: 'ava_js', href: '/univ_year.jpg'},
            rate: 5
        }
    ]);

    const myCourses = ref([
        {
            course_id: 12,
            time_task: 300000,
            task_block: [
                {
                    block_id: 1,
                    tasks: [
                        {answer: 'task1',task_id: '11', type: 'test', progress: 100},
                        {task_id: '12', type: 'video', progress: 40},
                        {answer: [0, 'js'],task_id: '13', type: 'test', progress: 30},
                    ]
                }
                
            ],
        },
        
    ])
    

    const getCourses = async () => {
        // const { data } = await fetch('/api/get_courses')
        
    };

    const getCoursesWithProgress = () => {
        if (myCourses?.value?.length ){
            // let arr = [];
            courses.value.forEach(c => {
                c.progress = 0;
                c.type_task = {
                    test: {count: 0,progress: 0}, video: {count: 0,progress: 0}, task: {count: 0,progress: 0}, info: {count: 0,progress: 0}
                };

                let cou = myCourses.value.find(one => one.course_id === c.course_id);
                if (cou?.task_block?.length && c?.task_block?.length) {
                    c.time_task = cou?.time_task;
                    c.task_block.forEach(bl => {
                        let match = cou.task_block.findIndex(mb => mb?.block_id == bl?.block_id);
                        bl.progress = 0;
                        bl.taskCount = 0;
                        console.log(match, bl?.tasks?.length, cou.task_block[match]?.tasks?.length,'one block ')
                        if (match>= 0 && bl?.tasks?.length && cou.task_block[match]?.tasks?.length) {
                            bl.tasks.forEach(ts => {
                                bl.taskCount ++;
                                c.type_task[ts.type].count++;
                                let myt = cou.task_block[match].tasks.findIndex(one => one.task_id == ts.task_id);
                                if (myt>=0) {
                                    ts = Object.assign(ts, cou.task_block[match].tasks[myt]);
                                    if (ts.progress == 100) c.type_task[ts.type].progress ++;
                                    bl.progress += ts.progress;
                                }
                            });
                            // console.log(bl.progress, 'progres of', bl?.block_id)
                            bl.progress = bl.progress/(bl.taskCount*100);
                        }
                        c.progress += bl.progress;
                        console.log(c,'all progress');
                    });
                    c.progress = Math.trunc((c.progress/c.task_block.length)*10000)/10000;
                }
            });
            
        }
    }
    const getOneCourse = (id) => {
        console.log(id?.value, 'getOneCourse')

        if (courses?.value?.length) {
            let match = courses.value.findIndex( one => one?.course_id == id?.value);
            if (match>=0) return courses.value[match]
            else return  { name: 'No name', course_id: 1,};
        } else return { name: 'No name', course_id: 1,};
    }

    return {
        courses,
        getCourses,
        getOneCourse,
        getCoursesWithProgress
    }
})