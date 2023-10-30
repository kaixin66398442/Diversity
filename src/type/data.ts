export interface Props {
    text?: String;
    size?: String;
    color?: String;
}

export interface Block {
    top: number;
    left: number;
    zIndex: number;
    key: string;
    props: Props;
}

//导出 data.json的数据定义
export interface Data {
    container: {
        width: number;
        height: number;
    };
    blocks: Block[];
}