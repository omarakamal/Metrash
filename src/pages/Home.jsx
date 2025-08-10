import { useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../utils/api/products.js'
import ProductCard from '../parts/ProductCard.jsx'
import { debounce } from '../utils/debounce.js'

export default function Home() {
  const [query, setQuery] = useState({ name: '', minPrice: '', maxPrice: '', page: 1, limit: 12 })
  const [data, setData] = useState({ products: [], totalPages: 1, page: 1, totalItems: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = async (q) => {
    try {
      setLoading(true); setError(null)
      const res = await fetchProducts(q)
      setData(res)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { load(query) }, [])

  const debouncedSearch = useMemo(() => debounce((name) => {
    const next = { ...query, name, page: 1 }
    setQuery(next)
    load(next)
  }, 400), [query])

  const onPriceChange = (key, val) => {
    const next = { ...query, [key]: val, page: 1 }
    setQuery(next); load(next)
  }

  const onPage = (p) => { const next = { ...query, page: p }; setQuery(next); load(next) }

  return (
    <div className="container-max">
      <section className="card p-6 mb-6 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Fresh picks, fair prices.</h1>
          <p className="subtle mt-2">Search and filter to find what you need. No account required.</p>
        </div>
        <div className="w-full md:w-[420px] grid grid-cols-1 gap-3">
          <input className="input" placeholder="Search by name…"
            onChange={(e) => debouncedSearch(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <input type="number" min="0" className="input" placeholder="Min price"
              value={query.minPrice} onChange={(e)=>onPriceChange('minPrice', e.target.value)} />
            <input type="number" min="0" className="input" placeholder="Max price"
              value={query.maxPrice} onChange={(e)=>onPriceChange('maxPrice', e.target.value)} />
          </div>
        </div>
      </section>

      {error && <div className="card p-4 border border-red-300 bg-red-50 text-sm">{error}</div>}

      <section>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_,i)=>(
              <div key={i} className="card p-4 animate-pulse h-56" />
            ))}
          </div>
        ) : data.products.length === 0 ? (
          <div className="card p-8 text-center subtle">No products match your search.</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: data.totalPages }).map((_,i)=>{
                const page = i+1
                const active = page === data.page
                return <button key={page} onClick={()=>onPage(page)} className={`btn ${active?'bg-brand text-white':'btn-ghost'}`}>{page}</button>
              })}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
