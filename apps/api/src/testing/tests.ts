import * as chai from 'chai';
import { init } from "../bin/www";

import "../features/balances/tests/balances-api.spec";
import "../features/chains/tests/chains-api.spec";

chai.should();

before(async function () {
  await init();
});
