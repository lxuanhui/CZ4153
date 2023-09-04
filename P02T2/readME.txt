Spare Wallet to use: 
Address: 0x7B86ee786f7BFA86269cFca34bfa49EF21c11128


-- For Smart Contract for Remix --
1) remixd.zip - extract to AppData/npm
2) @remix-project.zip - extract to AppData/npm/node_modules

3) Open command prompt
remixd -s <Abosulte path to folder>
	
— Developer —
1) Compile and deploy our token 'kncx.sol' constructor 1,000,000 * 10e18
2) Compile and deploy 'NFTToken.sol'	constructor 1,000,000 * 10e18
3) Compile and deploy 'KyberRewardLocker.sol'
4) Compile and deploy 'KyberFairLaunch.sol' (Constructor pre requisites Addresses from :  Locker / Admin / RewardToken KNC)
5) Transfer $KNC n $NFTToken from step1 and step2 to KyberFairLaunch contract 
6) Compile and deploy 'partnertoken.sol'
7) Invoke AddPool() method from 'KyberFairLaunch.sol' contract (partnertoken, startblock, endblock, rewardsperblock)
- startblock (find from https://rinkeby.etherscan.io/)
- endblock (to whenever you want to end the pool)
- rewardsperblock (eg ["0x8AC7230489E80000","0x56BC75E2D63100000"] 10 ETH, 100 ETH in hexadecimal
8) Invoke addRewardsContract() from KyberRewardLocker contract 
- token = address of step 1
- rewardContract = address of step 4
9) Invoke addRewardsContract() from KyberRewardLocker contract 
- token = address of step 2
- rewardContract = address of step 4

—For 4153-frontend folder —
Install:
1) Extract folder
2) Go to directory in command prompt and run 'npm install'
3) Enter 'npm start'


1) Connect to MetaMask
2) Approve KyberFairlaunch to take PartnerToken
3) Deposit into FairLaunch 
--- Wait for some time to pass(around 3 mins) to get 1000 NFT tokens ---
4) Withdraw from FairLaunch 
5) Withdraw rewards from KyberLocker
6) Mint NFT here
7) Check NFT Token balance
8) Approve
9) Input 1,2 or 3 and click on button
10) Check for new NFT at https://testnets.opensea.io/


-- For Unit Testing --

To install the required libraries. 
npm install --save-dev 

The contracts have already been built. To clean and re-compile the smart contracts.
npx hardhat clean
npx hardhat compile

The hardhat test js file is in the test folder. Run the following command in the main directory
npx hardhat test

