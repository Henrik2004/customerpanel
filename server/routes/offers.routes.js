import { offerSchema } from "../schemas/offer.schema.js";

import {
    createOffer,
    deleteOffer,
    getAllOffers,
    getOffer,
    updateOffer
} from "../core/offer.js";

async function OffersRoutes(fastify) {
    fastify.get('/', offerSchema, async (request, reply) => {
        const offers = getAllOffers(fastify);
        if (!offers) {
            reply.code(500);
            return { error: "Internal Server Error" };
        }
        return offers;
    });

    fastify.get('/:id', offerSchema, async (request, reply) => {
        const offer = getOffer(fastify, request.params.id);
        if (!offer) {
            reply.code(404);
            return { error: "Offer not found" };
        }
        return offer;
    });

    fastify.post('/', offerSchema, async (request, reply) => {
        const offerProps = request.body;
        const newOffer = createOffer(fastify, offerProps);
        if (!newOffer) {
            reply.code(500);
            return { error: "Internal Server Error" };
        }
        reply.code(201);
        return newOffer;
    });

    fastify.put('/:id', offerSchema, async (request, reply) => {
        const offerProps = request.body;
        const updatedOffer = updateOffer(fastify, request.params.id, offerProps);
        if (!updatedOffer) {
            reply.code(500);
            return { error: "Internal Server Error" };
        }
        return updatedOffer;
    });

    fastify.delete('/:id', offerSchema, async (request, reply) => {
        const offer = getOffer(fastify, request.params.id);
        if (!offer) {
            reply.code(404);
            return { error: "Offer not found" };
        }
        deleteOffer(fastify, request.params.id);
        return { message: "Offer deleted" };
    });
}

export default OffersRoutes;