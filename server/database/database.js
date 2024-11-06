import fp from "fastify-plugin";
import Database from "better-sqlite3";

const filePath = "./database/customerpanel.db";

const createTables = (db) => {
    db.prepare(`CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY, 
        name TEXT, 
        email TEXT, 
        phone TEXT,
        address TEXT,
        city TEXT,
        country TEXT,
        zip TEXT,
        company TEXT)`).run();
}

function connectDatabase(fastify, options, done) {
    const db = new Database(filePath);

    createTables(db);

    fastify.decorate("db", db);

    fastify.addHook("onClose", (instance, done) => {
        db.close();
        done();
    });

    done();
}

export default fp(connectDatabase);