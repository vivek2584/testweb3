const { ethers } = require('ethers');

async function main() {
    if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        const response = await fetch('contract-address.json');
        const contractAddressData = await response.json();
        const { address } = contractAddressData;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contractABI = [
            {
            "constant": false,
                "inputs": [
                    {
                        "name": "_desc",
                        "type": "string"
                    }
                ],
                "name": "addTask",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "markAsFinished",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "getTask",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getAllTasks",
                "outputs": [
                    {
                        "name": "",
                        "type": "string[]"
                    },
                    {
                        "name": "",
                        "type": "uint8[]"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
        ];

        const contract = new ethers.Contract(address, contractABI, signer);

        
        await addTask(contract, accounts[0], "Buy groceries");

        
        await markAsFinished(contract, 0, accounts);

        
        await getAllTasks(contract);

        
        await getTask(contract, 0);
    } else {
        console.error('MetaMask not detected. Please install MetaMask to use this application.');
    }
}

async function addTask(contract, account, _desc) {
    await contract.addTask(_desc, { from: account });
    console.log('Task added successfully.');
}

async function markAsFinished(contract, id, accounts) {
    await contract.markAsFinished(id, { from: accounts[0] });
    console.log('Task marked as finished successfully.');
}

async function getTask(contract, id) {
    const result = await contract.getTask(id);
    console.log(`Task ${id}: ${result[0]}, Status: ${result[1]}`);
}

async function getAllTasks(contract) {
    const result = await contract.getAllTasks();
    console.log('All Tasks:', result);
}

main();
