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

export {commentSchema};