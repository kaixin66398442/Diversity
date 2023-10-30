// 导出开始节点类（圆边矩形）
export class StartNode {
  constructor(private canvasContext: CanvasRenderingContext2D) {}

  // 绘制开始节点
  draw(
    x: number,
    y: number,
    width: number,
    height: number,
    borderRadius: number,
    label: string
  ) {
    // 绘制圆边矩形
    this.canvasContext.fillStyle = "lightyellow";
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(x + borderRadius, y);
    this.canvasContext.lineTo(x + width - borderRadius, y);
    this.canvasContext.quadraticCurveTo(
      x + width,
      y,
      x + width,
      y + borderRadius
    ); // 右上角
    this.canvasContext.lineTo(x + width, y + height - borderRadius);
    this.canvasContext.quadraticCurveTo(
      x + width,
      y + height,
      x + width - borderRadius,
      y + height
    ); // 右下角
    this.canvasContext.lineTo(x + borderRadius, y + height);
    this.canvasContext.quadraticCurveTo(
      x,
      y + height,
      x,
      y + height - borderRadius
    ); // 左下角
    this.canvasContext.lineTo(x, y + borderRadius);
    this.canvasContext.quadraticCurveTo(x, y, x + borderRadius, y); // 左上角
    this.canvasContext.closePath();
    this.canvasContext.fill();
    this.canvasContext.stroke();

    // 绘制文字
    this.canvasContext.fillStyle = "black";
    this.canvasContext.font = "14px Arial";
    this.canvasContext.textAlign = "center";
    this.canvasContext.fillText(label, x + width / 2, y + height / 2);
  }

  // 修改start的内容
  updateContent(newLabel: string) {
    const { width, height } = this.canvasContext.canvas;
    this.canvasContext.clearRect(0, 0, width, height);
    this.draw(0, 0, width, height, 32, newLabel);
  }
}

// 导出判定节点类（菱形）
export class DecisionNode {
  constructor(private canvasContext: CanvasRenderingContext2D) {}

  // 绘制判定节点
  draw(
    x: number,
    y: number,
    width: number,
    height: number,
    label: string,
    options: string[]
  ) {
    // 绘制菱形
    this.canvasContext.fillStyle = "lightyellow";
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(x, y + height / 2);
    this.canvasContext.lineTo(x + width / 2, y);
    this.canvasContext.lineTo(x + width, y + height / 2);
    this.canvasContext.lineTo(x + width / 2, y + height);
    this.canvasContext.closePath();
    this.canvasContext.fill();
    this.canvasContext.stroke();

    // 绘制文字
    this.canvasContext.fillStyle = "black";
    this.canvasContext.font = "14px Arial";
    this.canvasContext.textAlign = "center";
    this.canvasContext.fillText(label, x + width / 2, y + height / 2 + 5);

    // 绘制决策选项文字
    this.canvasContext.fillStyle = "black";
    this.canvasContext.font = "14px Arial";
    this.canvasContext.fillText(options[0], x + width / 2, y + height / 2 + 30);
    this.canvasContext.fillText(options[1], x + width / 2, y + height / 2 + 50);
  }

  // 修改decision的内容
  updateContent(newLabel: string) {
    const { width, height } = this.canvasContext.canvas;
    this.canvasContext.clearRect(0, 0, width, height);
    this.draw(0, 0, width, height, newLabel, [""]);
  }
}

// 导出流程节点类（矩形）
export class ProcessNode {
  constructor(private canvasContext: CanvasRenderingContext2D) {}

  // 绘制流程节点
  draw(x: number, y: number, width: number, height: number, label: string) {
    // 绘制矩形
    this.canvasContext.fillStyle = "lightyellow";
    this.canvasContext.fillRect(x, y, width, height);
    this.canvasContext.strokeStyle = "black";
    this.canvasContext.lineWidth = 1;
    this.canvasContext.strokeRect(x, y, width, height);

    // 绘制文字
    this.canvasContext.fillStyle = "black";
    this.canvasContext.font = "14px Arial";
    this.canvasContext.textAlign = "center";
    this.canvasContext.textBaseline = "middle";
    this.canvasContext.fillText(label, x + width / 2, y + height / 2);
  }

  // 修改process的内容
  updateContent(newLabel: string) {
    const { width, height } = this.canvasContext.canvas;
    this.canvasContext.clearRect(0, 0, width, height);
    this.draw(0, 0, width, height, newLabel);
  }
}

