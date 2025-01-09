const settingsSchema = {
    $id: "settingsSchema",
    type: "object",
    properties: {
        action: {type: "string"},
        secret: {type: "string"},
        data: {type: "object"}
    }
}

export {settingsSchema};