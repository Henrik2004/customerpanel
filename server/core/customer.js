export function getAllCustomers(fastify) {
    const statement = fastify.db.prepare('SELECT * FROM customers');

    try {
        const customers = statement.all();
        return {customers};
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function getCustomer(fastify, id) {
    const statement = fastify.db.prepare('SELECT * FROM customers WHERE id = ?');

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function createCustomer(fastify, customer) {
    const statement = fastify.db.prepare('INSERT INTO customers (name, email, phone, address, city, country, zip, company) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

    try {
        const result = statement.run(customer.name, customer.email, customer.phone, customer.address, customer.city, customer.country, customer.zip, customer.company);
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

export function updateCustomer(fastify, id, customer) {
    const statement = fastify.db.prepare('UPDATE customers SET name = ?, email = ?, phone = ?, address = ?, city = ?, country = ?, zip = ?, company = ? WHERE id = ?');

    try {
        const result = statement.run(customer.name, customer.email, customer.phone, customer.address, customer.city, customer.country, customer.zip, customer.company, id);
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

export function deleteCustomer(fastify, id) {
    const statement = fastify.db.prepare('DELETE FROM customers WHERE id = ?');

    try {
        const result = statement.run(id);
        if (result.changes === 1) {
            return { success: true };
        } else {
            fastify.log.error('Could not delete customer');
            return { success: false };
        }
    } catch (error) {
        fastify.log.error(error);
        return { success: false };
    }
}