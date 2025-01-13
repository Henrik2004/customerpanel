import {
    createCustomerSchema,
    customerSchema, deleteCustomerSchema,
    getAllCustomersSchema,
    getCustomerSchema, updateCustomerSchema
} from "../schemas/customer.schema.js";

import {createCustomer, deleteCustomer, getAllCustomers, getCustomer, updateCustomer} from "../core/customer.js";
import {roleCheck} from "../middleware/roleCheck.js";

/**
 * Customers routes
 * GET all customers
 * GET customer by id
 * POST create customer
 * PUT update customer
 * DELETE customer by id
 * @param fastify - the fastify instance
 * @returns {Promise<void>} - the promise
 * @constructor
 */
async function CustomersRoutes(fastify) {
    fastify.get('/', {
        schema: getAllCustomersSchema,
        preHandler: roleCheck(2)
    }, async (request, reply) => {
        const customers = getAllCustomers(fastify);
        if (!customers) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return customers;
    });

    fastify.get('/:id', {
        schema: getCustomerSchema,
        preHandler: roleCheck(3)
    }, async (request, reply) => {
        const customer = getCustomer(fastify, request.params.id);
        if (!customer) {
            reply.code(404);
            return {error: "Customer not found"};
        }
        return {customer};
    });

    fastify.post('/', {
        schema: createCustomerSchema,
        preHandler: roleCheck(1)
    }, async (request, reply) => {
        const customerProps = request.body;
        const newCustomer = createCustomer(fastify, customerProps);
        if (!newCustomer) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        reply.code(201);
        return {customer: newCustomer};
    });

    fastify.put('/:id', {
        schema: updateCustomerSchema,
        preHandler: roleCheck(1)
    }, async (request, reply) => {
        const customerProps = request.body;
        const updatedCustomer = updateCustomer(fastify, request.params.id, customerProps);
        if (!updatedCustomer) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return {customer: updatedCustomer};
    });

    fastify.delete('/:id', {
        schema: deleteCustomerSchema,
        preHandler: roleCheck(1)
    }, async (request, reply) => {
        const customer = getCustomer(fastify, request.params.id);
        if (!customer) {
            reply.code(404);
            return {error: "Customer not found"};
        }
        deleteCustomer(fastify, request.params.id);
        return {message: "Customer deleted"};
    });
}

export default CustomersRoutes;