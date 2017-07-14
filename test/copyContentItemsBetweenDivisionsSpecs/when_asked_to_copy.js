import { describe, it } from 'mocha';
import chai from 'chai';
import dirtyChai from 'dirty-chai';
import mochaAsync from '../helpers/mochaAsync';
import { contentItemCopier } from '../../src/contentItemCopier';

const expect = chai.expect;
chai.use(dirtyChai);

describe('integration', () => {
  describe('authentication', () => {
    describe('AuthenticationService', () => {
      describe('when asked to copy', () => {
        it('should...', mochaAsync(async () => {
          const res = await contentItemCopier();
          expect(res).to.equal('ok');
        }));
      });
    });
  });
});
