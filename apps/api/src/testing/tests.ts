import * as chai from 'chai';
import { init } from "../bin/www";

chai.should();

before(async function () {
  await init();
});
