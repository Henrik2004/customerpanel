//Aufgabe 3
import {getDocument} from "./document.js";

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
        const result = statement.run(tagProps.documentId, tagProps.name.toLowerCase(), tagProps.createdBy, tagProps.createdBy);
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

export function deleteTagsByDocumentId(fastify, documentId) {
    const statement = fastify.db.prepare('DELETE FROM tags WHERE documentId = ?');

    try {
        return statement.run(documentId);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function createLro(fastify, tags, createdBy) {
    const data = {
        status: 'Started',
        payload: '',
        createdBy: createdBy
    }

    const statement = fastify.db.prepare("INSERT INTO lro (status, payload, createdBy) VALUES (?, ?, ?)");

    try {
        const result = statement.run(data.status, data.payload, data.createdBy);
        const lroId = result.changes === 1 ? result.lastInsertRowid : null;
        if (lroId) {
            processLro(fastify, tags, lroId);
            return getLro(fastify, lroId);
        } else {
            fastify.log.error("Could not create lro");
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function processLro(fastify, tags, id) {
    const tagsDb = getAllTags(fastify, {name: null, documentId: null});
    let documentIds = [];
    let documents = [];
    for (const tag of tagsDb) {
        if (tags.includes(tag.name)) {
            documentIds.push(tag.documentId);
        }
    }
    for (const documentId of documentIds) {
        documents.push(getDocument(fastify, documentId));
    }
    setTimeout(() => {
        const statement = fastify.db.prepare('UPDATE lro SET status = ?, payload = ? WHERE id = ?');
        statement.run('Completed', JSON.stringify(documents), id);
    }, 60000);
}

export function getLro(fastify, id) {
    const statement = fastify.db.prepare("SELECT * FROM lro WHERE id = ?");

    try {
        const lro = statement.get(id);
        if (lro && lro.payload) {
            try {
                lro.payload = JSON.parse(lro.payload);
            } catch (error) {
                fastify.log.error("Invalid JSON in payload:", lro.payload);
                lro.payload = null;
            }
        }
        return lro;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}
