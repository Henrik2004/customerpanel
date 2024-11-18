const documentSchema = {
    $id: "documentSchema",
    type: 'object',
    properties: {
        id: {type: 'integer'},
        name: {type: 'integer'},
        documentPath: {type: 'string'},
        createdAt: {type: 'string'},
        createdBy: {type: 'string'},
        updatedAt: {type: 'string'},
        updatedBy: {type: 'string'}
    }
};

export {documentSchema};