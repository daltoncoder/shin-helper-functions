import { ethers } from 'ethers'
import { createClient } from '@urql/core'
import fetch from 'node-fetch'

const APIURL = 'https://api.thegraph.com/subgraphs/name/daltoncoder/fomo-mofos'

export const connectMetaMask = async () => {
  // Check that they have an ethereum wallet in browser, if not return
  if (!window.ethereum) {
    return null
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum)

  await provider.send('eth_requestAccounts', [])

  const signer = provider.getSigner()

  return signer
}

export const getNftsFromWallet = async (address, traits = false) => {
  const client = createClient({
    url: APIURL,
    fetch: fetch,
  })

  const walletQuery = `
  query {
    holder(id: "${address.toLowerCase()}") {
        tokens {
          index
          ${
            traits
              ? 'image traits { Background Body Skin Faces Headwear Piercing Fomies Sparkles}'
              : ''
          }
        }
      }
  }
`

  const data = client.query(walletQuery).toPromise()

  return data
}

export const getNftData = async (index) => {
  const client = createClient({
    url: APIURL,
    fetch: fetch,
  })

  const nftQuery = `
  query {
    nfts(where:{index: ${index.toString()}}) {
        index
        owner {
            id
        }
        image
        traits {
            Background
            Body
            Skin
            Faces
            Headwear
            Piercing
            Fomies
            Sparkles
        }   
    }
  }
`

  const data = client.query(nftQuery).toPromise()

  return data
}
