// Components
import Modal from "@/components/shared/Modal";
import Badge from "@/components/shared/Badge";
import MetaMaskBadge from "../connectorCards/MetaMaskBadge";

// Types
import { ModalProps } from "@/components/shared/Modal";

export default function WalletConnectModal({
  isOpen,
  setIsOpen,
  title,
  colorScheme,
}: ModalProps) {
  const modalBody = (
    <div className="w-100 flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between">
      <MetaMaskBadge setIsOpen={setIsOpen} />
      <div className="cursor-not-allowed">
        <Badge isDisabled>Option 2</Badge>
      </div>
      <div className="cursor-not-allowed">
        <Badge isDisabled>Option 3</Badge>
      </div>
    </div>
  );

  return (
    <Modal
      colorScheme={colorScheme}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={title}
      body={modalBody}
    />
  );
}
