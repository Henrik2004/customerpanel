import { documentSchema} from "../schemas/document.schema.js";

import {
    createDocument,
    deleteDocument,
    getAllDocuments,
    getDocument,
    updateDocument,
} from "../core/document.js";


async function DocumentRoutes(fastify) {
    fastify.get('/', documentSchema, async (request, reply) => {
        const documents = await getAllDocuments(fastify);
        if (!documents) {
            reply.code(500);
            return { error: "Internal Server Error" };
        }
        return documents;
    });

    fastify.get('/:id', documentSchema, async (request, reply) => {
        const document = getDocument(fastify, request.params.id);
        if (!document) {
            reply.code(404);
            return { error: "Document not found" };
        }
        return document;
    });

    fastify.post('/', documentSchema, async (request, reply) => {
        const documentProps = request.body;
        const newDocument = createDocument(fastify, documentProps);
        if (!newDocument) {
            reply.code(500);
            return { error: "Internal Server Error" };
        }
        reply.code(201);
        return newDocument;
    });

    fastify.put('/:id', documentSchema, async (request, reply) => {
        const documentProps = request.body;
        const updatedDocument = updateDocument(fastify, request.params.id, documentProps);
        if (!updatedDocument) {
            reply.code(500);
            return { error: "Internal Server Error" };
        }
        return updatedDocument;
    });

    fastify.put('/:id', documentSchema, async (request, reply) => {
        const document = getDocument(fastify, request.params.id);
        if (!document) {
            reply.code(404);
            return { error: "Document not found" };
        }
        deleteDocument(fastify, request.params.id);
        return { message: 'Document deleted' };
    });
}

export default DocumentRoutes;