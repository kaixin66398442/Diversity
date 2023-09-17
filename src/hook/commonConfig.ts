//编写JsPlumb配置规则

export const jsplumbSetting = {
  grid: [10, 10],
  // 动态锚点、位置自适应
  Anchors: ["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"],
  Container: "center", //可拖动区域 ID
  // 连线的样式 StateMachine、Flowchart,有四种默认类型：Bezier（贝塞尔曲线），Straight（直线），  Flowchart（流程图），State machine（状态机）
  Connector: [
    "Flowchart",
    { cornerRadius: 5, alwaysRespectStubs: true, stub: 5 },
  ],
  // 鼠标不能拖动删除线
  ConnectionsDetachable: true,
  // 删除线的时候节点不删除
  DeleteEndpointsOnDetach: false,
  // 连线的端点类型(Dot 圆点、Rectangle 矩形、Image 图像、Blank 空白)
  // Endpoint: ["Dot", {radius: 5}],
  Endpoint: [
    "Rectangle",
    {
      height: 10,
      width: 10,
    },
  ],
  // 线端点的样式
  EndpointStyle: {
    fill: "red", //端点背景色
    outlineWidth: 1, //端点宽度
    outlineStroke: "red", //端点颜色
    radius: 5,
  }, //这个是控制连线终端那个小点的样式
  EndpointHoverStyle: { fill: "#fff", outlineStroke: "#13E0F9" }, //这个是控制鼠标滑过连线终端那个小点的样式
  LogEnabled: false, //是否打开jsPlumb的内部日志记录
  // 绘制线
  PaintStyle: {
    stroke: "#409eff",
    strokeWidth: 2, //线的宽度
  },
  HoverPaintStyle: { stroke: "#ff00cc", strokeWidth: 2 }, //鼠标滑过连线的位置
  // 绘制箭头
  Overlays: [
    [
      "Arrow",
      {
        width: 8,
        length: 8,
        location: 1,
      },
    ],
  ],
  RenderMode: "svg",
};

// jsplumb连接参数
export const jsplumbConnectOptions = {
  isSource: true,
  isTarget: true,
  // 动态锚点、提供了4个方向 Continuous、AutoDefault
  anchor: ["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"],
};

//开始瞄点
export const jsplumbSourceOptions = {
  filter: ".node-anchor", //触发连线的区域
  /*"span"表示标签，".className"表示类，"#id"表示元素id*/
  filterExclude: false,
  anchor: ["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"],
  allowLoopback: false, //防止往回连接
};

//结束瞄点
export const jsplumbTargetOptions = {
  filter: ".node-anchor",
  /*"span"表示标签，".className"表示类，"#id"表示元素id*/
  filterExclude: false,
  anchor: ["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"],
  allowLoopback: false, //防止往回连接
};
