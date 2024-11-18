const userSchema = {
    $id: "userSchema",
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {type: "string"},
        password: {type: "string"},
        role: {type: "integer"},
        createdAt: {type: "string"},
        createdBy: {type: "string"},
        updatedAt: {type: "string"},
        updatedBy: {type: "string"}
    }
}

export {userSchema};