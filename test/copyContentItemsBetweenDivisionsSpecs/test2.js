import { describe, it } from 'mocha';
import chai from 'chai';
import dirtyChai from 'dirty-chai';

const expect = chai.expect;
chai.use(dirtyChai)

describe('unit', () => {
  describe('authentication', () => {
    describe('AuthenticationService', () => {
      describe('test2', () => {
        it('should...', () => {
          const x = 0;
        });
      });
    });
  });
});