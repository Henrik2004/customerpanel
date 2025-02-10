//Aufgabe 3
const tagSchema = {
    $id: "tagSchema",
    type: "object",
    properties: {
        id: { type: "integer" },
        documentId: { type: "integer" },
        name: { type: "string" },
        createdAt: { type: "string" },
        createdBy: { type: "integer" },
        updatedAt: { type: "string" },
        updatedBy: { type: "integer" }
    }
}

const createTagSchema = {
    $id: "createTagSchema",
    schema: {
        body: {
            type: "object",
            properties: {
                documentId: { type: "integer" },
                name: { type: "string" },
                createdBy: { type: "integer" }
            },
            required: ["documentId", "name", "createdBy"]
        },
        response: {
            201: {
                type: "object",
                properties: {
                    tag: { $ref: "tagSchema" }
                }
            }
        }
    }
}

const updateTagSchema = {
    $id: "updateTagSchema",
    schema: {
        body: {
            type: "object",
            required: ["name", "updatedBy"],
            properties: {
                name: { type: "string" },
                updatedBy: { type: "integer" }
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    tag: { $ref: "tagSchema" }
                }
            }
        }
    }
}

const deleteTagSchema = {
    $id: "deleteTagSchema",
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" }
                }
            }
        }
    }
}

const getTagSchema = {
    $id: "getTagSchema",
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    tag: { $ref: "tagSchema" }
                }
            }
        }
    }
}

const getTagsSchema = {
    $id: "getTagsSchema",
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    tags: {
                        type: "array",
                        items: { $ref: "tagSchema" }
                    }
                }
            }
        }
    }
}

const  getTagsByDocumentIdSchema = {
    $id: "getTagsByDocumentIdSchema",
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    tags: {
                        type: "array",
                        items: { $ref: "tagSchema" }
                    }
                }
            }
        }
    }
}

export {
    tagSchema,
    createTagSchema,
    updateTagSchema,
    deleteTagSchema,
    getTagSchema,
    getTagsSchema,
    getTagsByDocumentIdSchema
}