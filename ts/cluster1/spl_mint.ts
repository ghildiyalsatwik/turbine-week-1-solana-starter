import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "./wallet/turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000_000n;

// Mint address
const mint = new PublicKey("CE4gMspmcuvLk1AHTLZvpVcbLPDXcqCrWPzLkVy7uXr6");

(async () => {
    try {
        // Create an ATA
        // const ata = ???
        // console.log(`Your ata is: ${ata.address.toBase58()}`);

        const secondWalletPubkey = new PublicKey("D6cjkmS61Ar8UGFCCsq7QSH8y35WWy28vwYAJKNK6EXC");

        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, secondWalletPubkey);

        console.log(`ATA created for: ${secondWalletPubkey.toBase58()} is: ${ata.address.toBase58()}`);

        // Mint to ATA
        // const mintTx = ???
        // console.log(`Your mint txid: ${mintTx}`);

        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair, token_decimals);

        console.log(`Signature of mint transaction: ${mintTx}`)
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
