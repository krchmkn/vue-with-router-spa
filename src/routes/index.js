import NotFound from '@/views/NotFound';
import Bills from '@/views/Bills';
import Days from '@/views/Days';
import Operations from '@/views/Operations';

export default {
    mode: 'history',
    routes: [
        { 
            path: '*', 
            component: NotFound,
            meta: {
                title: '404 Страница не найдена'
            }
        },
        {
            path: '/', 
            component: Bills,
            meta: {
                title: 'Счета'
            }
        },
        {
            path: '/days', 
            component: Days,
            meta: {
                title: 'Операционные дни'
            }
        },
        {
            path: '/operations', 
            component: Operations,
            meta: {
                title: 'Операции'
            }
        }
    ]
};
