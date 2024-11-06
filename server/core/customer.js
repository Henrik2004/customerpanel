export function getAllCustomers(fastify) {
    const statement = fastify.db.prepare('SELECT * FROM customers');

    try {
        const customers = statement.all();
        return { customers };
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