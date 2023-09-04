pragma solidity ^0.8.0;


import "./openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./openzeppelin/contracts/utils/Counters.sol";

import "./openzeppelin/contracts/access/Ownable.sol";

import "./openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import {SafeMath} from './openzeppelin/contracts/utils/math/SafeMath.sol';
import {SafeERC20} from './openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import {SafeCast} from './openzeppelin/contracts/utils/math/SafeCast.sol';
import {IERC20} from './openzeppelin/contracts/token/ERC20/IERC20.sol';


contract KNCNFT is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;

    Counters.Counter private _tokenIds;

    address rewardToken;
    string robot1uri = 'https://gateway.pinata.cloud/ipfs/QmYTrv19KaXwRjwxTH7Wq3YM8Wp3rnUoEd5HLQHbLJkBBM';
    string robot2uri = 'https://gateway.pinata.cloud/ipfs/QmQ4ystsobR6B6mAZq3RVGnF1m5Z26WJVrpfZnr49ahA1y';
    string robot3uri = 'https://gateway.pinata.cloud/ipfs/QmSxMHQyhskezhi3FHR6ivPDVRafMJ1poJV3o79FzLXdu3';

    event ClaimNFT(
        address indexed user,
        uint64 NFTId
    );

    constructor(address rewardTokenAddress) ERC721("Kyber NFT", "kNFT") {
        rewardToken = rewardTokenAddress;   // nfttoken from KyberRewardLocker
    }


    function mintNFT(address recipient, string memory tokenURI)
        internal
        returns (uint256)
    {

        uint256 newItemId = _tokenIds.current();

        _mint(recipient, newItemId);

        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();

        return newItemId;

    }

    /* currently can buy 3 nft only, 4th nft onwards is free 
    approve this contract to take my NFT token
    */
    function buyNFT(uint8 _tier) external 
    {
        require(_tier >= 1 && _tier < 3,"The tier you have selected is out of range");
        uint256 _amount ;
        string storage uri;
        if(_tier == 1)
        {
            _amount = 1000 * 10 ** 18; // 1000 nfttoken to buy tier1 nft
            uri = robot1uri;
        }else if(_tier == 2)
        {
            _amount = 3000 * 10 ** 18;
            uri = robot2uri;
        }else
        {
            _amount = 10000 * 10 ** 18;
            uri = robot3uri;
        }
        // need to approve rewardToken.approve(kncnft address, amount = uint256.maxint)
        IERC20(rewardToken).safeTransferFrom(msg.sender, address(this), _amount);

        mintNFT(msg.sender, uri);
        //_safeTransfer(address(this),msg.sender,_tier,"");

        //emit ClaimNFT(msg.sender,_tier);
    }

}

