export function getAllDocuments(fastify){
    const statement = fastify.db.prepare("SELECT * FROM documents");

    try{
        const documents = statement.all();
        return {documents};
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function getDocument(fastify, id)    {
    const statement = fastify.db.prepare("SELECT * FROM documents WHERE id = ?");

    try {
        return statement.get(id);
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export function createDocument(fastify, document) {}