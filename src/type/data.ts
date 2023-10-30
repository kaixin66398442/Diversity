export interface Props {
  text?: string;
  size?: string;
  color?: string;
}

export interface Block {
  top: number;
  left: number;
  zIndex: number;
  key: string;
  props: Props;
}

export interface Container {
  width: number;
  height: number;
}

//导出 data.json的数据定义
export interface Data {
  container: Container;
  blocks: Block[];
}
