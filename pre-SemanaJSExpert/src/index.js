//const EntityBase = require('./entityBase');

// console.log(new EntityBase({
//     name: 'Matheus Gonçalves',
//     gender: "male",
// }).name)

// console.log(new EntityBase({
//     name: 'Lola Maria',
//     gender: "female",
// }).name)

const assert = require('assert');
const Employe = require('./employee');
const { formatCurrency } = require('./util');
const Util = require('./util');

const GENDER = {
    male: 'male',
    female: 'female'
}


{
    const employee = new Employe({
        name: 'Lola Maria',
        gender: GENDER.female

    })

    assert.throws(() => employee.birthYear, { message: 'You must define age first!!!' })

}

const CURRENT_YEAR = 2021;
Date.prototype.getFullYear = () => CURRENT_YEAR;

{
    const employee = new Employe({
        name: 'Matheus',
        age: 20,
        gender: GENDER.male
    });

    assert.deepStrictEqual(employee.name, "Mr. Matheus");
    assert.deepStrictEqual(employee.age, undefined);
    assert.deepStrictEqual(employee.gender, undefined);
    assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.40));
    assert.deepStrictEqual(employee.netPay, Util.formatCurrency(4000.32))

    const expectedBirthYear = 2001;
    assert.deepStrictEqual(employee.birthYear, expectedBirthYear);

    //não tem set, não vai mudar!!
    employee.birthYear = new Date().getFullYear() - 80;
    assert.deepStrictEqual(employee.birthYear, expectedBirthYear);

    employee.age = 80;
    assert.deepStrictEqual(employee.birthYear, 1941);
}