/* eslint func-names: 0 */
import { expect } from 'chai';
import mail from '../src/mail';


describe('mail.folders', () => {
  it('should return an array', () => {
    expect(mail.folders).to.be.an('object');
  });
});
