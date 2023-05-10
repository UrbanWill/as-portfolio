// Components
import Modal from "@/components/shared/Modal";
import Badge from "@/components/shared/Badge";

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
      <Badge>Metamask</Badge>
      <Badge>Option 2</Badge>
      <Badge>Option 3</Badge>
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
