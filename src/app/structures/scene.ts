import { SceneEmail } from "./scene-email";
import { SceneOption } from "./scene-option";

export interface Scene {
    id: number
    emails: [SceneEmail, ...SceneEmail[]]
    isEnd?: boolean
    story: string
    options: SceneOption[]
}