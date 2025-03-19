import { Button, HStack, Image, useDisclosure, Stack } from "@chakra-ui/react";
import ConfirmDelete from "./ConfirmDelete";

const OneProduct = ({ product, toggleForm, doDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack
      key={product.id}
      p={5}
      border="1px solid"
      borderRadius={5}
      w="100%"
      alignItems="flex-start"
      justifyContent="space-between">
      <Stack
        align={"center"}
        gap={2}>
        <Image
          src={`http://localhost:3000/${product.img}`}
          boxSize="100px"
          title={`${product.name} - http://localhost:3000/${product.img}`}
          alt={`${product.name} - http://localhost:3000/${product.img}`}
          fallbackSrc="/images/image-loading.svg"
        />
        <div>{!!product.soldout ? "Sold Out" : `$${Number(product.price).toFixed(2)}`}</div>
      </Stack>
      <div style={{ width: "60%" }}>
        <h3>
          <a
            href={`http://localhost:3000/shop/product/${product.id}`}
            target="blogwindow">
            {product.name}
          </a>
        </h3>
        <div
          style={{ textAlign: "left", verticalAlign: "top" }}
          dangerouslySetInnerHTML={{ __html: product.desc }}
        />
        <div
          style={{ textAlign: "left", verticalAlign: "top" }}
          dangerouslySetInnerHTML={{ __html: product.desc_long }}
        />
      </div>
      <HStack gap={2}>
        <Button
          size="sm"
          variant="shopButt"
          value={product.id}
          onClick={onOpen}>
          X
        </Button>
        <Button
          size="sm"
          variant="shopButt"
          value={product.id}
          onClick={toggleForm}>
          Edit
        </Button>
        <Button
          size="sm"
          variant="shopButt"
          name="copy"
          value={product.id}
          onClick={toggleForm}>
          copy
        </Button>
      </HStack>
      <ConfirmDelete
        what={product.name}
        action={doDelete}
        onClose={onClose}
        isOpen={isOpen}
      />
    </HStack>
  );
};
export default OneProduct;
