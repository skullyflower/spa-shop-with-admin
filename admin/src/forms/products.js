import { useCallback, useEffect, useState } from "react";
import { Box, Button, Center, HStack, Heading, VStack } from "@chakra-ui/react";
import EditProduct from "./editproduct";

const getProducts = (setProducts, setMessages) => {
  setProducts([]);
  fetch("http://localhost:4242/api/products")
    .then((data) => data.json())
    .then((json) => {
      if (Array.isArray(json)) {
        setProducts(json);
      } else {
        setProducts({});
        setMessages(json.message);
      }
    })
    .catch((err) => {
      setMessages(err.message || "Couldn't get products.");
    });
};

const getCategories = (setCategories, setMessages) => {
  setCategories({});

  fetch("http://localhost:4242/api/categories")
    .then((data) => data.json())
    .then((json) => {
      const catids = Object.keys(json);
      if (Array.isArray(catids)) {
        const newcats = {};
        catids.sort().forEach((cat) => {
          if (json[cat].subcat.length === 0) {
            newcats[cat] = json[cat];
          }
        });
        setCategories(newcats);
      } else {
        setCategories({});
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
      <Heading size="md">Add, Update, Delete Products</Heading>
      <Center>
        <Button
          className="shopButt"
          value="newcat"
          onClick={toggleForm}>
          {showForm ? "Never mind" : "Add a new one"}
        </Button>
      </Center>
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
          border="1px solid gray"
          borderRadius={10}
          p={5}
          m={5}
          alignItems="flex-start"
          justifyContent="center">
          {categories &&
            Object.keys(categories).map((cat, i) => (
              <Button
                key={i}
                size="sm"
                className="shopButt"
                onClick={doFilterProducts}
                value={cat}>
                {categories[cat].name}
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
        <VStack gap={5}>
          {filteredFroducts &&
            filteredFroducts.map((product, i) => (
              <HStack
                key={i}
                p={5}
                border="1px solid"
                borderRadius={5}
                w="100%"
                alignItems="flex-start"
                justifyContent="space-between">
                <div className="centered">
                  <img
                    src={`http://localhost:3000/shop/${product.img}`}
                    style={{ width: "100px" }}
                    alt={product.name}
                  />
                  <div>
                    {!!product.soldout ? "Sold Out" : `$${Number(product.price).toFixed(2)}`}
                  </div>
                </div>
                <div style={{ width: "60%" }}>
                  <h3>
                    <a
                      href={`http://localhost:3000/productpage/${product.id}`}
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
                <button
                  className="shopButt"
                  value={product.id}
                  onClick={toggleForm}>
                  Edit
                </button>
                <button
                  className="shopButt"
                  name="copy"
                  value={product.id}
                  onClick={toggleForm}>
                  copy
                </button>
              </HStack>
            ))}
        </VStack>
      </Box>
    </div>
  );
};
export default Products;
