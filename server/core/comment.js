export function getAllComments(fastify) {
    const statement = fastify.db.prepare("SELECT * FROM comments");

    try {
        const comments = statement.all();
        return {comments};
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function getComment(fastify, id) {
    const statement = fastify.db.prepare('SELECT * FROM comments WHERE id = ?');

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function createComment(fastify, comment) {
    const statement = fastify.db.prepare('Insert Into comment (id, user, text, createdBy, updatedBy) Values (?, ?, ?, ?, ?)');

    try {
        const result = statement.run(comment.id, comment.user, comment.text, comment.createdBy, comment.updatedBy);
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

export function updateComment(fastify, id, comment) {
    const statement = fastify.db.prepare('UPDATE comment Set user = ?, text = ?, updatedBy = ? WHERE id = ?');

    try {
        const result = statement.run(comment.id, comment.user, comment.text, comment.updatedBy);
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

export function deleteComment(fastify, id) {
    const statement = fastify.db.prepare('DELETE FROM comments WHERE id = ?');

    try {
        const result = statement.run(id);
        if (result.changes === 1) {
            return { success: true };
        } else {
            fastify.log.error('Could not delete comment');
            return { success: false };
        }
    } catch (error) {
        fastify.log.error(error);
        return { success: false };
    }
}