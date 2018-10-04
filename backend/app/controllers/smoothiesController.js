const { getNextSequenceValue } = require('../utils/utils');

module.exports = function(app, db) {

    const findAll = function(req, res) {
        db.collection("smoothies").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send({content: result});
        });
    }

    const findOne = function(req, res) {
        const details = { id: parseInt(req.params.id) };
        console.log(details);
        db.collection('smoothies').findOne(details, (err, item) => {
            res.send({content: [item]});
        });
    }

    const create = function(req, res) {
        const { name, description, instructions, components } = req.body;

        getNextSequenceValue('smoothieid', db, id => {
            const smoothie = {
                id,
                name,
                description,
                instructions,
                components,
            };
            db.collection('smoothies').insert(smoothie, (err, results) => {
                res.send(results.ops[0]);
            });
        });
    }

    const update = function(req, res) {
        const { id, name, description, instructions, components } = req.body;

        const smoothie = {
            id,
            name,
            description,
            instructions,
            components,
        };
        db.collection('smoothies').update({ id: smoothie.id }, smoothie, (err, results) => {
            res.send(smoothie);
        });
    }


    app.get('/smoothies', (req, res) => findAll(req, res));
    app.get('/smoothies/:id', (req, res) =>  findOne(req, res));
    app.post('/smoothies', (req, res) => {
        req.body.id ? update(req, res) : create(req, res);
    });
};