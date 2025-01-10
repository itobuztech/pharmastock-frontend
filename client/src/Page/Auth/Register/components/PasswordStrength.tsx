import {
  Box,
  PasswordInput,
  Popover,
  Progress,
  rem,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useController,
} from "react-hook-form";
import { BiCheck, BiX } from "react-icons/bi";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <BiCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <BiX style={{ width: rem(14), height: rem(14) }} />
      )}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password?.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function PasswordStrength({
  name,
  control,
  errors,
  disabled,
  label,
  onValidPassword,
}: {
  name: string;
  control: Control<any>;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  disabled?: boolean;
  label: string;
  onValidPassword?: (valid: boolean) => void;
}) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  const allRequirementsMet =
    requirements.every((requirement) => requirement.re.test(value)) &&
    value?.length > 5;

  // Notify parent about password validity
  useEffect(() => {
    if (onValidPassword) {
      onValidPassword(allRequirementsMet);
    }
  }, [value, allRequirementsMet, onValidPassword]);

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: "pop" }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <PasswordInput
                withAsterisk
                label={label}
                placeholder={label}
                value={field.value}
                onChange={(event) => onChange(event.currentTarget.value)}
                error={errors && "This field is required"}
                disabled={disabled}
              />
            )}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement
          label="Includes at least 6 characters"
          meets={value?.length > 5}
        />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}
