//编写JsPlumb配置规则

// 编写JsPlumb配置规则
export const jsplumbSetting = {
  grid: [10, 10],
  Anchors: ["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"],
  Container: "center",
  Connector: [
    "Flowchart",
    { cornerRadius: 5, alwaysRespectStubs: true, stub: 5 },
  ],
  ConnectionsDetachable: true,
  DeleteEndpointsOnDetach: false,
  Endpoint: ["Dot", { height: 10, width: 10 }],
  EndpointStyle: {
    fill: "red",
    outlineWidth: 1,
    outlineStroke: "red",
    radius: 5,
  },
  EndpointHoverStyle: { fill: "#fff", outlineStroke: "#13E0F9" },
  LogEnabled: false,
  PaintStyle: { stroke: "#409eff", strokeWidth: 2 },
  HoverPaintStyle: { stroke: "#ff00cc", strokeWidth: 2 },
  Overlays: [["Arrow", { width: 8, length: 8, location: 1 }]],
  RenderMode: "svg",
};

// jsplumb连接参数
export const jsplumbConnectOptions = {
  isSource: true,
  isTarget: true,
  anchor: ["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"],
  // anchor: "AutoDefault", // 使用自动默认锚点
};

// 开始瞄点和结束瞄点共享相同的选项
const commonOptions = {
  filter: ".node-anchor",
  filterExclude: false,
  anchor: ["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"],
  allowLoopback: false,
};

// 开始瞄点
export const jsplumbSourceOptions = { ...commonOptions };

// 结束瞄点
export const jsplumbTargetOptions = { ...commonOptions };
