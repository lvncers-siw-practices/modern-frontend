import type { Product } from "../types/Product";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>価格：{product.price}円</p>
      <p>カテゴリー：{product.category}</p>
      <p>{product.description}</p>
      {product.isRecommended && <p className="recommended">★おすすめ</p>}
    </div>
  );
}

export default ProductCard;
