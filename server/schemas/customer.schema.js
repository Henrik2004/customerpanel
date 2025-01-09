const customerSchema = {
    $id: "customerSchema",
    type: 'object',
    properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
        email: {type: 'string'},
        phone: {type: 'string'},
        address: {type: 'string'},
        city: {type: 'string'},
        country: {type: 'string'},
        zip: {type: 'string'},
        company: {type: 'string'},
        createdAt: {type: 'string'},
        createdBy: {type: 'integer'},
        updatedAt: {type: 'string'},
        updatedBy: {type: 'integer'}
    }
};

const createCustomerSchema = {
    $id: "createCustomerSchema",
    schema: {
        body: {
            type: 'object',
            properties: {
                name: {type: 'string'},
                email: {type: 'string'},
                phone: {type: 'string'},
                address: {type: 'string'},
                city: {type: 'string'},
                country: {type: 'string'},
                zip: {type: 'string'},
                company: {type: 'string'},
                createdBy: {type: 'integer'}
            },
            required: ['name', 'email', 'phone', 'address', 'city', 'country', 'zip', 'company', 'createdBy']
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    customer: customerSchema
                }
            }
        }
    }
}

const updateCustomerSchema = {
    $id: "updateCustomerSchema",
    schema: {
        body: {
            type: 'object',
            required: ['name', 'email', 'phone', 'address', 'city', 'country', 'zip', 'company', 'updatedBy'],
            properties: {
                name: {type: 'string'},
                email: {type: 'string'},
                phone: {type: 'string'},
                address: {type: 'string'},
                city: {type: 'string'},
                country: {type: 'string'},
                zip: {type: 'string'},
                company: {type: 'string'},
                updatedBy: {type: 'integer'}
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    customer: customerSchema
                }
            }
        }
    }
}

const deleteCustomerSchema = {
    $id: "deleteCustomerSchema",
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {type: 'integer'}
            },
            required: ['id']
        }
    }
}

const getAllCustomersSchema = {
    $id: "getAllCustomersSchema",
    schema: {
        response: {
            200: {
                type: 'array',
                items: customerSchema
            }
        }
    }
}

const getCustomerSchema = {
    $id: "getCustomerSchema",
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
                    customer: customerSchema
                }
            }
        }
    }
}

export {
    customerSchema,
    createCustomerSchema,
    updateCustomerSchema,
    deleteCustomerSchema,
    getAllCustomersSchema,
    getCustomerSchema
};