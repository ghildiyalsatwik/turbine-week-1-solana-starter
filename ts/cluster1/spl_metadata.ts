import wallet from "./wallet/turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("CE4gMspmcuvLk1AHTLZvpVcbLPDXcqCrWPzLkVy7uXr6")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        // let accounts: CreateMetadataAccountV3InstructionAccounts = {
        //     ???
        // }

        let accounts: CreateMetadataAccountV3InstructionAccounts = {

            mint: mint,

            mintAuthority: signer
        };

        // let data: DataV2Args = {
        //     ???
        // }

        let data: DataV2Args = {

            name: "COSMOS",

            symbol: "COS",

            uri: "https://peach-capable-leopon-189.mypinata.cloud/ipfs/bafkreiadh5ml4fkca4wtoic6fpxralitfpzbcuoytmfn6hdgkfm5ll2yva",

            sellerFeeBasisPoints: 5000,

            creators: null,

            collection: null,

            uses: null

        };

        // let args: CreateMetadataAccountV3InstructionArgs = {
        //     ???
        // }

        let args: CreateMetadataAccountV3InstructionArgs = {

            data: data,

            isMutable: true,

            collectionDetails: null
        };

        // let tx = createMetadataAccountV3(
        //     umi,
        //     {
        //         ...accounts,
        //         ...args
        //     }
        // )

        let tx = createMetadataAccountV3(umi,

            {

                ...accounts,

                ...args
            }
        );

        // let result = await tx.sendAndConfirm(umi);
        // console.log(bs58.encode(result.signature));

        let result = await tx.sendAndConfirm(umi);

        console.log(`Transaction signature: ${bs58.encode(result.signature)}`);

    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
