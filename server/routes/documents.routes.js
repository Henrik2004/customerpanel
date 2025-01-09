import {
    createDocumentSchema,
    documentSchema,
    getAllDocumentsSchema,
    getDocumentSchema,
    updateDocumentSchema
} from "../schemas/document.schema.js";

import {createDocument, deleteDocument, getAllDocuments, getDocument, updateDocument,} from "../core/document.js";

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

    fastify.post('/', {
        schema: createDocumentSchema,
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
        return document;
    });

    fastify.put('/:id', updateDocumentSchema, async (request, reply) => {
        const documentProps = request.body;
        const updatedDocument = updateDocument(fastify, request.params.id, documentProps);
        if (!updatedDocument) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return updatedDocument;
    });

    fastify.delete('/:id', documentSchema, async (request, reply) => {
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