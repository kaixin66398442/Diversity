import {
  defineComponent,
  computed,
  reactive,
  onMounted,
  toRefs,
  nextTick,
  watch,
  inject,
} from "vue";
import { ElInput } from "element-plus";

import { createCanvasContext } from "@/hook/flowchart";

import { Props } from "@/type/data";
import { useStore } from "@/store";
import { useFocus } from "@/hook/useFocus";
import { useCommand } from "@/hook/useCommand";
import { Data } from "@/type/data";

interface Options {
  width?: number;
  height?: number;
  radius?: number;
  borderRadius?: number;
  cornerRadius?: number;
}

//提取画布流程图组件的公共部分（组件定义，图形绘制）
export const useCreateBlock = function (
  props: Props,
  Node: any,
  options: Options
) {
  return defineComponent({
    template: `<div class="blockContent" ref="blockContentRef" @dblclick="toggleInput">
          <el-input v-if="isShowInput" ref="inputRef" v-model="RenderText" @focus="handleInputFocus" @blur="handleInputBlur"></el-input>
        </div>`,

    components: {
      ElInput,
    },
    setup() {
      //data.json的数据
      const data: Data = inject("data")!;
      const { focusData } = useFocus(data, () => {});
      //按钮功能映射
      const { commands } = useCommand(data, focusData);

      const store = useStore();

      const { width, height, radius, borderRadius, cornerRadius } = options;

      const blockStyle = computed(() => {
        return {
          color: props.color,
          fontSize: props.size,
        };
      });

      interface State {
        RenderText: string | undefined;
        blockContentRef: any;
        inputRef: any;
        isShowInput: boolean;
      }

      const state: State = reactive({
        RenderText: props.text, // 组件内容
        blockContentRef: null, // 组件
        inputRef: null, // 输入框
        isShowInput: false, // 判断是否显示输入框
      });

      // 创建 Canvas 元素
      const canvas = document.createElement("canvas");
      canvas.width = width!;
      canvas.height = height!;

      // 创建 Canvas 上下文对象
      const context = createCanvasContext(canvas);

      // 创建流程节点实例
      const node = new Node(context);

      //添加子元素
      const addChildElement = () => {
        //判断属于哪一个流程，调用其函数绘制图形
        const name = Node.name;
        if (name === "ProcessNode")
          node.draw(0, 0, width, height, state.RenderText);
        else if (name === "StartNode")
          node.draw(0, 0, width, height, borderRadius, state.RenderText);
        else if (name === "DecisionNode")
          node.draw(0, 0, width, height, state.RenderText, [""]);
        else if (name === "ManualOperationNode")
          node.draw(0, 0, width, height, state.RenderText);
        else if (name === "ArcProcessNode")
          node.draw(0, 0, width, height, cornerRadius, state.RenderText);
        else if (name === "CircleNode")
          node.draw(0, 0, radius, state.RenderText);

        state.blockContentRef.appendChild(canvas);
      };

      //修改组件的内容
      const updateChildElement = (content: string) => {
        //修改canvas中的值
        node.updateContent(content);
        const oldBlock = store.canvas.lastSelectBlock;
        //更新当前修改的block的text值
        if (store.canvas.lastSelectBlock?.props) {
          store.canvas.lastSelectBlock.props.text = content;
        }
        //修改content，更新data.blocks的值
        commands.updateBlock(store.canvas.lastSelectBlock, oldBlock);
      };

      //初始化，渲染添加canvas
      onMounted(() => {
        addChildElement();
      });

      //input框toggle
      const toggleInput = () => {
        state.isShowInput = true;
        // 使用$nextTick确保在el-input渲染完毕后进行聚焦
        nextTick(() => {
          state.inputRef.focus();
        });
      };

      // 监听输入框焦点事件
      const handleInputFocus = () => {
        state.isShowInput = true;
      };

      // 监听输入框失去焦点事件
      const handleInputBlur = () => {
        state.isShowInput = false;
      };

      //监听组件内容的变化，更新dom
      watch(
        () => state.RenderText,
        (newval) => {
          updateChildElement(newval!);
        }
      );

      return {
        blockStyle,
        ...toRefs(state),
        toggleInput,
        handleInputFocus,
        handleInputBlur,
      };
    },
  });
};
