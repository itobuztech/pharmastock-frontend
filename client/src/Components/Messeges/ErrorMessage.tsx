import { Text } from "@mantine/core";

export default function ErrorMessage({
  message,
}: {
  message: string | undefined;
}) {
  return (
    <>
      {message && (
        <Text size="sm" mt={5} c="red.6">
          {message}
        </Text>
      )}
    </>
  );
}
