import { PuffLoader } from "react-spinners";
import { Text, Flex } from "@radix-ui/themes";

interface OverlayLoaderProps {
  isVisible: boolean;
}

function OverlayLoader({ isVisible }: OverlayLoaderProps) {
  if (!isVisible) return null;

  return (
    <div
      data-testid="overlay-loader"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Flex
        position="absolute"
        top="50%"
        left="50%"
        direction="column"
        align="center"
        justify="center"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <PuffLoader title="Updating layout..." color="white" loading />
        <Text align="center">Updating layout...</Text>
      </Flex>
    </div>
  );
}

export default OverlayLoader;
