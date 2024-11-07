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
        company TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        createdBy TEXT,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedBy TEXT)`).run();

    db.prepare(`CREATE TRIGGER IF NOT EXISTS update_timestamp_customer
        AFTER UPDATE ON customers
        FOR EACH ROW
        BEGIN
            UPDATE customers SET updatedAt = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END;`).run();

    db.prepare(`CREATE TABLE IF NOT EXISTS offers (
        id INTEGER PRIMARY KEY,
        customerId INTEGER,
        title TEXT,
        description TEXT,
        price REAL,
        status TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        createdBy TEXT,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedBy TEXT)`).run();

    db.prepare(`CREATE TRIGGER IF NOT EXISTS update_timestamp_offer
        AFTER UPDATE ON offers
        FOR EACH ROW
        BEGIN
            UPDATE offers SET updatedAt = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END;`).run();
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