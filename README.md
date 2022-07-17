index.js exports out the following functions:

connectMetaMask():
This function will connect to a users EVM browser wallet(Not just metamask). If the user does not have a browser wallet this function will return null, otherwise it will return a promise that will resolve to a signer object if the user confirms.
https://docs.ethers.io/v5/api/signer/
^^ there is the docs for all the methods available to a signer object. signer.signMessage( message ) and signer.getAddress( ) are probable most likely to be used for you

getNftsFromWallet(address, traits) :
this function will query subgraph and return a list of the nfts a wallet holds as a promise. When the promise resolves the array of tokens will be at promise.data.holder.tokens
The second paramater on this function is optional bool, if traits === true then you will also recieve all of the metadata for each of the holders NFTS at promise.data.holder.tokens[0].traits and promise.data.holder.tokens[0].image

getNftData(id) :
this will query subgraph and return all the information about an nft, including metadata and owner. This will always only return 1 nft but data will come back as a promise and the nft will be in an array. promise.data.nfts[0]

These functions should be importabale in both your front and backend. to install required dependencies

```
npm i @urql/core ethers graphql node-fetch
```

Node fetch is optional and could be replaced with whatever version of fetch you are already using
