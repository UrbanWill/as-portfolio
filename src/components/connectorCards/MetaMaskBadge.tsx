// Hooks
import useSwitchChain from "@/hooks/useSwitchChain";

// Components
import Badge from "@/components/shared/Badge";

// Constants
import { META_MASK_DEEP_LINK } from "@/constants";
import { ChainId } from "@/constants/chains";

interface MetaMaskBadgeProps {
  setIsOpen: () => void;
}

export default function MetaMaskBadge({ setIsOpen }: MetaMaskBadgeProps) {
  const { switchChain } = useSwitchChain();

  const handleConnect = () => {
    switchChain(ChainId.MATIC).then(() => {
      setIsOpen();
    });
  };

  const connectButton = (
    <Badge>
      <button type="button" onClick={handleConnect}>
        Metamask
      </button>
    </Badge>
  );

  return !window.ethereum ? (
    <a href={META_MASK_DEEP_LINK} target="blank">
      {connectButton}
    </a>
  ) : (
    connectButton
  );
}
