export interface UserRef {
    "userId": string,
    "userCreatedDate": Date,
    "profile": {
        "personalDetails": {
            "preferredName": string,
            "age": number,
            "occupation": string
        },
        "immediateContacts": [
            {
                "name": string,
                "relationship": string,
                "frequency": string
            }
        ],
        "spiritualBackground": {
            "faithMaturity": string,
            "bibleKnowledge": string,
            "churchInvolvement": string,
            "preferredStudyStyle": string
        },
        "goalsAndConcerns": {
            "shortTermGoals": string[],
            "longTermGoals": string[],
            "immediateWorries": string[],
            "longTermWorries": string[]
        },
        "studyPreferences": {
            "sessionLength": string,
            "preferredTime": string,
            "frequency": string
        },
    }
    "interactionLog": [
        {
            "date": Date,
            "summary": string,
            "scriptureFocus": string[],
            "notes": string
        }
    ]
}
