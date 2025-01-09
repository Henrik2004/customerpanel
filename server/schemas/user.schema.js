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

const createUserSchema = {
    $id: "createUserSchema",
    schema: {
        body: {
            type: "object",
            properties: {
                name: {type: "string"},
                password: {type: "string"},
                role: {type: "integer"},
                createdBy: {type: "integer"}
            },
            required: ["name", "password", "role", "createdBy"]
        },
        response: {
            201: {
                type: "object",
                properties: {
                    user: userSchema
                }
            }
        }
    }
}

const updateUserSchema = {
    $id: "updateUserSchema",
    schema: {
        body: {
            type: "object",
            required: ["name", "password", "role", "updatedBy"],
            properties: {
                name: {type: "string"},
                password: {type: "string"},
                role: {type: "integer"},
                updatedBy: {type: "integer"}
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    user: userSchema
                }
            }
        }
    }
}

const deleteUserSchema = {
    $id: "deleteUserSchema",
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: {type: "string"}
                }
            }
        }
    }
}

const getUserSchema = {
    $id: "getUserSchema",
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    user: userSchema
                }
            }
        }
    }
}

const getAllUsersSchema = {
    $id: "getAllUsersSchema",
    schema: {
        response: {
            200: {
                type: "array",
                items: userSchema
            }
        }
    }
}

export {userSchema, createUserSchema, updateUserSchema, deleteUserSchema, getUserSchema, getAllUsersSchema};