import { commentSchema } from "../schemas/comment.schema.js";

import {
    createComment,
    deleteComment,
    getAllComments,
    getComment,
    updateComment
} from "../core/comment.js";


async function CommentsRoutes(fastify) {
    fastify.get('/', commentSchema, async (request, reply) => {
        const comments = getAllComments(fastify);
        if (!comments) {
            reply.code(500);
            return { error: "Internal Server Error" };
        }
        return comments;
    });

    fastify.get('/:id', commentSchema, async (request, reply) => {
        const comment = getComment(fastify, request.params.id);
        if (!comment) {
            reply.code(404);
            return { error: "Comment not found" };
        }
        return comment;
    });

    fastify.post('/', commentSchema, async (request, reply) => {
        const commentProps = request.body;
        const newComment = createComment(fastify, commentProps);
        if (!newComment) {
            reply.code(500);
            return { error: "Internal Server Error" };
        }
        reply.code(201);
        return newComment;
    });

    fastify.put('/:id', commentSchema, async (request, reply) => {
        const commentProps = request.body;
        const updatedComment = updateComment(fastify, request.params.id, commentProps);
        if (!updatedComment) {
            reply.code(500);
            return { error: "Internal Server Error" };
        }
        return updatedComment;
    });

    fastify.delete('/:id', commentSchema, async (request, reply) => {
        const comment = getComment(fastify, request.params.id);
        if (!comment) {
            reply.code(404);
            return { error: "Comment not found" };
        }
        deleteComment(fastify, request.params.id);
        return { message: "Comment deleted" };
    });
}

export default CommentsRoutes;
