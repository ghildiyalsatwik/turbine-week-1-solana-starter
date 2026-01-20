import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "./wallet/turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("CE4gMspmcuvLk1AHTLZvpVcbLPDXcqCrWPzLkVy7uXr6");

// Recipient address
const to = new PublicKey("berg7BKPHZWPiAdjpitQaWCfTELaKjQ6x7e9nDSu23d"); //Berg's address

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it

        const fromATA = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);

        console.log(`Source ATA: ${fromATA.address.toBase58()}`);

        // Get the token account of the toWallet address, and if it does not exist, create it

        const toATA = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);

        console.log(`Destination ATA: ${toATA.address.toBase58()}`);

        // Transfer the new token to the "toTokenAccount" we just created

        const amount = 5;

        const token_decimals = 9;

        const finalAmount = BigInt(amount) * BigInt(10 ** (token_decimals - 1));

        const transferTx = await transfer(connection, keypair, fromATA.address, toATA.address, keypair, finalAmount);

        console.log(`Signature of transfer transaction: ${transferTx}`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();