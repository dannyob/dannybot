/* eslint-env mocha */
import { expect } from 'chai';
import mail from '../src/mail';

describe('mail.folders', () => {
    it('should return an object', () => {
        expect(mail.folders).to.be.an('object');
    });
});

const legit_folder = { 'inbox' : ['threads', 'tag:foo', 'inbox'] };
const not_legit_folder1 = { 'messbox' : ['threads', 'wrongsize'] };
const not_legit_folder2 = { 'messbox' : ['scorcher', 'otherwise', 'okay'] };

describe('mail._private.validate_folders', () => {
    it('should return value on a legit folder structure', () => {
        expect(mail._private.validate_folders(legit_folder)).to.deep.equal(legit_folder);
    });

    it('should throw error with a too short folder structure', () => {
        expect(function () { mail._private.validate_folders(not_legit_folder1); }).to.throw(/three/);
    });

    it('should throw error without a thread/messages field', () => {
        expect(function () { mail._private.validate_folders(not_legit_folder2); }).to.throw(/thread/);
    });
});
