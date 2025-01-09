const commentSchema = {
    $id: "commentSchema",
    type: 'object',
    properties: {
        id: {type: 'integer'},
        user: {type: 'integer'},
        text: {type: 'string'},
        createdAt: {type: 'string'},
        createdBy: {type: 'string'},
        updatedAt: {type: 'string'},
        updatedBy: {type: 'string'}
    }
};

const createCommentSchema = {
    $id: "createCommentSchema",
    schema: {
        body: {
            type: 'object',
            properties: {
                user: {type: 'integer'},
                text: {type: 'string'},
                createdBy: {type: 'string'}
            },
            required: ['user', 'text', 'createdBy']
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    comment: commentSchema
                }
            }
        }
    }
}

const updateCommentSchema = {
    $id: "updateCommentSchema",
    schema: {
        body: {
            type: 'object',
            required: ['user', 'text', 'updatedBy'],
            properties: {
                user: {type: 'integer'},
                text: {type: 'string'},
                updatedBy: {type: 'string'}
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    comment: commentSchema
                }
            }
        }
    }
}

const deleteCommentSchema = {
    $id: "deleteCommentSchema",
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {type: 'integer'}
            },
            required: ['id']
        },
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

const getAllCommentsSchema = {
    $id: "getAllCommentsSchema",
    schema: {
        response: {
            200: {
                type: 'array',
                items: commentSchema
            }
        }
    }
}

const getCommentSchema = {
    $id: "getCommentSchema",
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    comment: commentSchema
                }
            }
        }
    }
}

export {
    commentSchema,
    createCommentSchema,
    updateCommentSchema,
    deleteCommentSchema,
    getAllCommentsSchema,
    getCommentSchema
}