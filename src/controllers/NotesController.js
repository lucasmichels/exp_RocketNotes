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
}

module.exports = NotesController;
