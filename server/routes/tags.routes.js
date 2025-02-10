import {
    getTagSchema,
    createTagSchema,
    deleteTagSchema,
    getTagsSchema,
    updateTagSchema
} from "../schemas/tag.schema.js";
import {roleCheck} from "../middleware/roleCheck.js";
import {createTag, deleteTag, getAllTags, getTag, getTagsByDocumentId, updateTag} from "../core/tag.js";

//Aufgabe 3
async function TagsRoutes(fastify) {
    fastify.get('/', {
        schema: getTagsSchema,
        preHandler: roleCheck(2)
    }, async (request, reply) => {
        const filters = request.query;
        const tags = getAllTags(fastify, filters);
        if (!tags) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return tags;
    });

    fastify.get('/:id', {
        schema: getTagSchema,
        preHandler: roleCheck(2)
    }, async (request, reply) => {
        const tag = getTag(fastify, request.params.id);
        console.log(tag);
        if (!tag) {
            reply.code(404);
            return {error: "Tag not found"};
        }
        return {tag};
    });

    fastify.get('/documentid/:documentId', {
        schema: getTagsSchema,
        preHandler: roleCheck(2)
    }, async (request, reply) => {
        const tags = getTagsByDocumentId(fastify, request.params.documentId);
        if (!tags) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return tags;
    });

    fastify.post('/', {
        schema: createTagSchema,
        preHandler: roleCheck(1)
    }, async (request, reply) => {
        const tagProps = request.body;
        const newTag = createTag(fastify, tagProps);
        if (!newTag) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        reply.code(201);
        return {newTag};
    });

    fastify.put('/:id', {
        schema: updateTagSchema,
        preHandler: roleCheck(2)
    }, async (request, reply) => {
        const tagProps = request.body;
        const updatedTag = updateTag(fastify, request.params.id, tagProps);
        if (!updatedTag) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return {updatedTag};
    });

    fastify.delete('/:id', {
        schema: deleteTagSchema,
        preHandler: roleCheck(1)
    }, async (request, reply) => {
        const tag = getTag(fastify, request.params.id);
        if (!tag) {
            reply.code(404);
            return {error: "Tag not found"};
        }
        deleteTag(fastify, request.params.id);
        return {message: 'Tag deleted'};
    });
}

export {TagsRoutes};