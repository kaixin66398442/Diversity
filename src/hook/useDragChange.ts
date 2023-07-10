import { ref, onMounted, onUnmounted } from "vue";
import { throttle } from "lodash-es";

//拖动改变元素的一些样式（宽）
export const useDragChange = (newWidth:any, min:number, max:number) => {

  //鼠标按下事件
  const mouseDown = (event: MouseEvent) => {
    document.addEventListener("mousemove", mouseMove);
    newWidth.value = event.screenX;
  };

  //拖动改变元素宽度
  const mouseMove = (event: MouseEvent) => {
    newWidth.value = event.screenX;
  };

  //鼠标释放事件
  const mouseUp = () => {
    //指定元素可改变的最大及最小宽度
    const moveX =
      newWidth.value > max ? max : newWidth.value < min ? min : newWidth.value;
    newWidth.value = moveX;
    document.removeEventListener("mousemove", mouseMove);
  };

  //鼠标释放节流事件
  const handleMoveThrottled = throttle(mouseUp, 300);

  //onMounted时添加鼠标移动事件监听器
  onMounted(() => {
    document.addEventListener("mouseup", handleMoveThrottled);
  });

  //组件卸载时移除监听
  onUnmounted(() => {
    document.removeEventListener("mouseup", handleMoveThrottled);
  });


  return {
    mouseDown,
    mouseMove,
    mouseUp
  }
};
