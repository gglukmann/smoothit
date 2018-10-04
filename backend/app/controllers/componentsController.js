const { getNextSequenceValue, getComponents } = require('../utils/utils');

module.exports = function(app, db) {

    const findAll = function(req, res) {
        db.collection("components").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send({content: result});
        });
    }

    const findOne = function(req, res) {
        const details = { id: parseInt(req.params.id) };
        console.log(details);
        db.collection('components').findOne(details, (err, item) => {
            res.send({content: [item]});
        });
    }

    const create = function(req, res) {
        const { amount, brand, colorHex, kcalPerUnit, name, unit, unitPriceEur } = req.body;

        getNextSequenceValue('componentid', db, id => {
            const component = {
                id,
                amount,
                brand,
                colorHex,
                kcalPerUnit,
                name,
                unit,
                unitPriceEur,
            };
            db.collection('components').insert(component, (err, results) => {
                res.send({content: results.ops[0]});
            });
        });

        // db.collection('components').insert(getComponents(), (err, results) => {
        //     res.send({content: results.ops[0]});
        // });
    }

    const update = function(req, res) {
        const { id, amount, brand, colorHex, kcalPerUnit, name, unit, unitPriceEur } = req.body;

        const component = {
            id,
            amount,
            brand,
            colorHex,
            kcalPerUnit,
            name,
            unit,
            unitPriceEur,
        };

        db.collection('components').update({ id: component.id }, component, (err, results) => {
            res.send(component);
        });
    }


    app.get('/components', (req, res) => findAll(req, res));
    app.get('/components/:id', (req, res) =>  findOne(req, res));
    app.post('/components', (req, res) => {
        req.body.id ? update(req, res) : create(req, res);
    });
};