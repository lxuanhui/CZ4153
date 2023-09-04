pragma solidity ^0.8.0;

import {ERC20} from './openzeppelin/contracts/token/ERC20/ERC20.sol';

contract kncxtoken is ERC20{
    constructor(uint256 initialSupply) ERC20("NFT Exchange Token Test", "NFTToken") public {
        _mint(msg.sender, initialSupply);
    }
}