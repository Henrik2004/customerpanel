export function getAllOffers(fastify) {
    const statement = fastify.db.prepare('SELECT * FROM offers');

    try {
        return statement.all();
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function getOffer(fastify, id) {
    const statement = fastify.db.prepare('SELECT * FROM offers WHERE id = ?');

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function createOffer(fastify, offer) {
    const statement = fastify.db.prepare('INSERT INTO offers (customerId, title, description, price, status, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?)');

    try {
        const result = statement.run(offer.customerId, offer.title, offer.description, offer.price, offer.status, offer.createdBy, offer.createdBy);
        const offerId = result.changes === 1 ? result.lastInsertRowid : null;
        if (offerId) {
            return getOffer(fastify, offerId);
        } else {
            fastify.log.error('Could not create offer');
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function updateOffer(fastify, id, offer) {
    const statement = fastify.db.prepare('UPDATE offers SET customerId = ?, title = ?, description = ?, price = ?, status = ?, updatedBy = ? WHERE id = ?');

    try {
        const result = statement.run(offer.customerId, offer.title, offer.description, offer.price, offer.status, offer.updatedBy, id);
        if (result.changes === 1) {
            return getOffer(fastify, id);
        } else {
            fastify.log.error('Could not update offer');
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function deleteOffer(fastify, id) {
    const statement = fastify.db.prepare('DELETE FROM offers WHERE id = ?');

    try {
        const result = statement.run(id);
        if (result.changes === 1) {
            return true;
        } else {
            fastify.log.error('Could not delete offer');
            return false;
        }
    } catch (error) {
        fastify.log.error(error);
        return false;
    }
}