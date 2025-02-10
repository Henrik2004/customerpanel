import {deleteOffersByCustomer} from "./offer.js";

/**
 * Get all customers
 * @param fastify - the fastify instance
 * @param filters - the filters for the customers
 * @returns {*|null} - the customers or null
 */
export function getAllCustomers(fastify, filters) {
    const statement = fastify.db.prepare('SELECT * FROM customers WHERE name LIKE ? AND email LIKE ? AND phone LIKE ? AND address LIKE ? AND city LIKE ? AND country LIKE ? AND zip LIKE ? AND company LIKE ?');

    const name = filters.name ? `%${filters.name}%` : '%';
    const email = filters.email ? `%${filters.email}%` : '%';
    const phone = filters.phone ? `%${filters.phone}%` : '%';
    const address = filters.address ? `%${filters.address}%` : '%';
    const city = filters.city ? `%${filters.city}%` : '%';
    const country = filters.country ? `%${filters.country}%` : '%';
    const zip = filters.zip ? `%${filters.zip}%` : '%';
    const company = filters.company ? `%${filters.company}%` : '%';

    try {
        return statement.all(name, email, phone, address, city, country, zip, company);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Get customer by id
 * @param fastify - the fast
 * @param id - the customer id
 * @returns {*|null} - the customer or null
 */
export function getCustomer(fastify, id) {
    const statement = fastify.db.prepare('SELECT * FROM customers WHERE id = ?');

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Create a new customer
 * @param fastify - the fastify instance
 * @param customer - the customer object with the properties
 * @returns {*|null} - the new customer or null
 */
export function createCustomer(fastify, customer) {
    const statement = fastify.db.prepare('INSERT INTO customers (name, email, phone, address, city, country, zip, company, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

    try {
        const result = statement.run(customer.name, customer.email, customer.phone, customer.address, customer.city, customer.country, customer.zip, customer.company, customer.createdBy, customer.createdBy);
        const customerId = result.changes === 1 ? result.lastInsertRowid : null;
        if (customerId) {
            return getCustomer(fastify, customerId);
        } else {
            fastify.log.error('Could not create customer');
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Update a customer
 * @param fastify - the fastify instance
 * @param id - the customer id
 * @param customer - the customer object with the properties
 * @returns {*|null} - the updated customer or null
 */
export function updateCustomer(fastify, id, customer) {
    const statement = fastify.db.prepare('UPDATE customers SET name = ?, email = ?, phone = ?, address = ?, city = ?, country = ?, zip = ?, company = ?, updatedBy = ? WHERE id = ?');

    try {
        const result = statement.run(customer.name, customer.email, customer.phone, customer.address, customer.city, customer.country, customer.zip, customer.company, customer.updatedBy, id);
        if (result.changes === 1) {
            return getCustomer(fastify, id);
        } else {
            fastify.log.error('Could not update customer');
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Delete a customer
 * @param fastify - the fastify instance
 * @param id - the customer id
 * @returns {{success: boolean}} - the result
 */
export function deleteCustomer(fastify, id) {
    const statement = fastify.db.prepare('DELETE FROM customers WHERE id = ?');

    try {
        const result = statement.run(id);
        deleteOffersByCustomer(fastify, id);
        if (result.changes === 1) {
            return {success: true};
        } else {
            fastify.log.error('Could not delete customer');
            return {success: false};
        }
    } catch (error) {
        fastify.log.error(error);
        return {success: false};
    }
}