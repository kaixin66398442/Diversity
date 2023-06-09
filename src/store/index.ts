// import { Block } from '@/type/data';
// import { AboutDialog } from '@/type/dialog';
// import { defineStore } from 'pinia'

// interface State {
//     dialogVisible: boolean;
//     aboutDialog: AboutDialog;
//     previewRef: boolean;
//     editorRef: boolean;
//     lastSelectBlock: Block;
// }


// // useStore 可以是 useUser、useCart 之类的任何东西
// // 第一个参数是应用程序中 store 的唯一 id
// export const useStore = defineStore('main', {
//     // 推荐使用 完整类型推断的箭头函数
//     state: (): State => ({
//         dialogVisible: false,//是否显示弹窗
//         aboutDialog: {
//             title: '',//弹窗标题
//             content:'',//弹窗内容
//             showBtn: false,//是否显示弹出框下边按钮
//             curBlock: '',//当前的block
//         },
//         previewRef: true,//是否预览
//         editorRef: true,//是否编辑
//         lastSelectBlock: {
//             // top: 0,
//             // left: 0,
//             // zIndex: 0,
//             // key: '',
//             // props: {
//             //     text: '',
//             //     color: '',
//             //     size: '',
//             //     type: '',
//             // }
//         },//最后一个选中的block

//     }),
//     actions: {
//         showDialog() {
//             this.dialogVisible = true;
//         }
//     },
//     getters: {},

// })
