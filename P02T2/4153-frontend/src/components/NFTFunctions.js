
import react from "react";
import { useState } from "react";
import Web3 from 'web3';

let provider = window.ethereum;
const web3 = new Web3(provider);
let selectedAccount;

// ABIs
const KNC_NFT_ABI = require('../ABI/KNC_NFT.json').output.abi;
const NFT_Token_ABI = require('../ABI/NFT_Token.json').output.abi;
// Address
const NFT_Token_Address = "0x60bD8916e4B903Edbe481C0cef408CaE8342a12f";
// const KNC_NFT_Address = "0x4D0603f1BFc489c4C9f18E10d6B2EE1e30C9E59A";
const KNC_NFT_Address = "0x436354F58be66BaB9f67C93330AcD2FD5c891D5d";


function NFTFunctions(){
    // tier1 2 3 or tier0 1 2
    const [account, setAccount] = useState("");
    const [tier,setTier] = useState(0);
    const [rewardToken, setRewardToken] = useState(0);

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
                console.log(`selected account changed to ${selectedAccount}`);
                setAccount(selectedAccount);
                console.log(`selected account changed to ${selectedAccount}`);
            })
        }
    }

    const updateBalance = async () => {
        const NFT_Token_Contract = new web3.eth.Contract(NFT_Token_ABI, NFT_Token_Address);
        NFT_Token_Contract.methods.balanceOf(selectedAccount).call().then(tokenBalance => {console.log(tokenBalance);setRewardToken(tokenBalance)});
    }

    const approveNFTContractToTakeNFTToken = () => {
        // approve nft contract to take my NFTreward token
        const NFT_Token_Contract = new web3.eth.Contract(NFT_Token_ABI, NFT_Token_Address);
        provider.request({
            method: 'eth_sendTransaction',
            params:[
                {
                    from: selectedAccount,
                    to: NFT_Token_Address,
                    data: NFT_Token_Contract.methods.approve(KNC_NFT_Address, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").encodeABI(),
                }
            ]
        })
    }
    const Mint = (tier) => {
        const KNC_NFT_Contract = new web3.eth.Contract(KNC_NFT_ABI, KNC_NFT_Address);
        provider.request({
            method: 'eth_sendTransaction',
            params:[
                {
                    from: selectedAccount, // accounts[0],
                    to: KNC_NFT_Address,
                    // value : 
                    // gasPrice :
                    // gas:
                    data: KNC_NFT_Contract.methods.buyNFT(tier).encodeABI()
                }
            ]
        })
    }
    return (
        <>  
            <div>
                <img src='https://gateway.pinata.cloud/ipfs/QmUHzKLtAJHWZU1zh9EQEyvqhyQB75KBk5R6d59kL8ir3H' width="280" height="400" alt="robot1"/>
                <img src='https://gateway.pinata.cloud/ipfs/QmZXwoQrQsPG8Jd27UsSas3SNxkcxhUEMhADuDK6mkSJ3T' width="280" height="400" alt="robot2"/>
                <img src='https://gateway.pinata.cloud/ipfs/QmPVQ6krwe3VWEGrFiJAx7nsdJxeTDdTyaEPeXjnEj556Q' width="280" height="400" alt="robot3"/>
            </div>

            <div>
                <button onClick={()=>{LoadMetamask();}}> Connect to MetaMask button </button>
                <text> {account ? "address: " + account : "not logged in "} </text>
            </div>

            <div>
                <button onClick={updateBalance}> check NFTToken balance </button>
                <text> { rewardToken/1e18 + " NFT Token"}</text>
            </div>

            <div>
                <button onClick={()=> approveNFTContractToTakeNFTToken() }> approve </button>
            </div>
            <div>
                <input placeholder="input 1/2/3"  type="number" onChange={(e) => {setTier(e.target.value); console.log(e.target.value, tier)}}/>
                <button onClick={()=>Mint(tier)}> Mint tier {tier} NFT </button>
            </div>
        </>
        )
}

export default NFTFunctions