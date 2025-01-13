import {
    createDocumentSchema,
    deleteDocumentSchema,
    getAllDocumentsSchema,
    getDocumentSchema,
    updateDocumentSchema
} from "../schemas/document.schema.js";
import fs from "fs";

import {
    createDocument,
    deleteDocument,
    getAllDocuments,
    getDocument,
    getDocumentsByOfferId,
    updateDocument,
} from "../core/document.js";
import {roleCheck} from "../middleware/roleCheck.js";

async function DocumentRoutes(fastify) {
    fastify.get('/', getAllDocumentsSchema, async (request, reply) => {
        const documents = getAllDocuments(fastify);
        if (!documents) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return documents;
    });

    fastify.get('/:id', getDocumentSchema, async (request, reply) => {
        const document = getDocument(fastify, request.params.id);
        if (!document) {
            reply.code(404);
            return {error: "Document not found"};
        }
        return document;
    });

    fastify.get('/offerid/:offerId', getAllDocumentsSchema, async (request, reply) => {
        const documents = getDocumentsByOfferId(fastify, request.params.offerId);
        if (!documents) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return documents;
    });

    fastify.get('/content/:id', async (request, reply) => {
        const document = getDocument(fastify, request.params.id);
        if (!document) {
            reply.code(404);
            return {error: "Document not found"};
        }
        const documentContent = fs.readFileSync(document.documentPath);
        reply.type('text/plain');
        return documentContent;
    });

    fastify.post('/', {
        schema: createDocumentSchema,
        preHandler: roleCheck(2),
        config: {
            multipart: true
        }
    }, async (request, reply) => {
        const data = await request.file();
        const documentProps = data.fields;
        const document = await createDocument(fastify, documentProps, data);
        if (!document) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        reply.code(201);
        return {document: document};
    });

    fastify.put('/:id', {
        schema: updateDocumentSchema,
        preHandler: roleCheck(2)
    }, async (request, reply) => {
        const documentProps = request.body;
        const updatedDocument = updateDocument(fastify, request.params.id, documentProps);
        if (!updatedDocument) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return updatedDocument;
    });

    fastify.delete('/:id', {
        schema: deleteDocumentSchema,
        preHandler: roleCheck(1)
    }, async (request, reply) => {
        const document = getDocument(fastify, request.params.id);
        if (!document) {
            reply.code(404);
            return {error: "Document not found"};
        }
        deleteDocument(fastify, request.params.id);
        return {message: 'Document deleted'};
    });
}

export default DocumentRoutes;