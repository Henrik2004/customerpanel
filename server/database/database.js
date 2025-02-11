import fp from "fastify-plugin";
import Database from "better-sqlite3";
import tables from "./tables.js";

const filePath = "./database/customerpanel.db";

/**
 * Connect to the database
 * @param fastify - Fastify instance
 * @param options - options object
 * @param done - callback function
 */
function connectDatabase(fastify, options, done) {
    const db = new Database(filePath);

    tables(db);

    fastify.decorate("db", db);

    fastify.addHook("onClose", (instance, done) => {
        db.close();
        done();
    });

    done();
}

export default fp(connectDatabase);