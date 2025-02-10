import {deleteCommentsByOffer} from "./comment.js";
import {deleteDocumentsByOfferId} from "./document.js";

/**
 * Get all offers from the database
 * @param fastify - instance of Fastify
 * @param filters
 * @returns {*|null} - array of offers or null if an error occurred
 */
export function getAllOffers(fastify, filters) {
    const statement = fastify.db.prepare('SELECT * FROM offers WHERE title LIKE ? AND description LIKE ? AND price LIKE ? AND status LIKE ? AND customerId LIKE ?');

    const title = filters.title ? `%${filters.title}%` : '%';
    const description = filters.description ? `%${filters.description}%` : '%';
    const price = filters.price ? `%${filters.price}%` : '%';
    const status = filters.status ? `%${filters.status}%` : '%';
    const customerId = filters.customerId ? `%${filters.customerId}%` : '%';

    try {
        return statement.all(title, description, price, status, customerId);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Get a single offer from the database
 * @param fastify - instance of Fastify
 * @param id - offer id
 * @returns {*|null} - offer object or null if an error occurred
 */
export function getOffer(fastify, id) {
    const statement = fastify.db.prepare('SELECT * FROM offers WHERE id = ?');

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Create a new offer in the database
 * @param fastify - instance of Fastify
 * @param offer - offer object
 * @returns {*|null} - offer object or null if an error occurred
 */
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

/**
 * Update an offer in the database
 * @param fastify - instance of Fastify
 * @param id - offer id
 * @param offer - offer object
 * @returns {*|null} - updated offer object or null if an error occurred
 */
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

/**
 * Update an offer status in the database
 * @param fastify - instance of Fastify
 * @param id - offer id
 * @param status - offer status
 * @returns {*|null} - updated offer object or null if an error occurred
 */
export function updateOfferStatus(fastify, id, status) {
    const statement = fastify.db.prepare('UPDATE offers SET status = ? WHERE id = ?');

    try {
        const result = statement.run(status, id);
        if (result.changes === 1) {
            return getOffer(fastify, id);
        } else {
            fastify.log.error('Could not update offer status');
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Delete an offer from the database
 * @param fastify - instance of Fastify
 * @param id - offer id
 * @returns {boolean} - true if the offer was deleted, false otherwise
 */
export function deleteOffer(fastify, id) {
    const statement = fastify.db.prepare('DELETE FROM offers WHERE id = ?');

    try {
        const result = statement.run(id);
        deleteCommentsByOffer(fastify, id);
        deleteDocumentsByOfferId(fastify, id);
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

/**
 * Delete all offers by customer
 * @param fastify - instance of Fastify
 * @param customerId - customer id
 */
export function deleteOffersByCustomer(fastify, customerId) {
    const offers = getAllOffers(fastify, {customerId: customerId});
    offers.forEach(offer => {
        deleteOffer(fastify, offer.id);
    });
}