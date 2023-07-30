export interface State {
    current: number;
    queue: any[],
    commands: Record<any, Function>,
    commandArray: any[],
    destroyArray: any[]
}

export type KeyCodes = {
    [key: number]: string;
}