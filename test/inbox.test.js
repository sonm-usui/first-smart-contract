const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hi there!';

beforeEach(async () => {
 //Get list of all the accounts
 accounts = await web3.eth.getAccounts();
 //Use one of the account to deploy app
 //the contract

   inbox = await new web3.eth.Contract(JSON.parse(interface))
   .deploy({
        data: bytecode,
        arguments: [INITIAL_MESSAGE]
    }).send({from: accounts[0], gas:'3000000'})
})

describe('Inbox', () => {
    it('deployed a contract', () => {
        assert.ok(inbox.options.address);
    })

    it('call a initial', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    })

    it('call a change message', async () => {
       const m = await inbox.methods.setMessage('hello').send({from: accounts[0], gas: '3000000'});
       console.log(m);
       const message = await inbox.methods.message().call();
       console.log(message);

    })
})
