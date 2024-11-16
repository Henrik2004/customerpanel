export function getAllDocuments(fastify){
    const statement = fastify.db.prepare("SELECT * FROM documents");

    try{
        const documents = statement.all();
        return {documents};
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function getDocument(fastify, id)    {
    const statement = fastify.db.prepare("SELECT * FROM documents WHERE id = ?");

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function createDocument(fastify, document) {
    const statement = fastify.db.prepare('Insert Into Document(id, name, document_path, createdBy, updatedBy) Values (?, ?, ?, ?, ?)');

    try {
        const result = statement.run(document.id, document.name, document.document_path, document.createdBy, document.updatedBy);
        const documentid = result.changes === 1 ? result.lastInsertRowid : null;
        if (documentid) {
            return getDocument(fastify, documentid);
        } else {
            fastify.log.error("Could not create document");
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function updateDocument(fastify, id, document) {
    const statement = fastify.db.prepare('UPDATE document Set name = ?, document_path = ?, updatedBy = ?, WHERE id = ?');

    try {
        const result = statement.run(document.id, document.name, document.document_path, document.updatedBy);
        if (result.changes === 1) {
            return getDocument(fastify, id);
        } else {
            fastify.log.error('Could not update document');
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function deleteDocument(fastify, id) {
    const statement = fastify.db.prepare('DELETE FROM documents WHERE id = ?');

    try {
        const result = statement.run(id);
        if (result.changes === 1) {
            return {success: true};
        } else {
            fastify.log.error('Could not delete document');
            return {success: false};
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}