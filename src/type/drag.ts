interface Block {
    top: number;
    left: number
}

// lines的类型
interface LineX {
    showLeft: number;
    left: number
}

interface LineY {
    showTop: number;
    top: number;
}

export interface Lines {
    x: LineX[];
    y: LineY[];
}

//声明DragState类型
export interface DragState {
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
    startPos: Block[];
    lines: Lines,
    dragging: boolean,
}

export interface MarkLine {
    x: number;
    y: number;
}