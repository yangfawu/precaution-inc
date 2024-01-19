import { Email } from "src/app/structures/email";
import { clone } from "./clone";
import { COMP, ME, SCAMMER } from "./people";

const EMAIL_DICT: Email[] = [
    {
        id: 0,
        name: SCAMMER,
        sender: "scammer",
        target: ME,
        message: [
            "Good day,",
            "I know this email will come to you as a surprise but allow me to engage in a business relationship with you.",
            "My name is Tari Olubukola, the male heir to the Olubukola fortune of $150 million dollars. The bank account held by my family member has been locked behind a paywall of $1,000 due to excessive government restrictions in Nigeria, and we need your help. Due to this restrction, my family has no remaining cash to purchase our necessities or to unlock the account. The bank requires that some fees to be paid before the money can be moved, therefore, we need your support to unlock the account. If we are successful in unlocking our bank account, we will reward you handsomely of $100,000. If you are interested in this business proposal, please reply to this email with your basic information.",
            "Best,\nTari Olubukola"
        ]
    },
    {
        id: 1,
        name: SCAMMER,
        sender: "scammer",
        target: ME,
        message: [
            "Hey,",
            "Great to hear back from you, sir. I was looking forward to your response!",
            "First of all, I appreciate you for agreeing upon to the business proposal. As I said before, $1,000 is required to complete the transaction. The bank will be pleased if the money arrives in 3-5 business days. Please transfer the money as soon as possible to aquire your reward. Second of all, my bank account number is 4556284125538. Once you transfer the money, further notices will given upon receiving the transaction. I look forward to execute the business proposal with you. Thank you once again.",
            "Best,\nTari Olubukola"
        ]
    },
    {
        id: 2,
        name: SCAMMER,
        sender: "scammer",
        target: ME,
        message: [
            "Hey,",
            "I have received your transaction an hour ago. The $1,000 has been collected by myself.",
            "Thank you for the transaction! I have sent the $1,000 to the bank like it required, but that it has failed to unlock the family's bank account. The bank is requesting for an additional $5,000 to successfully unlock the account because of the increased government restriction in Nigeria. I will, without a doubt, increase the reward to $250,000 if you are interested to continue this business proposal. Let me know your decision as early as possible!",
            "Best,\nTari Olubukola"
        ]
    },
    {
        id: 3,
        name: SCAMMER,
        sender: "scammer",
        target: ME,
        message: [
            "Hey,",
            "I have received your transaction an hour ago. The $5,000 has been collected by myself.",
            "Thank you for the transaction! I have sent the $5,000 to the bank like it required, but that it has failed to unlock the family's bank account. The bank is requesting for an additional $10,000 to successfully unlock the account because of the increased government restriction in Nigeria. I will, without a doubt, increase the reward to $500,000 if you are interested to continue this business proposal. Let me know your decision as early as possible!",
            "Best,\nTari Olubukola"
        ]
    },
    {
        id: 4,
        name: COMP,
        sender: "precaution",
        target: ME,
        message: [
            "You decided to ignore, block, and report Tari Olubukola."
        ],
        info: [
            "Correct! You should always ignore these emails. These scams are known as \"Nigerian 419\" scams because the first of them came from Nigeria and  '419' in the name comes from the section of Nigeria’s Criminal Code which outlaws the practice."
        ]
    },
    {
        id: 5,
        name: COMP,
        sender: "precaution",
        target: ME,
        message: [
            "You replied to the email indicating that you are interested."
        ],
        info: [
            "Incorrect! You should always ignore these emails. These scams are known as \"Nigerian 419\" scams because the first of them came from Nigeria and  '419' in the name comes from the section of Nigeria’s Criminal Code which outlaws the practice."
        ]
    },
    {
        id: 6,
        name: COMP,
        sender: "precaution",
        target: ME,
        message: [
            "You agreed and went ahead to send " + SCAMMER + " the money."
        ],
        info: [
            "Incorrect! Ignore the emails and don't send money to stangers because you will never be sent the money that was promised in these \"Nigerian 419\" scams."
        ]
    },
    {
        id: 7,
        name: COMP,
        sender: "precaution",
        target: ME,
        message: [
            "You decided to cut ends and requested your forwarded back."
        ],
        info: [
            "Correct. Although you will not be compensated for previous payments, you will save yourself from sending away more money."
        ]
    },
    {
        id: 8,
        name: COMP,
        sender: "precaution",
        target: ME,
        message: [
            "You decided to ask people you trust for advice."
        ],
        info: [
            "If in doubt, ask your family, friends, and any professionals of the field. Contact Precaution! Nothing can go wrong if you ask for another POV from people. These suggestions can and will possibly save you thousands of dollars."
        ]
    },
    {
        id: 9,
        name: COMP,
        sender: "precaution",
        target: ME,
        message: [
            "You decided to ignore, block, and report Tari Olubukola."
        ],
        info: [
            "Correct! These scams are known as \"Nigerian 419\" scams because the section 419 of Nigeria’s Criminal Code outlaws the practice. The scammer will contact you out of the blue and reward you for helping, but you will never be compensated with their promises. Therefore, you should always ignore these emails."
        ]
    }
]
export const getEmail = (id: Email['id']) => {
    const data = EMAIL_DICT.find(cand => cand.id == id)
    if (data)
        return clone(data)
    return data
}
