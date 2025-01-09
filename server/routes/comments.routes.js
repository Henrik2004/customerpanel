import {
    commentSchema,
    createCommentSchema, deleteCommentSchema,
    getAllCommentsSchema,
    getCommentSchema,
    updateCommentSchema
} from "../schemas/comment.schema.js";

import {createComment, deleteComment, getAllComments, getComment, updateComment} from "../core/comment.js";

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
    fastify.get('/', getAllCommentsSchema, async (request, reply) => {
        const comments = getAllComments(fastify);
        if (!comments) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return comments;
    });

    fastify.get('/:id', getCommentSchema, async (request, reply) => {
        const comment = getComment(fastify, request.params.id);
        if (!comment) {
            reply.code(404);
            return {error: "Comment not found"};
        }
        return { comment };
    });

    fastify.post('/', createCommentSchema, async (request, reply) => {
        const commentProps = request.body;
        const newComment = createComment(fastify, commentProps);
        if (!newComment) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        reply.code(201);
        return { comment: newComment };
    });

    fastify.put('/:id', updateCommentSchema, async (request, reply) => {
        const commentProps = request.body;
        const updatedComment = updateComment(fastify, request.params.id, commentProps);
        if (!updatedComment) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return { comment: updatedComment };
    });

    fastify.delete('/:id', deleteCommentSchema, async (request, reply) => {
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
