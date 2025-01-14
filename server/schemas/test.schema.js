const testSchema = {
    type: 'object',
    properties: {
        test: {type: 'string'}
    }
}

const runTestsSchema = {
    $id: "runTestsSchema",
    schema: {
        body: {
            type: 'object',
            properties: {
                test: {type: 'string'}
            },
            required: ['test']
        },
        response: {
            200: {
                type: 'object',
                properties: testSchema
            }
        }
    }
}

export {runTestsSchema}