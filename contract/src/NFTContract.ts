import { MusicFeatureNFT } from './model';

const nftMap = {};

export class NFTContract {
  constructor() {}

  // Public - Mints a music feature NFT for the specified account.
  mintMusicFeatureNFT(accountId: string): void {
    const nftId = generateNFTId(accountId);
    const musicFeatureNFT: MusicFeatureNFT = { nftId, accountId, feature: "music" };
    nftMap[nftId] = musicFeatureNFT;
  }

  // Public - Retrieves the music feature NFT for the specified account.
  getMusicFeatureNFT(accountId: string): MusicFeatureNFT | null {
    const nftId = generateNFTId(accountId);
    return nftMap[nftId] || null;
  }
}

// Helper function to generate a unique NFT ID
function generateNFTId(accountId: string): string {
  return `${accountId}-music-feature-nft`;
}
