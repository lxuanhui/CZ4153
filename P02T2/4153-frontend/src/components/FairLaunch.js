import react from "react";
import { useState } from "react";
import Web3 from 'web3';

// ABIs
const NFT_Token_ABI = require('../ABI/NFT_Token.json').output.abi;
const ERC20_ABI = require("../ABI/Partner_Token.json").output.abi;
const KyberFairLaunch_ABI = require('../ABI/KyberFairLaunch.json').output.abi;
const KyberLocker_ABI = require('../ABI/KyberRewardLocker.json').output.abi;

// Address
const KyberToken_address = "0x115c3fbee5b45c806e048c183daf65ee4b320e50";
const PartnerToken_address = "0xb9A31Ff60EfB7A8C82A1DFa77035dB053176812e";
const NFT_Token_Address = "0x60bD8916e4B903Edbe481C0cef408CaE8342a12f";
const KyberFairLaunch_address = "0xc915ad0A0feeE862C723E859eB78fC153E0A1C17";
const KyberLocker_address = "0xBaD1497E9ceC43309d2960b4C793610D8baF1ce6";

//
let provider = window.ethereum;
const web3 = new Web3(provider);
let selectedAccount;


// MasterChef
function approveMasterChef(){
    // approve nft contract to take my NFTreward token
    const PartnerToken_Contract = new web3.eth.Contract(ERC20_ABI, PartnerToken_address);
    
    provider.request({
        method: 'eth_sendTransaction',
        params:[
            {
                from: selectedAccount,
                to: PartnerToken_address,
                data: PartnerToken_Contract.methods.approve(KyberFairLaunch_address, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").encodeABI(),
            }
        ]
    })
}

function withdrawAll(){
    //function withdrawAll(uint256 _pid)
    const KyberFairLaunch_Contract = new web3.eth.Contract(KyberFairLaunch_ABI, KyberFairLaunch_address);

    provider.request({
        method: 'eth_sendTransaction',
        params:[
            {
                from: selectedAccount, // accounts[0],
                to: KyberFairLaunch_address,
                // value : 
                // gasPrice :
                // gas:
                data: KyberFairLaunch_Contract.methods.withdrawAll(0).encodeABI()
            }
        ]
    })
}

function withdrawRewardsFromLocker(){
    const KyberLocker_Contract = new web3.eth.Contract(KyberLocker_ABI, KyberLocker_address);

    const tokenAddrArray = [KyberToken_address, NFT_Token_Address];
    provider.request({
        method: 'eth_sendTransaction',
        params:[
            {
                from: selectedAccount, // accounts[0],
                to: KyberLocker_address,
                // value : 
                // gasPrice :
                // gas:
                data: KyberLocker_Contract.methods.vestCompletedSchedulesForMultipleTokens(tokenAddrArray).encodeABI()
            }
        ]
    })
}
function FairLaunch(){
    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState(0);

    const LoadMetamask = () => {
        if (typeof provider !== "undefined"){
            provider.request({method:'eth_requestAccounts'})
            .then(accounts =>{
                selectedAccount = accounts[0];
                console.log(`Selected account: ${selectedAccount}`);
                setAccount(selectedAccount);

            })
            .catch(err => console.log);
    
            provider.on('accountsChanged', function(accounts){
                selectedAccount = accounts[0];
                setAccount(selectedAccount);
                console.log(`selected account changed to ${selectedAccount}`);
            })
        }
    };
    const deposit = async () => {
        // function deposit(uint256 _pid,uint256 _amount,bool _shouldHarvest)
        const KyberFairLaunch_Contract = new web3.eth.Contract(KyberFairLaunch_ABI, KyberFairLaunch_address);
        const PartnerToken_Contract = new web3.eth.Contract(ERC20_ABI, PartnerToken_address);
        const balanceOfDepositToken = await PartnerToken_Contract.methods.balanceOf(selectedAccount).call();
        console.log(balanceOfDepositToken)
        provider.request({
            method: 'eth_sendTransaction',
            params:[
                {
                    from: selectedAccount, // accounts[0],
                    to: KyberFairLaunch_address,
                    // value : 
                    // gasPrice :
                    // gas:
                    data: KyberFairLaunch_Contract.methods.deposit(0, balanceOfDepositToken, false).encodeABI()
                }
            ]
        })
        // const PartnerToken_Contract = new web3.eth.Contract(ERC20_ABI, PartnerToken_address);
        PartnerToken_Contract.methods.balanceOf(selectedAccount).call().then(tokenBalance => {console.log(tokenBalance);setBalance(tokenBalance)});

    }

    const updateBalance = async() => {
        // get partner token
        const PartnerToken_Contract = new web3.eth.Contract(ERC20_ABI, PartnerToken_address);
        PartnerToken_Contract.methods.balanceOf(selectedAccount).call().then(tokenBalance => {console.log(tokenBalance);setBalance(tokenBalance)});
    }

    return (
        <div> 
            
            <div>
                <button onClick={()=>{LoadMetamask();}}> Connect to MetaMask button </button>
                <text> {account ? "address: " + account : "not logged in "} </text>
            </div>

            <div><p></p></div>

            <div>
                <button onClick={updateBalance}> check PartnerToken balance </button>
                <text> { balance/1e18 + " AXS Token (AXS Test)"}</text>
            </div>

            <div>
                <button onClick={()=> approveMasterChef()}> approve FairLaunch to take PartnerToken </button>
            </div>

            <div>
                <button onClick={()=> deposit()}> deposit to fairlaunch </button>
            </div>
            <div>
                <button onClick={()=> withdrawAll()}> Withdraw all from fairlaunch </button>
                <button onClick={()=> withdrawRewardsFromLocker()}> Withdraw rewards from KyberLocker </button>
            </div>
        </div>
    )
}

export default FairLaunch