import fs from "fs";
import fsPromises from "fs/promises";
import {pipeline} from "stream";
import {promisify} from "util";

const UPLOAD_DIR = "./assets/";
const pump = promisify(pipeline);

await fsPromises.mkdir(UPLOAD_DIR, {recursive: true});

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

export function getDocument(fastify, id) {
    const statement = fastify.db.prepare("SELECT * FROM documents WHERE id = ?");

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function getDocumentsByOfferId(fastify, offerId) {
    const statement = fastify.db.prepare("SELECT * FROM documents WHERE offerId = ?");

    try {
        return statement.all(offerId);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export async function createDocument(fastify, documentProps, file) {
    const statement = fastify.db.prepare("INSERT INTO documents (name, documentPath, offerId, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?)");

    try {
        file.filename = `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}-${file.filename}`;
        const documentPath = `${UPLOAD_DIR}${file.filename}`;
        await pump(file.file, fs.createWriteStream(documentPath));
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