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

const createOfferSchema = {
    $id: "createOfferSchema",
    schema: {
        body: {
            type: 'object',
            properties: {
                customerId: {type: 'integer'},
                title: {type: 'string'},
                description: {type: 'string'},
                price: {type: 'number'},
                status: {type: 'string'},
                createdBy: {type: 'string'}
            },
            required: ['customerId', 'title', 'description', 'price', 'status', 'createdBy']
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    offer: offerSchema
                }
            }
        }
    }
}

const updateOfferSchema = {
    $id: "updateOfferSchema",
    schema: {
        body: {
            type: 'object',
            required: ['customerId', 'title', 'description', 'price', 'status', 'updatedBy'],
            properties: {
                customerId: {type: 'integer'},
                title: {type: 'string'},
                description: {type: 'string'},
                price: {type: 'number'},
                status: {type: 'string'},
                updatedBy: {type: 'string'}
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    offer: offerSchema
                }
            }
        }
    }
}

const getAllOffersSchema = {
    $id: "getAllOffersSchema",
    schema: {
        response: {
            200: {
                type: 'array',
                items: offerSchema
            }
        }
    }
}

const getOfferSchema = {
    $id: "getOfferSchema",
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    offer: offerSchema
                }
            }
        }
    }
}

const deleteOfferSchema = {
    $id: "deleteOfferSchema",
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

export {offerSchema, createOfferSchema, updateOfferSchema, getOfferSchema, getAllOffersSchema, deleteOfferSchema};