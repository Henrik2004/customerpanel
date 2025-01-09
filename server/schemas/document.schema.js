const documentSchema = {
    $id: "documentSchema",
    type: 'object',
    properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
        documentPath: {type: 'string'},
        offerId: {type: 'integer'},
        createdAt: {type: 'string'},
        createdBy: {type: 'integer'},
        updatedAt: {type: 'string'},
        updatedBy: {type: 'integer'}
    }
};

const createDocumentSchema = {
    $id: "createDocumentSchema",
    schema: {
        body: {
            type: 'object',
            properties: {
                name: {type: 'string'},
                offerId: {type: 'integer'},
                createdBy: {type: 'integer'},
                file: {
                    type: 'string',
                    format: 'binary'
                }
            },
            required: ['name', 'offerId', 'createdBy', 'file']
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    document: { $ref : 'documentSchema' }
                }
            }
        }
    }
}

const updateDocumentSchema = {
    $id: "updateDocumentSchema",
    schema: {
        body: {
            type: 'object',
            required: ['name', 'offerId', 'updatedBy'],
            properties: {
                name: {type: 'string'},
                offerId: {type: 'integer'},
                updatedBy: {type: 'integer'}
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    document: { $ref : 'documentSchema' }
                }
            }
        }
    }
}

const deleteDocumentSchema = {
    $id: "deleteDocumentSchema",
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {type: 'string'}
                }
            }
        }
    }
}

const getDocumentSchema = {
    $id: "getDocumentSchema",
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    document: { $ref : 'documentSchema' }
                }
            }
        }
    }
}

const getAllDocumentsSchema = {
    $id: "getAllDocumentsSchema",
    schema: {
        response: {
            200: {
                type: 'array',
                items: { $ref : 'documentSchema' }
            }
        }
    }
}

export {documentSchema, createDocumentSchema, updateDocumentSchema, getDocumentSchema, getAllDocumentsSchema, deleteDocumentSchema};