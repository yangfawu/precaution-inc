import { Scene } from "src/app/structures/scene";
import { clone } from "./clone";
import { SCAMMER } from "./people";

const SCENE_DICT: Scene[] = [
    {
        id: 0,
        emails: [
            { emailId: 0 }
        ],
        story: SCAMMER + " wants to perform a \"business deal\" with you.",
        options: [
            { details: "Ignore, block, and report Tari Olubukola.", sceneId: 1 },
            { details: "Reply to this with intended interest to work with Tari Olubukola.", sceneId: 2 },
            { details: "Ask your family and friends to help you with the situation.", sceneId: 5 }
        ]
    },
    {
        id: 1,
        emails: [
            { emailId: 4, delay: { max: 1e3 } }
        ],
        isEnd: true,
        story: "",
        options: []
    },
    {
        id: 2,
        emails: [
            { emailId: 5, delay: { max: 1e3 } },
            { emailId: 1, delay: { max: 1e3 } }
        ],
        story: "The latest email requests that you send a preliminary $1K before engaging in further business.",
        options: [
            { details: "Reply to Tari Olubukola & Transfer $1,000 to his bank account.", sceneId: 3 },
            { details: "Ignore, block, and report Tari Olubukola.", sceneId: 9 },
            { details: "Asking your friend for their advice before paying.", sceneId: 5 }
        ]
    },
    {
        id: 3,
        emails: [
            { emailId: 6, delay: { max: 1e3 } },
            { emailId: 2, delay: { max: 1e3 } }
        ],
        story: "The business man now demands that you send over $5K.",
        options: [
            { details: "Ignore, block, and report Tari Olubukola.", sceneId: 9 },
            { details: "Request Tari Olubukola to return the initial $1,000 & Stop negotiation.", sceneId: 6 },
            { details: "Reply to Tari Olubukola & Transfer $5,000 more to his bank account.", sceneId: 4 }
        ]
    },
    {
        id: 4,
        emails: [
            { emailId: 6, delay: { max: 1e3 } },
            { emailId: 3, delay: { max: 1e3 } }
        ],
        story: "The business man now demands that you send over $10K.",
        options: [
            { details: "Ignore, block, and report Tari Olubukola.", sceneId: 9 }
        ]
    },
    {
        id: 5,
        emails: [
            { emailId: 8, delay: { max: 1e3 } }
        ],
        isEnd: true,
        story: "",
        options: []
    },
    {
        id: 6,
        emails: [
            { emailId: 7, delay: { max: 1e3 } }
        ],
        isEnd: true,
        story: "",
        options: []
    }
]
export const getScene = (id: Scene['id']) => {
    const data = SCENE_DICT.find(cand => cand.id == id)
    if (data)
        return clone(data)
    return data
}