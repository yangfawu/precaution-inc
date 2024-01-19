export interface BaseEmail {
    name: string
    sender: "precaution" | "scammer"
    message: [string, ...string[]]
    info?: [string, ...string[]]
    target: string
}