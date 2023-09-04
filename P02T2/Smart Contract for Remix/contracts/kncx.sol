pragma solidity ^0.8.0;

import "./openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KNC is ERC20{
    constructor(uint256 initialSupply) ERC20("KNC Test", "KNC") public {
        _mint(msg.sender, initialSupply);
    }
}