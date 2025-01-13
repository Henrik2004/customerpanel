import {
    changeOfferStatusSchema,
    createOfferSchema,
    deleteOfferSchema,
    getAllOffersSchema,
    getOfferSchema,
    updateOfferSchema
} from "../schemas/offer.schema.js";

import {createOffer, deleteOffer, getAllOffers, getOffer, updateOffer, updateOfferStatus} from "../core/offer.js";
import {roleCheck} from "../middleware/roleCheck.js";

/**
 * Offers routes
 * - GET all offers
 * - GET offer by id
 * - POST create offer
 * - PUT update offer
 * - DELETE offer
 * @param fastify - instance of Fastify
 * @returns {Promise<void>} - Offers routes
 * @constructor
 */
async function OffersRoutes(fastify) {
    fastify.get('/', {
        schema: getAllOffersSchema,
        preHandler: roleCheck(3)
    }, async (request, reply) => {
        const offers = getAllOffers(fastify);
        if (!offers) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return offers;
    });

    fastify.get('/:id', {
        schema: getOfferSchema,
        preHandler: roleCheck(3)
    }, async (request, reply) => {
        const offer = getOffer(fastify, request.params.id);
        if (!offer) {
            reply.code(404);
            return {error: "Offer not found"};
        }
        return {offer: offer};
    });

    fastify.post('/', {
        schema: createOfferSchema,
        preHandler: roleCheck(1)
    }, async (request, reply) => {
        const offerProps = request.body;
        const newOffer = createOffer(fastify, offerProps);
        if (!newOffer) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        reply.code(201);
        return {offer: newOffer};
    });

    fastify.put('/:id', {
        schema: updateOfferSchema,
        preHandler: roleCheck(2)
    }, async (request, reply) => {
        const offerProps = request.body;
        const updatedOffer = updateOffer(fastify, request.params.id, offerProps);
        if (!updatedOffer) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return {offer: updatedOffer};
    });

    fastify.delete('/:id', {
        schema: deleteOfferSchema,
        preHandler: roleCheck(1)
    }, async (request, reply) => {
        const offer = getOffer(fastify, request.params.id);
        if (!offer) {
            reply.code(404);
            return {error: "Offer not found"};
        }
        deleteOffer(fastify, request.params.id);
        return {message: "Offer deleted"};
    });

    fastify.patch('/:id/status', {
        schema: changeOfferStatusSchema,
        preHandler: roleCheck(1)
    }, async (request, reply) => {
        const offer = getOffer(fastify, request.params.id);
        if (!offer) {
            reply.code(404);
            return {error: "Offer not found"};
        }
        const updatedOffer = updateOfferStatus(fastify, request.params.id, request.body.status);
        if (!updatedOffer) {
            reply.code(500);
            return {error: "Internal Server Error"};
        }
        return {offer: updatedOffer};
    });
}

export default OffersRoutes;