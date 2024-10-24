StakeX Project
StakeX is a decentralized staking platform that allows users to earn rewards by staking their tokens. The platform includes a Faucet component that allows users to request a limited number of tokens after a cooldown period. The platform is built using the Ethereum blockchain, Ethers.js, and Next.js for the front-end interface. This document will guide you through the key features and functionality of the project.

Features
Token Faucet: Users can request StakeX tokens from the Faucet after a cooldown period.
Cooldown Timer: Tracks and displays the time remaining before a user can request tokens again.
Token Balance Display: Displays the balance of the token available in the Faucet for distribution.
MetaMask Integration: Allows users to add the StakeX token to their MetaMask wallet.
Technologies Used
Next.js: Frontend framework.
Ethers.js: Ethereum JavaScript library for blockchain interaction.
React.js: Library for building the user interface.
TypeScript: Used to add static type definitions.
Tailwind CSS: For styling the components.
React-hot-toast: For showing notifications.
Installation
To get started with the project, follow these steps:

1. Clone the repository
   bash
   Copy code
   git clone https://github.com/your-username/stakex.git
2. Install dependencies
   Navigate to the project directory and install all required dependencies:

bash
Copy code
cd stakex
npm install 3. Set up environment variables
Create a .env file in the root directory and add the following environment variables:

makefile
Copy code
NEXT_PUBLIC_INFURA_API_KEY=<Your_Infura_API_Key>
NEXT_PUBLIC_FAUCET_CONTRACT_ADDRESS=<StakeX_Faucet_Contract_Address>
NEXT_PUBLIC_STAKE_X_TOKEN_ADDRESS=<StakeX_Token_Contract_Address> 4. Start the development server
bash
Copy code
npm run dev 5. Deploying to Production
For deployment, follow Next.js deployment practices. You can deploy the app using platforms like Vercel, Netlify, or AWS.

Usage
Connect Wallet: To interact with the platform, connect your Ethereum wallet (MetaMask).
Request Faucet Tokens: Users can click the "Request Faucet Tokens" button to request StakeX tokens.
The user must wait for the cooldown period to end before they can make another request.
View Cooldown Time: The platform automatically calculates and displays the remaining cooldown time in a user-friendly format.
Add StakeX Token to MetaMask: After requesting tokens, users can add the token directly to MetaMask for easy tracking of their balances.
Components Overview

1. FaucetComponent
   The FaucetComponent is responsible for the following functionalities:

Checking the balance of the Faucet contract.
Managing the cooldown timer.
Handling user requests for tokens.
Adding the StakeX token to MetaMask. 2. Web3Context
Web3Context provides the context for connecting with Ethereum-based wallets (e.g., MetaMask) and interacting with smart contracts using Ethers.js.

3. Cooldown Timer
   The cooldown timer is implemented using setInterval in the useEffect hook. It updates the remaining cooldown time every second, allowing users to see real-time countdowns before they can request tokens again.

Contract Integration
StakeFaucet Contract
Methods:
requestTokens(address): Allows users to request tokens.
lastRequestTime(address): Returns the last time the user requested tokens.
cooldownTime(): Returns the cooldown period.
StakingXToken Contract
Methods:
balanceOf(address): Returns the balance of the given address.
Sample Faucet Request Workflow
User connects their wallet.
User requests tokens.
The system checks the cooldown period and the faucet balance.
If the cooldown period has passed and the faucet has tokens, the request is processed.
Tokens are transferred, and the cooldown time is reset.
Screenshots
Faucet Balance Display Cooldown Timer Display
Contributing
We welcome contributions from the community. Feel free to fork the repository and submit a pull request or report any issues.

License
This project is licensed under the MIT License.
