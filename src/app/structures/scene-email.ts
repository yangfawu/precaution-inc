import { BaseEmail } from "./base-email";
import { Email } from "./email";

export interface SceneEmail {
    emailId: Email['id']
    changes?: Partial<BaseEmail>
    delay?: {
        min?: number
        max: number
    }
}