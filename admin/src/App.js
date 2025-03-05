import { Suspense, lazy } from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Flex, Image, LinkBox, Stack } from "@chakra-ui/react";
import NavBar from "./bits/NavBar";
// import "./AppLayout.scss";
import "./AppTheme.scss";
import "react-quill/dist/quill.snow.css";

const Welcome = lazy(() => import("./pages/index"));
const Config = lazy(() => import("./pages/configpage"));
const Homepage = lazy(() => import("./pages/homepage"));
const Blog = lazy(() => import("./pages/blogpage"));
const Products = lazy(() => import("./pages/productspage"));
const Categories = lazy(() => import("./pages/categoriespage"));
const Subjects = lazy(() => import("./pages/subjectspage"));
//const PageContent = lazy(() => import("./forms/contentpage"));
const Sale = lazy(() => import("./pages/salepage"));
const Images = lazy(() => import("./pages/ImageUploadpage"));
const Gallery = lazy(() => import("./pages/galleriespage"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="Loading" />}>
        <Stack
          gap={4}
          minH={"100vh"}>
          <header
            id="pagetop"
            style={{ zIndex: 100, position: "sticky", top: 0, textAlign: "center" }}>
            <Flex
              p={2}
              direction={["column", "row"]}
              justifyContent="center"
              align={"center"}
              gap={6}>
              <LinkBox
                as={Link}
                to="/">
                <Image
                  src="/spa-shop-logo.png"
                  className="App-logo"
                  alt="Spa-Shop Admin"
                  bgColor={"white"}
                  borderRadius={"45%"}
                />
              </LinkBox>
              <NavBar />
            </Flex>
          </header>
          <main
            id="pagebody"
            style={{ justifySelf: "stretch" }}>
            <section id="content">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Welcome />}
                />
                <Route
                  exact
                  path="/config"
                  element={<Config />}
                />
                <Route
                  exact
                  path="/home"
                  element={<Homepage />}
                />
                <Route
                  exact
                  path="/gallery"
                  element={<Gallery />}
                />
                <Route
                  exact
                  path="/blog"
                  element={<Blog />}
                />
                <Route
                  exact
                  path="/products"
                  element={<Products />}
                />
                <Route
                  exact
                  path="/categories"
                  element={<Categories />}
                />
                <Route
                  exact
                  path="/subjects"
                  element={<Subjects />}
                />
                <Route
                  exact
                  path="/sale"
                  element={<Sale />}
                />
                <Route
                  exact
                  path="/images"
                  element={<Images />}
                />
              </Routes>
            </section>
          </main>
          <footer id="pagefoot"></footer>
        </Stack>
      </Suspense>
    </Router>
  );
}

export default App;
