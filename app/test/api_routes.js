//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const db = require("../models/");
// var db = require("../models");
// let locale = require("../routes/locale-api-routes");
// let suitcase = require("../routes/suitcase-api-routes");
// let user = require("../routes/user-api-routes");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let { app, seq } = require('../../server');
let should = chai.should();

const new_record = {
    item_name: 'Toothbrush',
    item_category: 'toiletries'
}

chai.use(chaiHttp);
//Our parent block
// test module name

describe('Test route functionality', () => {
    before((done) => { //Before each test we empty the database
        seq.then(() => {
            db.Item.destroy({
                where: {}
            })
                .then((err) => {
                    return done();
                });
        })
    });
    // test suite
    describe('/POST item', () => {
        // individual test
        it('should create a new item', (done) => {
            chai.request(app)
                .post('/api/items')
                .send(new_record)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    //   res.body.item_name.should.not.be(null);
                    res.body.item_name.should.equal(new_record.item_name);
                    done();
                });
        });

        it('should not create the same item', (done) => {
            chai.request(app)
                .post('/api/items')
                .send(new_record)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.message.should.equal('Item already exists.');
                    res.body.item.item_name.should.equal(new_record.item_name);
                    done();
                });
        });
    });
});





