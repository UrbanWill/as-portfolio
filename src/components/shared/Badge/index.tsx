interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <div className="bg-gray-700 flex justify-center rounded-md p-4">
      {children}
    </div>
  );
}
