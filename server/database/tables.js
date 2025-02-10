const tables = (db) => {
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
        createdBy INTEGER,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedBy INTEGER)`).run();

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
        createdBy INTEGER,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedBy INTEGER)`).run();

    db.prepare(`CREATE TRIGGER IF NOT EXISTS update_timestamp_offer
        AFTER UPDATE ON offers
        FOR EACH ROW
        BEGIN
            UPDATE offers SET updatedAt = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END;`).run();

    db.prepare(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT,
        password TEXT,
        role INTEGER,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        createdBy INTEGER,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedBy INTEGER)`).run();

    db.prepare(`CREATE TRIGGER IF NOT EXISTS update_timestamp_user
        AFTER UPDATE ON users
        FOR EACH ROW
        BEGIN
            UPDATE users SET updatedAt = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END;`).run();

    db.prepare(`CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY,
        name TEXT,
        canEdit BOOLEAN,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        createdBy INTEGER,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedBy INTEGER)`).run();

    db.prepare(`CREATE TRIGGER IF NOT EXISTS update_timestamp_role
        AFTER UPDATE ON roles
        FOR EACH ROW
        BEGIN
            UPDATE roles SET updatedAt = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END;`).run();

    db.prepare(`CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY,
        user INTEGER,
        text TEXT,
        offerId INTEGER,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        createdBy INTEGER,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedBy INTEGER)`).run();

    db.prepare(`CREATE TRIGGER IF NOT EXISTS update_timestamp_comment
        AFTER UPDATE ON comments
        FOR EACH ROW
        BEGIN
            UPDATE comments SET updatedAt = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END;`).run();

    db.prepare(`CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY,
        name TEXT,
        documentPath TEXT,
        offerId INTEGER,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        createdBy INTEGER,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedBy INTEGER)`).run();

    db.prepare(`CREATE TRIGGER IF NOT EXISTS update_timestamp_document
        AFTER UPDATE ON documents
        FOR EACH ROW
        BEGIN
            UPDATE documents SET updatedAt = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END;`).run();

    //Aufgabe 3
    db.prepare(`CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY,
        documentId INTEGER,
        name TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        createdBy INTEGER,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedBy INTEGER)`).run();

    db.prepare(`CREATE TRIGGER IF NOT EXISTS update_timestamp_tag
        AFTER UPDATE ON tags
        FOR EACH ROW
        BEGIN
            UPDATE tags SET updatedAt = CURRENT_TIMESTAMP WHERE id = OLD.id;
        END;`).run();

    //Aufgabe 3
    db.prepare(`CREATE TABLE IF NOT EXISTS lro (
        id INTEGER PRIMARY KEY,
        status TEXT,
        payload TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        createdBy INTEGER)`).run();
}

export default tables;