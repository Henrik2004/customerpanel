import tables from "../database/tables.js";

/**
 * Handle the settings
 * @param action - the action to perform
 * @param data - the data for the action
 * @param fastify - the fastify instance
 * @returns {{success: boolean, message: string}} - the result
 */
function coordinateSettings(action, data, fastify) {
    switch (action) {
        case 'recreateTables':
            return handleRecreateTables(data, fastify);

    }
}

/**
 * Recreate the tables
 * @param data - the data for the action
 * @param fastify - the fastify instance
 * @returns {{success: boolean, message: string}} - the result
 */
function handleRecreateTables(data, fastify) {
    //drop all tables and recreate them
    const dropRoles = fastify.db.prepare('DROP TABLE IF EXISTS roles');
    const dropComments = fastify.db.prepare('DROP TABLE IF EXISTS comments');
    const dropDocuments = fastify.db.prepare('DROP TABLE IF EXISTS documents');
    const dropUsers = fastify.db.prepare('DROP TABLE IF EXISTS users');
    const dropCustomers = fastify.db.prepare('DROP TABLE IF EXISTS customers');
    const dropOffers = fastify.db.prepare('DROP TABLE IF EXISTS offers');
    const dropTags = fastify.db.prepare('DROP TABLE IF EXISTS tags');
    const dropLRO = fastify.db.prepare('DROP TABLE IF EXISTS lro');
    dropRoles.run();
    dropComments.run();
    dropDocuments.run();
    dropUsers.run();
    dropCustomers.run();
    dropOffers.run();
    dropTags.run();
    dropLRO.run();

    tables(fastify.db);

    return {success: true, message: 'Tables deleted and recreated successfully'};
}

export {coordinateSettings};