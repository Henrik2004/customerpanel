import fp from "fastify-plugin";
import Database from "better-sqlite3";
import tables from "./tables.js";

const filePath = "./database/customerpanel.db";

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