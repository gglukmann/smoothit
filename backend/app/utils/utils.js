exports.getNextSequenceValue = function(sequenceName, db, cb) {
    let res = db.collection('counters').findAndModify(
        // find record with name "MyServer"
        { _id: sequenceName },
        // increment it's property called "ran" by 1
        { $inc: { sequence_value: 1 } },
        { $inc: { sequence_value: 1 } },
        { update: true }
    );
    res.then(res => cb(res.value.sequence_value));
}

exports.getComponents = function() {
    return [
        {
          id: 1001,
          name: 'Banaan',
          brand: 'Chiquita',
          kcalPerUnit: 890,
          unit: 'kg',
          unitPriceEur: 1,
          colorHex: '#ffe135',
          file: null,
          amount: null
        },
        {
          id: 1002,
          name: 'GreenPrince',
          brand: 'Öko Toode',
          kcalPerUnit: 400,
          unit: 'kg',
          unitPriceEur: 1,
          colorHex: '#8db600',
          file: null,
          amount: null
        },
        {
          id: 1003,
          name: 'Piim',
          brand: 'Alma',
          kcalPerUnit: 640,
          unit: 'kg',
          unitPriceEur: 1,
          colorHex: '#dcd9cd',
          file: null,
          amount: null
        },
        {
          id: 1005,
          name: 'Mandlipiim',
          brand: 'Alpro',
          kcalPerUnit: 240,
          unit: 'kg',
          unitPriceEur: 2,
          colorHex: '#efdecd',
          file: null,
          amount: null
        },
        {
          id: 1007,
          name: 'Maasikad',
          brand: 'Eesti',
          kcalPerUnit: 330,
          unit: 'kg',
          unitPriceEur: 8,
          colorHex: '#ff43a4',
          file: null,
          amount: null
        },
        {
          id: 1008,
          name: 'Vaarikad',
          brand: 'NoBananas',
          kcalPerUnit: 530,
          unit: 'kg',
          unitPriceEur: 6,
          colorHex: '#b3446c',
          file: null,
          amount: null
        },
        {
          id: 1010,
          name: 'Maitsestamata jogurt',
          brand: 'Alma',
          kcalPerUnit: 590,
          unit: 'kg',
          unitPriceEur: 3,
          colorHex: '#f8f8ff',
          file: null,
          amount: null
        },
        {
          id: 1011,
          name: 'Mango',
          brand: 'Peruu',
          kcalPerUnit: 600,
          unit: 'kg',
          unitPriceEur: 2,
          colorHex: '#dc8700',
          file: null,
          amount: null
        },
        {
          id: 1012,
          name: 'Arbuus',
          brand: 'Arbuusia',
          kcalPerUnit: 300,
          unit: 'kg',
          unitPriceEur: 1,
          colorHex: '#fc6c85',
          file: null,
          amount: null
        },
        {
          id: 1013,
          name: 'Vanilli koorejäätis',
          brand: 'J\ufffd\ufffdts',
          kcalPerUnit: 1900,
          unit: 'kg',
          unitPriceEur: 6,
          colorHex: '#fcf9f0',
          file: null,
          amount: null
        },
        {
          id: 1014,
          name: 'Šokolaadi koorejäätis',
          brand: 'Premia',
          kcalPerUnit: 2680,
          unit: 'kg',
          unitPriceEur: 7,
          colorHex: '#7b3f00',
          file: null,
          amount: null
        },
        {
          id: 1015,
          name: 'Kiivi korvis',
          brand: 'Hispaania',
          kcalPerUnit: 610,
          unit: 'kg',
          unitPriceEur: 2,
          colorHex: '#9dae5c',
          file: null,
          amount: null
        },
        {
          id: 1016,
          name: 'Apelsin Valencia',
          brand: 'Hispaania',
          kcalPerUnit: 470,
          unit: 'kg',
          unitPriceEur: 1,
          colorHex: '#ffa500',
          file: null,
          amount: null
        },
        {
          id: 1017,
          name: 'Õunamahl',
          brand: 'Cappy',
          kcalPerUnit: 450,
          unit: 'kg',
          unitPriceEur: 1,
          colorHex: '#ddad76',
          file: null,
          amount: null
        }
      ];
}