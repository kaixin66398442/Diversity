import {
  computed,
  createApp,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  ref,
  onBeforeUnmount,
} from "vue";
import { ElButton } from "element-plus";
import { useStore } from "@/store";
const store = useStore();

export const createComponent = (e: any, commands: any, canvasRef: any) => {
  //定义组件
  const newComponent = defineComponent({
    template: `
            <div id="dropdown" 
            v-if="isShow" 
            :style="dropdownStyle"
            ref="dropdown"
            @click="isShow=!isShow"
            >
                <ElButton 
                v-for="(btn,index) in buttons" :index="index"
                @click="btn.handler()"
                >{{btn.label}}</ElButton>
            </div>
        `,
    components: { ElButton },
    setup() {
      // 按钮集合
      const buttons = reactive([
        { label: "删除", handler: () => commands.delete() },
        { label: "撤销", handler: () => commands.undo() },
        { label: "重做", handler: () => commands.redo() },
        { label: "置顶", handler: () => commands.placeTop() },
        { label: "置底", handler: () => commands.placeBottom() },
      ]);

      const dropdownState = reactive({
        isShow: false,
        top: 0,
        left: 0,
      });

      //当组件创建时，初始化
      const showDropdown = () => {
        dropdownState.isShow = true;
        let left = e.target.parentNode.parentNode.offsetLeft;
        let top = e.target.parentNode.parentNode.offsetTop;
        let width = e.target.parentNode.parentNode.offsetWidth;
        dropdownState.left = left + width / 2;
        dropdownState.top = top / 2;
      };

      //每一个菜单的样式
      const dropdownStyle = computed(() => {
        return {
          top: dropdownState.top + "px",
          left: dropdownState.left + "px",
        };
      });

      //获取当前创建的组件
      const dropdown = ref(null);

      //鼠标点击body则隐藏block菜单栏
      const onMousedownDocument = (e: any) => {
        //如果点击的是dropdown内部则什么都不做
        if (!dropdown?.value?.contains(e.target)) {
          dropdownState.isShow = false;
        }
      };

      onMounted(() => {
        //弹出block菜单栏
        showDropdown();
        //之前为了阻止事件传播，给block加了stopPropagation
        document.body.addEventListener("mousedown", onMousedownDocument, true);
      });

      //组件销毁之前卸载
      onBeforeUnmount(() => {
        document.body.removeEventListener("mousedown", onMousedownDocument);
      });

      return {
        buttons,
        dropdownStyle,
        dropdown,
        // showDialog,
        ...toRefs(dropdownState),
      };
    },
  });

  //创建一个新的div元素
  const newDiv = document.createElement("div");

  //使用$mount方法将组件挂载到新的div元素
  const app = createApp({
    components: {
      newComponent,
    },
    template: `<newComponent />`,
  }).mount(newDiv);

  //将新的div元素插入到canvas中（可以做到挂载不影响之前挂载的）
  canvasRef.children[0].appendChild(app.$el);
};
