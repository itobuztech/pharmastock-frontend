import { Button, ButtonVariant, DefaultMantineColor } from "@mantine/core";

export const defaultButtonConfig = {
  color: "violet",
};

export default function ButtonComponent({
  onClick,
  loading,
  color,
  variant,
  children,
  className,
  testId,
  type,
  fullWidth,
}: {
  onClick?: () => void;
  loading?: boolean;
  type?: "submit" | "button";
  color?: DefaultMantineColor | undefined;
  className?: string;
  children: any;
  testId?: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}) {
  return (
    <Button
      loading={loading}
      data-test-id={testId}
      className={className}
      color={color}
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick && onClick}
    >
      {children}
    </Button>
  );
}
