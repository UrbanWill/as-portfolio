// Hooks
import { metaMask } from "@/connectors/metamask";

// Components
import Modal from "@/components/shared/Modal";
import Button from "@/components/shared/Button";

// Types
import { ModalProps } from "@/components/shared/Modal";

interface WalletDisconnectModalProps extends ModalProps {
  walletAddress: string;
}

export default function WalletDisconnectModal({
  isOpen,
  setIsOpen,
  title,
  colorScheme,
  walletAddress,
}: WalletDisconnectModalProps) {
  const handleDisconnect = () => {
    if (metaMask?.deactivate) {
      metaMask?.deactivate();
    }
    metaMask.resetState();
    setIsOpen();
  };

  return (
    <Modal
      colorScheme={colorScheme}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={title}
      body={
        <div className="flex flex-col spacing-y-4">
          <div>{walletAddress}</div>
          <div>Are you sure you want to disconnect?</div>
        </div>
      }
      footer={<Button label="Disconnect" onClick={handleDisconnect} />}
    />
  );
}
