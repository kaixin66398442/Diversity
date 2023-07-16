import { reactive } from "vue";
import { events } from "./events";
import { DragState, MarkLine, Lines } from "@/type/drag";
import { Block, Data } from "@/type/data";

//选中拖拽画布block
export const useDrag = function (focusData: any, lastSelectBlock: any, data: Data) {

    //实现获取焦点的状态
    let dragState: DragState = reactive({
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0,
        startPos: [],
        lines: {
            x: [],
            y: []
        },
        dragging: false,//默认不是在拖拽
    })

    //辅助线的位置
    let markLine: MarkLine = reactive({
        x: 0,
        y: 0,
    })

    const mouseDown = (e: MouseEvent) => {
        const { width: BWidth, height: BHeight } = lastSelectBlock.value;

        dragState.startX = e.clientX;
        dragState.startY = e.clientY;
        //bdian拖拽前的位置 left 和 top
        dragState.startLeft = lastSelectBlock.value.left;
        dragState.startTop = lastSelectBlock.value.top;
        //记录每一个选中的位置
        dragState.startPos = focusData.value.focus.map((block: Block) => {
            return {
                top: block.top,
                left: block.left
            }
        });


        //计算拖拽辅助线的位置

        //获取其他没选中的以他们的位置做辅助线
        const { unfocused } = focusData.value;
        //计算横线的位置，用y来存放，x存放的时纵向的

        let lines: Lines = {
            x: [],
            y: []
        }
        //设置对其参照的block,包括画布container
        const compare = [
            //没被选中的block
            ...unfocused,
            //container
            {
                top: 0,
                left: 0,
                width: data.container.width,
                height: data.container.height
            }
        ]

        compare.forEach((block: any) => {
            const { top: ATop, left: ALeft, width: AWidth, height: AHeight } = block;

            //当此元素拖拽到和A元素top一致的时候，要显示这跟辅助线，辅助线的位置就是ATop
            lines.y.push({ showTop: ATop, top: ATop });//顶对顶
            lines.y.push({ showTop: ATop, top: ATop - BHeight });//顶对底
            lines.y.push({ showTop: ATop + AHeight / 2, top: ATop + AHeight / 2 - BHeight / 2 });//中
            lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight });//底对顶
            lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight - BHeight });//底对底


            lines.x.push({ showLeft: ALeft, left: ALeft });//左对左
            lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth });//右对左
            lines.x.push({ showLeft: ALeft + AWidth / 2, left: ALeft + AWidth / 2 - BWidth / 2 });
            lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth - BWidth });
            lines.x.push({ showLeft: ALeft, left: ALeft - BWidth });//左对右
        });
        dragState.lines = lines;



        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
    }


    //选取拖拽移动
    const mousemove = (e: MouseEvent) => {

        let { clientX: moveX, clientY: moveY } = e;


        //判断是否在拖拽
        if (!dragState.dragging) {
            dragState.dragging = true;
            events.emit('start');//触发事件就会记住拖拽前的位置
        }

        //计算当前元素的最新的left和top，在线的数组里面找，找到显示线
        //鼠标移动后-鼠标移动前+left
        let left = moveX - dragState.startX + dragState.startLeft;
        let top = moveY - dragState.startY + dragState.startTop;

        //先计算横线，距离参照物还有5px的时候显示这根线
        let y = 0;
        let x = 0;
        for (let i = 0; i < dragState.lines.y.length; i++) {
            //获取每一根线
            const { top: t, showTop: s } = dragState.lines.y[i];
            if (Math.abs(t - top) < 5) {//小于5说明接近了
                //线要显示的位置
                y = s;
                //容器距离顶部的距离+目标的高度就是最新的moveY
                moveY = dragState.startY - dragState.startTop + t;
                //实现快速和这个元素贴在一起

                //找到一根线后跳出循环
                break;
            }
        }

        for (let i = 0; i < dragState.lines.x.length; i++) {
            //获取每一根线
            const { left: l, showLeft: s } = dragState.lines.x[i];
            if (Math.abs(l - left) < 5) {//小于5说明接近了
                //线要显示的位置
                x = s;
                //容器距离左边的距离+目标的宽度就是最新的moveX
                moveX = dragState.startX - dragState.startLeft + l;
                //实现快速和这个元素贴在一起

                //找到一根线后跳出循环
                break;
            }
        }
        markLine.x = x;
        markLine.y = y


        //之前和之后的距离
        let durX = moveX - dragState.startX;
        let durY = moveY - dragState.startY;

        //算出最终block的位置
        focusData.value.focus.forEach((block: Block, index: number) => {
            block.top = dragState.startPos[index].top + durY;
            block.left = dragState.startPos[index].left + durX;
        })
    }

    //拖拽完成，鼠标抬起
    const mouseup = () => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
        markLine.x = 0;
        markLine.y = 0;

        if (dragState.dragging) {//如果只是点击就不会被触发
            events.emit('end');
        }
    }

    return {
        dragState,
        mouseDown,
        mousemove,
        mouseup,
        markLine
    }
}