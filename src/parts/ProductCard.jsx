export default function ProductCard({ product }) {
  return (
    <article className="card overflow-hidden">
      <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
        <img src={product.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-1">{product.name}</h3>
        <p className="text-brand font-semibold mt-1">${Number(product.price).toFixed(2)}</p>
        {product.description && <p className="subtle mt-2 line-clamp-2">{product.description}</p>}
      </div>
    </article>
  )
}
