import { useCallback, useEffect, useState } from "react";
import { Box, Button, Center, HStack, Heading, Image } from "@chakra-ui/react";
import EditProduct from "./producteditor";
import arraySort from "array-sort";

const getProducts = (setProducts, setMessages) => {
  setProducts([]);
  fetch("http://localhost:4242/api/products")
    .then((data) => data.json())
    .then((json) => {
      if (Array.isArray(json)) {
        setProducts(arraySort(json, "name"));
      } else {
        setProducts([]);
        setMessages(json.message);
      }
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get products.");
    });
};

const getCategories = (setCategories, setMessages) => {
  setCategories([]);

  fetch("http://localhost:4242/api/categories")
    .then((data) => data.json())
    .then((json) => {
      if (Array.isArray(json)) {
        // sort by name
        // filter out the super categories
        const categories = arraySort(json, "name");
        const newcats = categories.filter((cat) => cat.subcat.length === 0);
        setCategories(newcats);
      } else {
        setCategories([]);
        setMessages(json.message);
      }
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get categories.");
    });
};

const Products = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [messages, setMessages] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeProd, setActiveProd] = useState(null);
  const [filteredFroducts, setFilteredProducts] = useState(null);
  const [filter, setFilter] = useState(null);

  const onSubmit = (values) => {
    const change = {
      ...values,
      price: Number(values.price),
      handling: Number(values.handling),
      weight: Number(values.weight),
    };
    let newProducts = [...products];
    let newprodIndex = newProducts.findIndex(
      (prod) => prod.id === values.id || prod.name === values.name,
    );
    if (newprodIndex !== -1) {
      newProducts[newprodIndex] = change; //updates
    } else {
      newProducts.unshift(change); //adds
    }
    fetch("http://localhost:4242/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: newProducts }),
    })
      .then((data) => data.json())
      .then((json) => {
        setMessages(json.message);
        getProducts(setProducts, setMessages);
        if (filter) {
          setFilteredProducts(products.filter((prod) => prod.cat.includes(filter)));
        }
        toggleForm();
      })
      .catch((err) => {
        setMessages(err.message || "there was a problem.");
      });
  };
  const doDelete = useCallback(
    (e) => {
      if (window.confirm("Are you sure you want to do this?")) {
        const prodid = e.target.value;
        fetch(`http://localhost:4242/api/products/${prodid}`, {
          method: "DELETE",
        })
          .then((data) => data.json())
          .then((json) => {
            setMessages(json.message);
            getProducts(setProducts, setMessages);
            if (filter) {
              setFilteredProducts(products.filter((prod) => prod.cat.includes(filter)));
            }
          });
      }
    },
    [filter, products],
  );

  const doFilterProducts = useCallback(
    (e) => {
      const filtercat = e && e.target.value ? e.target.value : null;
      if (filtercat) {
        setFilter(filtercat);
      } else {
        setFilter(null);
      }
    },
    [setFilter],
  );
  const toggleForm = useCallback(
    (e) => {
      const productId =
        e && e.target.value
          ? e.target.name === "copy"
            ? `${e.target.value}-copy`
            : e.target.value
          : null;
      setActiveProd(productId);
      setShowForm(!!productId);
    },
    [setActiveProd, setShowForm],
  );
  useEffect(() => {
    if (!products && !messages) {
      getCategories(setCategories, setMessages);
      getProducts(setProducts, setMessages);
    }
    if (filter) {
      setFilteredProducts(products.filter((prod) => prod.cat.includes(filter)));
    } else {
      setFilteredProducts(products);
    }
  }, [filter, products, messages, setCategories, setProducts, setMessages]);

  return (
    <div className="content">
      {messages && <p>{messages}</p>}
      <Heading
        textAlign="center"
        size="md">
        Add, Update, Delete Products
      </Heading>
      {showForm && (
        <div>
          <EditProduct
            prodId={activeProd}
            categories={categories}
            products={products}
            toggleForm={toggleForm}
            onSubmit={onSubmit}
          />
        </div>
      )}
      <Box p={5}>
        <HStack
          borderRadius={10}
          p={5}
          m={5}
          alignItems="flex-start"
          justifyContent="center">
          <Heading size="ms">Filter by category</Heading>
          {categories?.length > 0 &&
            categories.map((cat) => (
              <Button
                key={cat.id}
                size="sm"
                className="shopButt"
                onClick={doFilterProducts}
                value={cat.id}>
                {cat.name}
              </Button>
            ))}
          <Button
            size="sm"
            className="shopButt"
            onClick={doFilterProducts}
            value={null}>
            Show All
          </Button>
        </HStack>
        <div>
          {filteredFroducts?.map((product, i) => (
            <HStack
              key={product.id}
              p={5}
              border="1px solid"
              borderRadius={5}
              w="100%"
              alignItems="flex-start"
              justifyContent="space-between">
              <div className="centered">
                <Image
                  src={`http://localhost:3000/shop/${product.img}`}
                  boxSize="100px"
                  alt={product.name}
                  fallbackSrc="http://localhost:3000/images/image-loading.svg"
                />
                <div>{!!product.soldout ? "Sold Out" : `$${Number(product.price).toFixed(2)}`}</div>
              </div>
              <div style={{ width: "60%" }}>
                <h3>
                  <a
                    href={`http://localhost:3000/shop/productpage/${product.id}`}
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
              <button
                className="shopButt"
                value={product.id}
                onClick={doDelete}>
                X
              </button>
              <Button
                size="sm"
                className="shopButt"
                value={product.id}
                onClick={toggleForm}>
                Edit
              </Button>
              <Button
                size="sm"
                className="shopButt"
                name="copy"
                value={product.id}
                onClick={toggleForm}>
                copy
              </Button>
            </HStack>
          ))}
        </div>
        <Center p={5}>
          <Button
            className="shopButt"
            value="newcat"
            onClick={toggleForm}>
            {showForm ? "Never mind" : "Add a new one"}
          </Button>
        </Center>
      </Box>
    </div>
  );
};
export default Products;
