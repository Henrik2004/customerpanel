import {createOffer} from "./offer.js";
import {getUserByName} from "./user.js";

/**
 * Add legacy data to the offers
 * @param fastify - the fastify instance
 * @param data - the legacy data
 * @returns {*|null|{error: string}} - the result or an error
 */
export function addLegacyData(fastify, data) {
    const user = getUserByName(fastify, data.xCreatedBy);
    if (!user) {
        fastify.log.error('Could not find user');
        return {error: "User not found"};
    }
    const offer = {
        customerId: data.xOffer.customerId,
        title: data.xOffer.name,
        description: 'Legacy Data from: ' + data.xCreatedOn + ' - hints: ' + data.xOffer.hints.join(", "),
        price: data.xOffer.price,
        status: data.xOffer.state.toLowerCase(),
        createdBy: user.id,
        updatedBy: user.id
    }
    return createOffer(fastify, offer);
}