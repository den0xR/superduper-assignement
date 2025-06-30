import superTest from 'supertest';

describe('Resource ** chains **', function () {
    describe('GET /chains', function () {
        it("should return chains", async function () {
            const res = await superTest("http://localhost:3000/api")
                .get("/chains");

            res.status.should.be.equal(200);
            res.body.should.be.an("array");
            res.body.should.have.lengthOf(3);
            res.body.length.should.be.above(0);

            res.body.forEach(chain => {
                chain.should.have.property('name').which.is.a('string');
                chain.should.have.property('chain').which.is.a('string');
                chain.should.have.property('rpc').which.is.an('array');
                chain.should.have.property('nativeCurrency').which.is.an('object');
                chain.nativeCurrency.should.have.property('symbol').which.is.a('string');
            });
        });
    });
});
