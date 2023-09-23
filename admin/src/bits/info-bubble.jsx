import {
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";

export default function InfoBubble({ message }) {
  return (
    <Popover trigger="hover">
      <PopoverTrigger
        color="gray.200"
        verticalAlign="middle">
        <button>
          <Image
            w={4}
            src="/info-button.svg"
            alt="More info"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent bg="gray.200">
        <PopoverArrow bg="gray.200" />
        <PopoverBody>{message}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
