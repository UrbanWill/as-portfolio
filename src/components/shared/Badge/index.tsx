interface BadgeProps {
  children: React.ReactNode;
  isDisabled?: boolean;
}

export default function Badge({ children, isDisabled }: BadgeProps) {
  return (
    <div
      className={`bg-gray-700 flex justify-center rounded-md p-4 ${
        isDisabled ? "opacity-50" : ""
      }`}
    >
      {children}
    </div>
  );
}
