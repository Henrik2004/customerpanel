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