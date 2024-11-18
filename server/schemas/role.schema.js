const roleSchema = {
    $id: "roleSchema",
    type: "object",
    properties: {
        id: {type: "integer"},
        name: {type: "string"},
        canEdit: {type: "boolean"},
        createdAt: {type: "string"},
        createdBy: {type: "string"},
        updatedAt: {type: "string"},
        updatedBy: {type: "string"}
    }
}

export {roleSchema};