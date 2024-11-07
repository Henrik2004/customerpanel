const customerSchema = {
    $id: "customerSchema",
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        address: { type: 'string' },
        city: { type: 'string' },
        country: { type: 'string' },
        zip: { type: 'string' },
        company: { type: 'string' },
        createdAt: { type: 'string' },
        createdBy: { type: 'string' },
        updatedAt: { type: 'string' },
        updatedBy: { type: 'string' }
    }
};

export {customerSchema};