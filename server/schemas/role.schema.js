const roleSchema = {
    $id: "roleSchema",
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {type: "string"},
        canEdit: {type: "boolean"},
        createdAt: {type: "string"},
        createdBy: {type: "integer"},
        updatedAt: {type: "string"},
        updatedBy: {type: "integer"}
    }
}

const createRoleSchema = {
    $id: "createRoleSchema",
    schema: {
        body: {
            type: "object",
            required: ["name", "canEdit", "createdBy"],
            properties: {
                name: {type: "string"},
                canEdit: {type: "boolean"},
                createdBy: {type: "integer"}
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    role: roleSchema
                }
            }
        }
    }
}

const updateRoleSchema = {
    $id: "updateRoleSchema",
    schema: {
        body: {
            type: "object",
            required: ["name", "canEdit", "updatedBy"],
            properties: {
                name: {type: "string"},
                canEdit: {type: "boolean"},
                updatedBy: {type: "integer"}
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    role: roleSchema
                }
            }
        }
    }
}

const deleteRoleSchema = {
    $id: "deleteRoleSchema",
    schema: {
        params: {
            type: "object",
            required: ["id"],
            properties: {
                id: {type: "integer"}
            }
        },
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

const getRoleSchema = {
    $id: "getRoleSchema",
    schema: {
        params: {
            type: "object",
            required: ["id"],
            properties: {
                id: {type: "integer"}
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    role: roleSchema
                }
            }
        }
    }
}

const getAllRolesSchema = {
    $id: "getAllRolesSchema",
    schema: {
        response: {
            200: {
                type: "array",
                items: roleSchema
            }
        }
    }
}

export {roleSchema, createRoleSchema, updateRoleSchema, deleteRoleSchema, getRoleSchema, getAllRolesSchema};