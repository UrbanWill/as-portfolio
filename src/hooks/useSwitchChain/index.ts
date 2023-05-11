// Hooks
import { metaMask } from "@/connectors/metamask";

// Utils
import { getAddChainParameters } from "@/constants/chains";

/**
 * Hardcoded metamask connector because that's the only one we're using
 * Custom hook to connect, switch and add chains
 */

export default function useSwitchChain() {
  const switchChain = async (desiredChainId: number): Promise<void> => {
    try {
      if (desiredChainId === -1) {
        await metaMask.activate();
      } else {
        await metaMask.activate(getAddChainParameters(desiredChainId));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { switchChain };
}
