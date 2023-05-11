// Hooks
import { hooks } from "@/connectors/metamask";
import useSwitchChain from "@/hooks/useSwitchChain";

// Components
import Modal from "@/components/shared/Modal";
import Badge from "@/components/shared/Badge";

// Constants
import { CHAINS, URLS } from "@/constants/chains";

// Types
import { ModalProps } from "@/components/shared/Modal";

const CHAIN_IDS = Object.keys(URLS).map(Number);

export default function SwitchChainModal({
  isOpen,
  setIsOpen,
  title,
  colorScheme,
}: ModalProps) {
  const { useChainId } = hooks;
  const { switchChain } = useSwitchChain();

  const activeChainId = useChainId();

  const handleSwitchChain = async (chainId: number): Promise<void> => {
    await switchChain(chainId).then(() => setIsOpen());
  };

  return (
    <Modal
      colorScheme={colorScheme}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={title}
      body={
        <div className="flex flex-col space-y-4">
          {CHAIN_IDS.map((chainId) => (
            <button
              key={chainId}
              type="button"
              onClick={() => handleSwitchChain(chainId)}
              className={`${
                chainId === activeChainId
                  ? "cursor-not-allowed border-amber-400 rounded-md border-2 "
                  : ""
              }`}
            >
              <Badge>{CHAINS[chainId]?.name ?? chainId}</Badge>
            </button>
          ))}
        </div>
      }
    />
  );
}
