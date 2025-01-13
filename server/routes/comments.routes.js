import {
    commentSchema,
    createCommentSchema, deleteCommentSchema,
    getAllCommentsSchema,
    getCommentSchema,
    updateCommentSchema
} from "../schemas/comment.schema.js";

import {
    createComment,
    deleteComment,
    getAllComments,
    getComment,
    getCommentsByOffer,
    updateComment
} from "../core/comment.js";
import {roleCheck} from "../middleware/roleCheck.js";
import {getOffer} from "../core/offer.js";

/**
 * Comments routes
 * GET all comments
 * GET comment by id
 * POST create comment
 * PUT update comment
 * DELETE comment by id
 * @param fastify - the fastify instance
 * @returns {Promise<void>} - the promise
 * @constructor
 */
async function CommentsRoutes(fastify) {
    fastify.get('/', {
        schema: getAllCommentsSchema,
        preHandler: roleCheck(3)
    }, async (request, reply) => {
        const comments = getAllComments(fastify);
        if (!comments) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return comments;
    });

    fastify.get('/:id', {
        schema: getCommentSchema,
        preHandler: roleCheck(3)
    }, async (request, reply) => {
        const comment = getComment(fastify, request.params.id);
        if (!comment) {
            reply.code(404);
            return {error: "Comment not found"};
        }
        return { comment };
    });

    fastify.get('/offerId/:id', {
        schema: getAllCommentsSchema,
        preHandler: roleCheck(3)
    }, async (request, reply) => {
        const comments = getCommentsByOffer(fastify, request.params.id);
        if (!comments) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return comments;
    });

    fastify.post('/', {
        schema: createCommentSchema,
        preHandler: roleCheck(2)
    }, async (request, reply) => {
        const commentProps = request.body;
        const offer = getOffer(fastify, commentProps.offerId);
        if (!offer) {
            reply.code(404);
            return {error: "Offer not found"};
        }

        const newComment = createComment(fastify, commentProps);
        if (!newComment) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        reply.code(201);
        return { comment: newComment };
    });

    fastify.put('/:id', {
        schema: updateCommentSchema,
        preHandler: roleCheck(2)
    }, async (request, reply) => {
        const commentProps = request.body;
        const updatedComment = updateComment(fastify, request.params.id, commentProps);
        if (!updatedComment) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return { comment: updatedComment };
    });

    fastify.delete('/:id', {
        schema: deleteCommentSchema,
        preHandler: roleCheck(2)
    }, async (request, reply) => {
        const comment = getComment(fastify, request.params.id);
        if (!comment) {
            reply.code(404);
            return {error: "Comment not found"};
        }
        deleteComment(fastify, request.params.id);
        return {message: "Comment deleted"};
    });
}

export default CommentsRoutes;
