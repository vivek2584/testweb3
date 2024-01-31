const ToDo = artifacts.require("ToDo");
const fs = require('fs');

module.exports = async function (deployer) {
  try {
    const deployedContract = await deployer.deploy(ToDo);
    
    fs.writeFileSync('contract-address.json', JSON.stringify({ address: deployedContract.address }));
    
    console.log('Contract deployed successfully. Address:', deployedContract.address);
  } catch (error) {
    console.error('Error deploying contract:', error);
  }
};