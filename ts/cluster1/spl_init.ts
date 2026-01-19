import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import wallet from "./wallet/turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        // Start here
        // const mint = ???

        const mintKeypair = Keypair.generate();

        const mintAddress = await createMint(

            connection,

            keypair,

            keypair.publicKey,

            keypair.publicKey,

            9,

            mintKeypair,

            {
                commitment: "confirmed"
            },
            
            TOKEN_PROGRAM_ID
        );

        console.log(`Address of the created token mint is: ${mintAddress.toBase58()} which of course matches with the public key of the mint keypair we passed in to the create mint function: ${mintKeypair.publicKey.toBase58()}.`);

    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
