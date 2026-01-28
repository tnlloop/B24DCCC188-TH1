export default [
  {
    path: '/',
    redirect: '/bai1',
  },

  {
    path: '/bai1',
    name: 'Bài 1 - Đoán số',
    component: '@/pages/Bai1_GuessNumber',
  },

  {
    path: '/bai2',
    name: 'Bài 2 - TodoList',
    component: '@/pages/Bai2_TodoList',
  },
];