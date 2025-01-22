/**
 * Get all comments
 * @param fastify - Fastify instance
 * @param filters - the filters to apply
 * @returns {*|null} - Array of
 */
export function getAllComments(fastify, filters) {
    const statement = fastify.db.prepare('SELECT * FROM comments WHERE user LIKE ? AND text LIKE ? AND offerId LIKE ?');
    const user = filters.user ? `%${filters.user}%` : '%';
    const text = filters.text ? `%${filters.text}%` : '%';
    const offerId = filters.offerId ? `%${filters.offerId}%` : '%';

    try {
        return statement.all(user, text, offerId);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Get a comment by id
 * @param fastify - Fastify instance
 * @param id - the id of the comment
 * @returns {*|null} - the comment
 */
export function getComment(fastify, id) {
    const statement = fastify.db.prepare('SELECT * FROM comments WHERE id = ?');

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function getCommentsByOffer(fastify, offerId) {
    const statement = fastify.db.prepare('SELECT * FROM comments WHERE offerId = ?');

    try {
        return statement.all(offerId);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Create a comment
 * @param fastify - Fastify instance
 * @param comment - the comment
 * @returns {*|null} - the created comment
 */
export function createComment(fastify, comment) {
    const statement = fastify.db.prepare('INSERT INTO comments (user, text, offerId, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?)');

    try {
        const result = statement.run(comment.user, comment.text, comment.offerId, comment.createdBy, comment.createdBy);
        const commentId = result.changes === 1 ? result.lastInsertRowid : null;
        if (commentId) {
            return getComment(fastify, commentId);
        } else {
            fastify.log.error('Could not create comment');
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Update a comment
 * @param fastify - Fastify instance
 * @param id - the id of the comment
 * @param comment - the comment
 * @returns {*|null} - the updated comment
 */
export function updateComment(fastify, id, comment) {
    const statement = fastify.db.prepare('UPDATE comments SET user = ?, text = ?, offerId = ?, updatedBy = ? WHERE id = ?');

    try {
        const result = statement.run(comment.user, comment.text, comment.offerId, comment.updatedBy, id);
        if (result.changes === 1) {
            return getComment(fastify, id);
        } else {
            fastify.log.error('Could not update comment');
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Delete a comment
 * @param fastify - Fastify instance
 * @param id - the id of the comment
 * @returns {{success: boolean}} - the result
 */
export function deleteComment(fastify, id) {
    const statement = fastify.db.prepare('DELETE FROM comments WHERE id = ?');

    try {
        const result = statement.run(id);
        if (result.changes === 1) {
            return {success: true};
        } else {
            fastify.log.error('Could not delete comment');
            return {success: false};
        }
    } catch (error) {
        fastify.log.error(error);
        return {success: false};
    }
}