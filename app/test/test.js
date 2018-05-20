// pseudocoded 


// think we need to do module.exports = name at bottom for the file we are pointing to as first var (in this case suitcase-api-routes), instead of module.exports function declaration in that file as it currently is for test file of interset 
// thats how it is for in class examples at least ...
var suitecaseroutes = require("../routes/suitcase-api-routes");
var expect = require("chai").expect;

// as a reference
// https://stackoverflow.com/questions/48967567/how-to-write-unit-tests-for-sequelize-models-with-chai?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
// http://stackabuse.com/testing-node-js-code-with-mocha-and-chai/
describe('some test block', function () {
    it('should do something,'function (done) {
        dbSuitcase.findAll().then(function (users) {
            // expect users to do something
            done(); // tests are done
        });
    });
});

//   c+p'd from stackoverflow we need to change things aside from dbUser.id that Ive input 
it(`should update the ${model.modelName} entry in the database`, function () {
    model.create(modelData).then(function (user) {
        //after user is created, then update a value
        modelData.guest_count = 12

        model.update(modelData, {
            where: {
                id: dbUser.id
            }
        }).then(function (data) {
            model.findOne({
                where: {
                    id: dbUser.id
                }
            }).then(function (data) {
                expect(data.guest_count).to.equal(12);
            }).then(function () {
                model.destroy({
                    where: {
                        id: dbUser.id
                    }
                }).then(function () {
                    done()
                })
            })
        })
    })
});