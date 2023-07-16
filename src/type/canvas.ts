
import { defineComponent } from "vue";
export interface Component {
    label: string;
    preview: () => string | ReturnType<typeof defineComponent>;
    render: (prop:any) => string | ReturnType<typeof defineComponent>;
    key: string;
    props:Object;
}

export type ComponentMap = Record<string, Component>;

export interface CanvasConfig {
    register: (component: Component) => void;
}

export interface CreateCanvasConfigResult extends CanvasConfig {
    componentList: Component[];
    componentMap: ComponentMap;
}