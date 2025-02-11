import tables from "../database/tables.js";

function coordinateSettings(action, data, fastify) {
    switch (action) {
        case 'recreateTables':
            return handleRecreateTables(data, fastify);

    }
}

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