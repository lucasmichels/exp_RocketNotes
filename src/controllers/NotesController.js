const knex = require("../database/knex");

class NotesController {
    async create(request, response) {
        const { title, description, tags, links } = request.body; //desestruturando as info
        const { user_id } = request.params; //pegar user id

        const [note_id] = await knex("notes").insert({
        title,
        description,
        user_id,
        });

        const linksInsert = links.map((link) => {
        //percorrer cada link q tenho
        return {
            note_id,
            url: link,
        };
        });

        await knex("links").insert(linksInsert); //vai inserir os links

        const tagsInsert = tags.map((name) => {
        return {
            note_id,
            name,
            user_id,
        };
        });

        await knex("tags").insert(tagsInsert);

        response.json();
    }

    async show(request, response) {
        const { id } = request.params;

        const note = await knex("notes").where({ id }).first(); //pegando a primeira nota de acordo com o id indicado
        const tags = await knex("tags").where({ note_id: id }).orderBy("name"); // trazendo tags da nota de acordo com id, em ordem alfabetica
        const links = await knex("links")
        .where({ note_id: id })
        .orderBy("created_at"); // trazendo links em ordem de criacao

        return response.json({
        ...note, // despejando todos os detalhes da nota
        tags,
        links,
        });
    }

    async delete(request, response) {
        const { id } = request.params

        await knex("notes").where({ id }).delete();

        return response.json();
    }

    async index(request, response) {
        const { user_id, title, tags } = request.query;

        let notes;

        if(tags) {
            const filterTags = tags.split(',').map(tag => tag.trim());

            notes = await knex("tags")
                .whereIn("name", filterTags)

        } else {
            notes = await knex("notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`) // vai pesquisar por title se tiver a palavra de pesquisa
            .orderBy("title");
        }

        return response.json(notes);
    }
}

module.exports = NotesController;
