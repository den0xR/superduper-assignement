import sinon from 'sinon';
import superTest from 'supertest';
import BalanceService from "../services/balance-service";
import BalanceModel from "../models/balances-model";
import testConfig from "../../../testing/test-config";
const sinonSandbox = sinon.createSandbox();


describe('Resource ** balances **', function () {
    before(function () {
        sinonSandbox.stub(BalanceService, "getContractData").callsFake(() => {
            return {
                balance: "1000000000000000000",
                decimals: 18,
                symbol: "MOCK_TOKEN"
            }
        });
    });

    describe('POST /api/balance', function () {
        it("should return balance", async function () {
            const res = await superTest(testConfig.apiUrl)
                .post("/balance")
                .send({
                    contractAddress: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
                    walletAddress: "0xeF7A1518F6155v381a8d21Ee65d3b9397Eb34be8",
                    chainId: "1"
                });

            res.status.should.be.equal(200);
            res.body.should.be.an("object");
            res.body.should.have.property("balance").which.is.a("string");
            res.body.should.have.property("decimals").which.is.a("string");
            res.body.should.have.property("symbol").which.is.a("string");
        });

        it("should return error if passed invalid chainId", async function () {
            const res = await superTest(testConfig.apiUrl)
                .post("/balance")
                .send({
                    contractAddress: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
                    walletAddress: "0xeF7A1558F63551388f8d21Ee6ad2b1397Eb34be8",
                    chainId: "123456789"
                });

            res.status.should.be.equal(500);
            res.body.should.be.an("object");
            res.body.should.have.property("message").which.is.a("string");
            res.body.message.should.equal("Chain not found");
        });

        afterEach(async function () {
        	await BalanceModel.destroy({ truncate: true, restartIdentity: true, cascade: true });
        });
    });

    after(async function () {
        sinonSandbox.restore();
    });
});
