export interface Alert {
    display : boolean,
    text : string,
    type : "error" | "success" | "warning" | "info" | undefined,
    title : string
}