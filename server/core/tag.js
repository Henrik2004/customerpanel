//Aufgabe 3
export function getAllTags(fastify, filters) {
    const statement = fastify.db.prepare("SELECT * FROM tags WHERE name LIKE ? AND documentId LIKE ?");

    const name = filters.name ? `%${filters.name}%` : '%';
    const documentId = filters.documentId ? `%${filters.documentId}%` : '%';

    try {
        return statement.all(name, documentId);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function getTag(fastify, id) {
    const statement = fastify.db.prepare("SELECT * FROM tags WHERE id = ?");

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function getTagsByDocumentId(fastify, documentId) {
    const statement = fastify.db.prepare("SELECT * FROM tags WHERE documentId = ?");

    try {
        return statement.all(documentId);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function createTag(fastify, tagProps) {
    const statement = fastify.db.prepare("INSERT INTO tags (documentId, name, createdBy, updatedBy) VALUES (?, ?, ?, ?)");

    try {
        const result = statement.run(tagProps.documentId, tagProps.name, tagProps.createdBy, tagProps.createdBy);
        const tagId = result.changes === 1 ? result.lastInsertRowid : null;
        if (tagId) {
            return getTag(fastify, tagId);
        } else {
            fastify.log.error("Could not create tag");
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function updateTag(fastify, id, tag) {
    const statement = fastify.db.prepare('UPDATE tags SET name = ?, updatedBy = ? WHERE id = ?');

    try {
        const result = statement.run(tag.name, tag.updatedBy, id);
        const tagId = result.changes === 1 ? id : null;
        if (tagId) {
            return getTag(fastify, tagId);
        } else {
            fastify.log.error('Could not update tag');
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function deleteTag(fastify, id) {
    const statement = fastify.db.prepare('DELETE FROM tags WHERE id = ?');

    try {
        return statement.run(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}
