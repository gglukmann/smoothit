const { getNextSequenceValue } = require('../utils/utils');

function add(a, b) {
    console.log(a.totalPriceEur,b.totalPriceEur);
    return a.totalPriceEur + b.totalPriceEur;
}

module.exports = function(app, db) {
    const findOne = function(req, res) {
        const details = { id: parseInt(req.params.id) };
        db.collection('shoppingLists').findOne(details, (err, item) => {
            res.send(item);
        });
    };

    const create = function(req, res) {
        const { servings, components } = req.body;

        if (!servings || servings === '0')
            return res
                .status(500)
                .send({ error: 'Servings were not provided' });
        if (!components || !components.length === 0)
            return res
                .status(500)
                .send({ error: 'Components were not provided' });

        db.collection('components')
            .find({})
            .toArray(function(err, result) {
                if (err) throw err;

                let shoppingListComponents = [];

                result.forEach(item => {
                    components.forEach(component => {
                        if (item.name === component.name)
                            return shoppingListComponents.push({
                                name: item.name,
                                brand: item.brand,
                                packages: component.quantity,
                                packagePriceEur: item.unitPriceEur,
                                salesUnit: item.unit,
                                totalPriceEur: component.quantity * item.unitPriceEur,
                            });
                    });
                });

                getNextSequenceValue('shoppingListId', db, id => {
                    let totalEur = 0;

                    shoppingListComponents.forEach(comp => {
                        totalEur += comp.totalPriceEur;
                    });
                    
                    let shoppingList = {
                        id,
                        totalEur: totalEur * servings,
                        items: shoppingListComponents,
                    };

                    db.collection('shoppingLists').insert(
                        shoppingList,
                        (err, sss) => {
                            const id = sss.ops[0].id;
                            console.log(id);
                            res.send({ id });
                        },
                    );
                });
            });
    };

    app.get('/shoppingList/:id', (req, res) => findOne(req, res));
    app.post('/order', (req, res) => create(req, res));
};
