export interface Attrs {
  body: {
    fill?: string;
    stroke?: string;
    rx?: number;
    ry?: number;
    strokeDasharray?: string
  },
  label: {
    text?: string,
    fill?: string,
    fontSize?: number,
    fontWeight?: string,
    fontVariant?: string,
  }
}

export interface LineAttrs {
  line: {
    stroke?: string
  }
}
export interface Node {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  attrs?: Attrs;
}

export interface Edge {
  source: string;
  target: string;
  shape?: string;
  attrs?: LineAttrs;
}

export interface Container {
  width: number;
  height: number;
}


//导出 data.json的数据定义
export interface Data {
  container: Container;
  nodes: Node[];
  edges: Edge[]
}
