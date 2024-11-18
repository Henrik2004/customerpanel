const offerSchema = {
    $id: "offerSchema",
    type: 'object',
    properties: {
        id: {type: 'integer'},
        customerId: {type: 'integer'},
        title: {type: 'string'},
        description: {type: 'string'},
        price: {type: 'number'},
        status: {type: 'string'},
        createdAt: {type: 'string'},
        createdBy: {type: 'string'},
        updatedAt: {type: 'string'},
        updatedBy: {type: 'string'}
    }
}

export {offerSchema};