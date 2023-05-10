const BASE_BUTTON_CLASSES = "rounded-md text-white";

type colorScheme = "primary" | "secondary";
type size = "xs" | "sm" | "md";
type fontWeight = "light" | "normal" | "medium" | "semibold" | "bold";

const colorSchemes = {
  primary: "bg-amber-400 hover:bg-amber-300",
  secondary: "bg-zinc-700 hover:bg-zinc-600",
};

const sizes = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-md",
};

const fontWeights = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

interface ButtonProps {
  label: string;
  onClick?: () => void;
  colorScheme?: colorScheme;
  size?: size;
  fontWeight?: fontWeight;
}

export default function Button({
  label,
  onClick,
  colorScheme = "primary",
  size = "md",
  fontWeight = "normal",
}: ButtonProps) {
  const buttonClasses = [
    colorSchemes[colorScheme],
    sizes[size],
    fontWeights[fontWeight],
  ].join(" ");

  return (
    <button
      type="button"
      className={`${BASE_BUTTON_CLASSES} ${buttonClasses}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
