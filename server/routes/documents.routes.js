import {
    createDocumentSchema,
    deleteDocumentSchema,
    getAllDocumentsSchema, getDocumentContentSchema,
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
import {getOffer} from "../core/offer.js";

/**
 * Document routes
 * @param fastify - Fastify instance
 * @returns {Promise<void>} - the routes
 * @constructor
 */
async function DocumentRoutes(fastify) {
    fastify.get('/', {
        schema: getAllDocumentsSchema,
        preHandler: roleCheck(3)
    }, async (request, reply) => {
        const filters = request.query;
        const documents = getAllDocuments(fastify, filters);
        if (!documents) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return documents;
    });

    fastify.get('/:id', {
        schema: getDocumentSchema,
        preHandler: roleCheck(3)
    }, async (request, reply) => {
        const document = getDocument(fastify, request.params.id);
        if (!document) {
            reply.code(404);
            return {error: "Document not found"};
        }
        return document;
    });

    fastify.get('/offerid/:offerId', {
        schema: getDocumentSchema,
        preHandler: roleCheck(3)
    }, async (request, reply) => {
        const documents = getDocumentsByOfferId(fastify, request.params.offerId);
        if (!documents) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return documents;
    });

    fastify.get('/content/:id', {
        schema: getDocumentContentSchema,
        preHandler: roleCheck(3)
    }, async (request, reply) => {
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
        if (!data) {
            reply.code(400);
            return {error: "No file uploaded"};
        }
        const documentProps = data.fields;
        const offerId = documentProps.offerId.value;
        const offer = getOffer(fastify, offerId);
        if (!offer) {
            reply.code(404);
            return {error: "Offer not found"};
        }

        if (offer.status !== "draft") {
            reply.code(400);
            return {error: "You can only add documents to draft offers!"};
        }

        const document = await createDocument(fastify, documentProps, data);

        if (!document) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }

        reply.code(201);
        return {message: 'Document created successfully'};
    });

    fastify.put('/:id', {
        schema: updateDocumentSchema,
        preHandler: roleCheck(1)
    }, async (request, reply) => {
        const documentProps = request.body;
        const offer = getOffer(fastify, documentProps.offerId);
        if (!offer) {
            reply.code(404);
            return {error: "Offer not found"};
        }

        if (offer.status !== "draft") {
            reply.code(400);
            return {error: "You can only update documents of draft offers!"};
        }

        const updatedDocument = updateDocument(fastify, request.params.id, documentProps);
        if (!updatedDocument) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return updatedDocument;
    });

    fastify.delete('/:id', {
        schema: deleteDocumentSchema,
        preHandler: roleCheck(2)
    }, async (request, reply) => {
        const documentProps = request.body;
        const offer = getOffer(fastify, documentProps.offerId);
        if (!offer) {
            reply.code(404);
            return {error: "Offer not found"};
        }

        if (offer.status !== "draft") {
            reply.code(400);
            return {error: "You can only delete documents of draft offers!"};
        }

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