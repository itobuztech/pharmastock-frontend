import {
  Button,
  ButtonVariant,
  DefaultMantineColor,
  MantineSize,
  MantineSpacing,
} from "@mantine/core";

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
  size,
  disabled,
  mt,
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
  size?: MantineSize;
  disabled?: boolean;
  mt?: MantineSpacing;
}) {
  return (
    <Button
      disabled={disabled}
      loading={loading}
      data-test-id={testId}
      className={className}
      color={color}
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick && onClick}
      size={size}
      mt={mt}
    >
      {children}
    </Button>
  );
}
