import {offerSchema} from "./offer.schema.js";

const legacySchema = {
    $id: "legacySchema",
    type: 'object',
    properties: {
        xCreatedOn: {type: 'string'},
        xCreatedBy: {type: 'string'},
        xSoftwareVersion: {type: 'string'},
        xOffer: {
            type: 'object',
            properties: {
                customerId: {type: 'integer'},
                price: {type: 'integer'},
                currency: {type: 'string'},
                state: {type: 'string'},
                name: {type: 'string'},
                hints: {type: 'string'},
            }
        }
    }
}

const addLegacyDataSchema = {
    $id: "addLegacyDataSchema",
    schema: {
        body: {
            type: 'object',
            properties: {
                xCreatedOn: {type: 'string'},
                xCreatedBy: {type: 'string'},
                xSoftwareVersion: {type: 'string'},
                xOffer: {
                    type: 'object',
                    properties: {
                        customerId: {type: 'integer'},
                        price: {type: 'integer'},
                        currency: {type: 'string'},
                        state: {type: 'string'},
                        name: {type: 'string'},
                        hints: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    }
                }
            },
            required: ["xCreatedOn", "xCreatedBy", "xSoftwareVersion", "xOffer"]
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    data: offerSchema
                }
            }
        }
    }
}

export {legacySchema, addLegacyDataSchema}