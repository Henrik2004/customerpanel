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

const lroSchema = {
    $id: "lroSchema",
    type: "object",
    properties: {
        id: { type: "integer" },
        status: { type: "string" },
        payload: { type: "object" },
        createdAt: { type: "string" },
        createdBy: { type: "integer" }
    }
}

const processTagsSchema = {
    $id: "processTagsSchema",
    schema: {
        body: {
            type: "object",
            properties: {
                tags: {
                    type: "array",
                    items: { type: "string" }
                }
            },
            required: ["tags"]
        },
        response: {
            202: {
                type: "object",
                properties: {
                    message: { type: "string" }
                }
            }
        }
    }
}

const createLroSchema = {
    $id: "createLroSchema",
    schema: {
        body: {
            type: "object",
            properties: {
                payload: { type: "object" },
                createdBy: { type: "integer" }
            },
            required: ["createdBy"]
        },
        response: {
            201: {
                type: "object",
                properties: {
                    lro: { $ref: "lroSchema" }
                }
            }
        }
    }
}

const getLroSchema = {
    $id: "getLroSchema",
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    lro: { $ref: "lroSchema" }
                }
            },
            202: {
                type: "object",
                properties: {
                    message: { type: "string" }
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
    getTagsByDocumentIdSchema,
    processTagsSchema,
    createLroSchema,
    getLroSchema
}