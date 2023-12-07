import { useParams } from "react-router-dom";
import { products } from "../../state/shopData";
import ProdDetail from "../../shared/shop/product-detail";
import ProdList from "../../shared/shop/product-list";
import useUpdateHead from "../../shared/updateHead";

const ProductPage = () => {
  const { prod_id } = useParams();

  const product = products.find((prod) => prod.id === prod_id);
  const product_category_id = product ? product.cat[0] : null;

  if (product) {
    useUpdateHead(`Shop ${product.name}`, product.desc);

    return (
      <section
        id="content"
        className="product">
        <ProdDetail item={product} />
        <ProdList
          cat={product_category_id}
          multi={true}
          pId={prod_id}
        />
      </section>
    );
  }
  return null;
};
export default ProductPage;
