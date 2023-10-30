import { onUnmounted, reactive, watchEffect } from "vue";
import { events } from "@/hook/events";
import deepcopy from "deepcopy";
import { State, KeyCodes } from "@/type/command";
import { Block, Data } from "@/type/data";

//按钮的一些操作（撤销、重做......）
export const useCommand = (data: Data, focusData: any) => {
  //前进后退需要指针
  const state: State = reactive({
    current: -1, //前进后退的索引值
    queue: [], //存放所有的操作指令
    commands: {}, //制作命令和执行功能一个映射表
    commandArray: [], //存放所有的命令
    destroyArray: [], //存放销毁的数组
  });

  //定义注册函数
  const register = (command: any) => {
    state.commandArray.push(command);
    state.commands[command.name] = (...args: any[]) => {
      //命令名字对应执行函数
      const { redo, undo } = command.execute(...args);
      //这个redo是撤销重做对应的redo
      redo();
      //不需要放到队列中直接跳过
      if (!command.pushQueue) return;

      //如果先放组件1-->组件2————>组件3
      //组件1==>组件3
      let { queue, current } = state;

      if (queue.length > 0) {
        //可能在放置的过程中有撤销操作，所有根据当前最新的current来计算
        queue = queue.slice(0, current + 1);
        state.queue = queue;
      }
      //保存指令的前进后退
      queue.push({ redo, undo });
      state.current = current + 1;
    };
  };

  //注册我们需要的命令
  //注册重做
  register({
    name: "redo",
    keyboard: "ctrl+y",
    execute() {
      return {
        redo() {
          //跳到最后的数据
          let block = state.queue[state.current + 1];
          if (block) {
            block.redo && block.redo();
            state.current++;
          }
        },
      };
    },
  });

  //注册撤销
  register({
    name: "undo",
    keyboard: "ctrl+z",
    execute() {
      return {
        redo() {
          //没有什么可以撤销的
          if (state.current == -1) return;
          let block = state.queue[state.current];
          if (block) {
            block.undo && block.undo();
            state.current--;
          }
        },
      };
    },
  });

  //如果希望将操作放到队列中可以增加一个属性，标识等会操作要放到队列中
  //注册拖拽
  register({
    name: "drag",
    pushQueue: true,
    //初始化操作 默认会执行
    init() {
      this.before = null;
      //监听拖拽开始事件，保存状态
      const start = () => (this.before = deepcopy(data.blocks));
      //拖拽之后需要触发对应的指令
      const end = () => state.commands.drag();
      events.on("start", start);
      events.on("end", end);
      return () => {
        events.off("start", start);
        events.off("end", end);
      };
    },
    //state.commands.drag()
    execute() {
      let before = this.before;
      let after = data.blocks;
      return {
        //默认一松手直接把当前事情做了
        redo() {
          data.blocks = after;
        },
        //前一步
        undo() {
          data.blocks = before;
        },
      };
    },
  });

  //注册container全局的撤销和重做
  register({
    //更新整个容器
    name: "updateContainer",
    pushQueue: true,
    execute(newval: Data) {
      let state = {
        before: data, //当前的值
        after: newval, //新值
      };

      return {
        redo() {
          data.container = state.after.container;
          data.blocks = state.after.blocks;
        },
        undo() {
          data.container = state.before.container;
          data.blocks = state.before.blocks;
        },
      };
    },
  });

  //置顶操作
  register({
    name: "placeTop",
    pushQueue: true,
    execute() {
      let before = deepcopy(data.blocks);
      //置顶就是在所有的block张找到最大的
      let after = (() => {
        let { focus, unfocused } = focusData.value;
        let maxZIndex = unfocused.reduce((prev: any, block: any) => {
          return Math.max(prev, block.zIndex);
        }, -Infinity);
        //让当前选中的比较大的+1即可
        focus.forEach((block: any) => (block.zIndex = maxZIndex + 1));
        return data.blocks;
      })();

      return {
        undo() {
          //如果当前blocks前后一致，则不会更新
          data.blocks = before;
        },
        redo() {
          data.blocks = after;
        },
      };
    },
  });

  //置底操作
  register({
    name: "placeBottom",
    pushQueue: true,
    execute() {
      let before = deepcopy(data.blocks);
      //置顶就是在所有的block张找到最大的
      let after = (() => {
        let { focus, unfocused } = focusData.value;
        let minZIndex =
          unfocused.reduce((prev: any, block: any) => {
            return Math.min(prev, block.zIndex);
          }, Infinity) - 1;

        //zIndex不能为负数，负值就看不到和组件
        if (minZIndex < 0) {
          const dur = Math.abs(minZIndex);
          minZIndex = 0;
          //减到最小为0，自己不变，其他block的ZIndex增加
          unfocused.forEach((block: any) => (block.zIndex += dur));
        }

        //让当前选中的比较大的+1即可
        focus.forEach((block: any) => (block.zIndex = minZIndex));
        return data.blocks;
      })();

      return {
        undo() {
          //如果当前blocks前后一致，则不会更新
          data.blocks = before;
        },
        redo() {
          data.blocks = after;
        },
      };
    },
  });

  //删除block
  register({
    name: "delete",
    pushQueue: true,
    execute() {
      let state = {
        before: deepcopy(data.blocks), //当前的值
        after: focusData.value.unfocused, //选中的都删除了，留下的都是没选中的
      };
      return {
        redo() {
          data.blocks = state.after;
        },
        undo() {
          data.blocks = state.before;
        },
      };
    },
  });

  //更新每一个block
  register({
    name: "updateBlock", //更新整个容器
    pushQueue: true,
    execute(newBlock: Block, oldBlock: Block) {
      let state = reactive({
        before: data.blocks,
        after: (() => {
          let blocks = deepcopy(data.blocks); //拷贝一份用于新的block
          let index = blocks.findIndex(
            (obj: any) => JSON.stringify(obj) === JSON.stringify(oldBlock)
          ); //找老的 需要通过老的查找
          if (index > -1) {
            blocks.splice(index, 1, newBlock);
          }
          return blocks;
        })(),
      });

      return {
        redo() {
          data.blocks = state.after;
        },
        undo() {
          data.blocks = state.before;
        },
      };
    },
  });

  //键盘事件
  const keyboardEvent = (() => {
    const keyCodes: KeyCodes = {
      90: "z",
      89: "y",
    };

    //键盘事件
    const onKeydown = (e: KeyboardEvent) => {
      const { ctrlKey, keyCode } = e; //ctrl+z / ctrl+y
      let keyArr = [];
      //加入ctrl键
      if (ctrlKey) keyArr.push("ctrl");
      keyArr.push(keyCodes[keyCode]);
      //将数组转为字符串 ctrl+z
      let keyString = keyArr.join("+");

      state.commandArray.forEach(({ keyboard, name }) => {
        //没有键盘事件
        if (!keyboard) return;
        if (keyboard === keyString) {
          //调用该键所对应的函数
          state.commands[name]();
          e.preventDefault();
        }
      });
    };

    //初始化事件
    const init = () => {
      window.addEventListener("keydown", onKeydown);
      return () => {
        //销毁事件
        window.removeEventListener("keydown", onKeydown);
      };
    };

    return init;
  })();

  (() => {
    //监听键盘事件
    state.destroyArray.push(keyboardEvent());
    state.commandArray.forEach(
      (command) => command.init && state.destroyArray.push(command.init())
    );
  })();

  //清理绑定的事件
  onUnmounted(() => {
    state.destroyArray.forEach((fn) => fn && fn());
  });
  //使用watchEffect()函数来代替onUnmounted钩子函数。watchEffect()函数会在组件卸载时自动停止，因此不会出现上述警告信息。
  //   watchEffect(() => {
  //     state.destroyArray.forEach((fn) => fn && fn());
  //   });

  return state;
};
