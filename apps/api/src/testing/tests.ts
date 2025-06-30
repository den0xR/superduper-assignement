import * as chai from 'chai';
import { init } from "../bin/www";

import "../features/chains/tests/chains-api.spec";

chai.should();

before(async function () {
  await init();
});
