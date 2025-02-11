import fsPromises from "fs/promises";
import {deleteTagsByDocumentId} from "./tag.js";

const UPLOAD_DIR = "./assets/";

await fsPromises.mkdir(UPLOAD_DIR, {recursive: true});

/**
 * Get all documents
 * @param fastify - Fastify instance
 * @param filters - the filters for the documents
 * @returns {*|null} - the documents or null
 */
export function getAllDocuments(fastify, filters) {
    const statement = fastify.db.prepare("SELECT * FROM documents WHERE name LIKE ? AND offerId LIKE ?");

    const name = filters.name ? `%${filters.name}%` : '%';
    const offerId = filters.offerId ? `%${filters.offerId}%` : '%';

    try {
        return statement.all(name, offerId);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Get document by id
 * @param fastify - Fastify instance
 * @param id - the document id
 * @returns {*|null} - the document or null
 */
export function getDocument(fastify, id) {
    const statement = fastify.db.prepare("SELECT * FROM documents WHERE id = ?");

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Get documents by offer id
 * @param fastify - Fastify instance
 * @param offerId - the offer id
 * @returns {*|null} - the documents or null
 */
export function getDocumentsByOfferId(fastify, offerId) {
    const statement = fastify.db.prepare("SELECT * FROM documents WHERE offerId = ?");

    try {
        return statement.all(offerId);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Create a document
 * @param fastify - Fastify instance
 * @param documentProps - the document properties
 * @param file - the file to upload
 * @returns {Promise<*|null>} - the created document or null
 */
export async function createDocument(fastify, documentProps, file) {
    const statement = fastify.db.prepare("INSERT INTO documents (name, documentPath, offerId, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?)");

    try {
        file.filename = `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}-${file.filename}`;
        const documentPath = `${UPLOAD_DIR}${file.filename}`;
        await fsPromises.writeFile(documentPath, file.file);
        const result = statement.run(documentProps.name.value, documentPath, documentProps.offerId.value, documentProps.createdBy.value, documentProps.createdBy.value);
        const documentId = result.changes === 1 ? result.lastInsertRowid : null;
        if (documentId) {
            return getDocument(fastify, documentId);
        } else {
            fastify.log.error("Could not create document");
            return null;
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

/**
 * Update a document
 * @param fastify - Fastify instance
 * @param id - the document id
 * @param document - the document properties
 * @returns {*|null} - the updated document or null
 */
export function updateDocument(fastify, id, document) {
    const statement = fastify.db.prepare('UPDATE documents SET name = ?, offerId = ?, updatedBy = ? WHERE id = ?');

    try {
        const result = statement.run(document.name, document.offerId, document.updatedBy, id);
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

/**
 * Delete a document
 * @param fastify - Fastify instance
 * @param id - the document id
 * @returns {{success: boolean}|null} - the result
 */
export function deleteDocument(fastify, id) {
    const statement = fastify.db.prepare('DELETE FROM documents WHERE id = ?');

    try {
        const document = getDocument(fastify, id);
        if (!document) {
            fastify.log.error('Document not found');
            return {success: false};
        }
        fsPromises.unlink(document.documentPath);
        const result = statement.run(id);
        deleteTagsByDocumentId(fastify, id);
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

/**
 * Delete all documents by offer id
 * @param fastify - Fastify instance
 * @param offerId - the offer id
 * @returns {{success: boolean}|{error: string}|null} - the result
 */
export function deleteDocumentsByOfferId(fastify, offerId) {
    const statement = fastify.db.prepare('DELETE FROM documents WHERE offerId = ?');

    try {
        const documents = getDocumentsByOfferId(fastify, offerId);
        documents.forEach(document => {
            fsPromises.unlink(document.documentPath);
            deleteTagsByDocumentId(fastify, document.id);
        });
        const result =  statement.run(offerId);
        if (result.changes > 0) {
            return {success: true};
        } else {
            return {error: 'Could not delete documents'};
        }
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}