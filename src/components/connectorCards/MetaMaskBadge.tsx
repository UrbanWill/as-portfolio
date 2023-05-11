// Hooks
import useSwitchChain from "@/useSwitchChain";

// Components
import Badge from "@/components/shared/Badge";

// Constants
const MATIC_CHAIN_ID = 137;

interface MetaMaskBadgeProps {
  setIsOpen: () => void;
}

export default function MetaMaskBadge({ setIsOpen }: MetaMaskBadgeProps) {
  const { switchChain } = useSwitchChain();

  const handleConnect = () => {
    switchChain(MATIC_CHAIN_ID).then(() => {
      setIsOpen();
    });
  };

  return (
    <Badge>
      <button type="button" onClick={handleConnect}>
        Metamask
      </button>
    </Badge>
  );
}
