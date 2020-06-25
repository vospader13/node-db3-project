const db = require("../data/config")

function find(){
    return db('schemes')
        
}

function findById(id){
    return db('schemes')
        .where({id})
        .first();
}

function findSteps(schemeId){
    return db('steps as st')
    .join('scheme as s', 's.id', 'st.scheme_id')
    .select('st.id', 's.text', 's.name as postedBy')
    .where('st.scheme_id', schemeId)
}

function add(scheme){
    return db('schemes')
    .insert(scheme)
    .then(ids => {
        return findById(ids[0]);
    });
}

function update(id, changes){
    return db('schemes')
    .where({id})
    .update(changes)
}

function remove(id){
    return db('schemes')
    .where('id', id)
    .del();
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}