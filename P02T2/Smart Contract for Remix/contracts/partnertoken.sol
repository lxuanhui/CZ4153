pragma solidity ^0.8.0;

//import "./utils/SafeERC20.sol";
import  "./openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./openzeppelin/contracts/token/ERC20/ERC20.sol";


contract partnertoken is ERC20{
    using SafeERC20 for ERC20;
    
    constructor(uint256 initialSupply) ERC20("Axie Token Test", "AXSTest") public {
        _mint(msg.sender, initialSupply);
    }
}