//手动操作节点类（梯形）
export class ManualOperationNode {
  constructor(private canvasContext: CanvasRenderingContext2D) {}

  // 绘制流程节点
  draw(x: number, y: number, width: number, height: number, label: string) {
    // 绘制梯形
    this.canvasContext.fillStyle = "lightyellow";
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(x, y);
    this.canvasContext.lineTo(x + width, y);
    this.canvasContext.lineTo(x + width - height / 2, y + height);
    this.canvasContext.lineTo(x + height / 2, y + height);
    this.canvasContext.closePath();
    this.canvasContext.fill();
    this.canvasContext.stroke();

    // 绘制文字
    this.canvasContext.fillStyle = "black";
    this.canvasContext.font = "14px Arial";
    this.canvasContext.textAlign = "center";
    this.canvasContext.textBaseline = "middle";
    this.canvasContext.fillText(label, x + width / 2, y + height / 2);
  }

  // 修改manualOperation的内容
  updateContent(newLabel: string) {
    const { width, height } = this.canvasContext.canvas;
    this.canvasContext.clearRect(0, 0, width, height);
    this.draw(0, 0, width, height, newLabel);
  }
}

//文档节点类（圆弧矩形）
export class ArcProcessNode {
  constructor(private canvasContext: CanvasRenderingContext2D) {}

  // 绘制圆弧矩形流程节点
  draw(
    x: number,
    y: number,
    width: number,
    height: number,
    cornerRadius: number,
    label: string
  ) {
    // 绘制路径
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(x + cornerRadius, y);
    this.canvasContext.lineTo(x + width - cornerRadius, y);
    this.canvasContext.arcTo(
      x + width,
      y,
      x + width,
      y + cornerRadius,
      cornerRadius
    );
    this.canvasContext.lineTo(x + width, y + height - cornerRadius);
    this.canvasContext.arcTo(
      x + width,
      y + height,
      x + width - cornerRadius,
      y + height,
      cornerRadius
    );
    this.canvasContext.lineTo(x + cornerRadius, y + height);
    this.canvasContext.arcTo(
      x,
      y + height,
      x,
      y + height - cornerRadius,
      cornerRadius
    );
    this.canvasContext.lineTo(x, y + cornerRadius);
    this.canvasContext.arcTo(x, y, x + cornerRadius, y, cornerRadius);
    this.canvasContext.closePath();

    // 填充颜色
    this.canvasContext.fillStyle = "lightyellow";
    this.canvasContext.fill();

    // 绘制边框
    this.canvasContext.strokeStyle = "black";
    this.canvasContext.stroke();

    // 绘制文字
    this.canvasContext.fillStyle = "black";
    this.canvasContext.font = "14px Arial";
    this.canvasContext.textAlign = "center";
    this.canvasContext.fillText(label, x + width / 2, y + height / 2);
  }

  // 修改arcProcess的内容
  updateContent(newLabel: string) {
    const { width, height } = this.canvasContext.canvas;
    this.canvasContext.clearRect(0, 0, width, height);
    this.draw(0, 0, width, height, 10, newLabel);
  }
}

//开始节点（圆形）
export class CircleNode {
  constructor(private canvasContext: CanvasRenderingContext2D) {}

  // 绘制圆形节点
  draw(x: number, y: number, radius: number, label: string) {
    // 绘制圆形
    this.canvasContext.beginPath();
    this.canvasContext.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
    this.canvasContext.closePath();
    this.canvasContext.fillStyle = "lightyellow";
    this.canvasContext.fill();
    this.canvasContext.stroke();

    // 绘制文字
    this.canvasContext.fillStyle = "black";
    this.canvasContext.font = "14px Arial";
    this.canvasContext.textAlign = "center";
    this.canvasContext.fillText(label, x + radius, y + radius);
  }

  // 修改circle的内容
  updateContent(newLabel: string) {
    const { width, height } = this.canvasContext.canvas;
    this.canvasContext.clearRect(0, 0, width, height);
    this.draw(0, 0, 30, newLabel);
  }
}

// 创建 Canvas 上下文对象
export function createCanvasContext(
  canvas: HTMLCanvasElement
): CanvasRenderingContext2D {
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas context is not supported");
  }

  return context;
}
