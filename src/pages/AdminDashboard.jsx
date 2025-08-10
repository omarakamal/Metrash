import { useEffect, useState } from 'react'
import { createProduct, deleteProduct, fetchProducts, updateProduct, bulkCreate } from '../utils/api/products.js'
import { createAdmin, listUsers } from '../utils/api/users.js'
import { toast } from '../components/ToastHost.jsx'
import ProductForm from '../parts/ProductForm.jsx'

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [pageInfo, setPageInfo] = useState({ page: 1, totalPages: 1 })
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const [admins, setAdmins] = useState([])
  const [bulkJSON, setBulkJSON] = useState('')

  const load = async (page=1) => {
    const res = await fetchProducts({ page, limit: 20 })
    setProducts(res.products); setPageInfo({ page: res.page, totalPages: res.totalPages })
  }

  const loadAdmins = async () => { const res = await listUsers(); setAdmins(res) }

  useEffect(() => { load(); loadAdmins() }, [])

  const onSave = async (vals) => {
    if (editing) {
      await updateProduct(editing._id, vals)
      toast('Product updated')
    } else {
      await createProduct(vals)
      toast('Product created')
    }
    setEditing(null); setCreating(false)
    await load(pageInfo.page)
  }

  const onDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    await deleteProduct(id)
    toast('Product deleted')
    await load(pageInfo.page)
  }

  const onCreateAdmin = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    try {
      await createAdmin({ username: form.get('username'), password: form.get('password') })
      toast('New admin created')
      e.currentTarget.reset()
      await loadAdmins()
    } catch (er) { toast(er.message, 'error') }
  }

  const doBulk = async () => {
    try {
      const arr = JSON.parse(bulkJSON)
      if (!Array.isArray(arr)) throw new Error('Must be an array of products')
      await bulkCreate(arr)
      toast('Bulk upload complete')
      setBulkJSON('')
      await load()
    } catch (e) { toast(e.message, 'error') }
  }

  return (
    <div className="container-max grid gap-8">
      <section className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="heading">Products</h2>
          <div className="flex gap-2">
            <button className="btn-primary" onClick={()=>{ setCreating(true); setEditing(null) }}>Add product</button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2">Image</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Updated</th>
                <th className="text-right p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} className="border-t">
                  <td className="p-2">
                    <img src={p.imageUrl || 'https://via.placeholder.com/60'} alt={p.name} className="h-12 w-12 rounded-md object-cover"/>
                  </td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">${Number(p.price).toFixed(2)}</td>
                  <td className="p-2">{new Date(p.updatedAt || p.createdAt).toLocaleString()}</td>
                  <td className="p-2 text-right">
                    <div className="inline-flex gap-2">
                      <button className="btn-ghost" onClick={()=>setEditing(p)}>Edit</button>
                      <button className="btn-ghost" onClick={()=>onDelete(p._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: pageInfo.totalPages }).map((_,i)=>{
              const page = i+1
              const active = page === pageInfo.page
              return <button key={page} onClick={()=>load(page)} className={`btn ${active?'bg-brand text-white':'btn-ghost'}`}>{page}</button>
            })}
          </div>
        </div>
      </section>

      {(creating || editing) && (
        <section className="card p-6">
          <h3 className="heading mb-4">{editing ? 'Edit product' : 'Create product'}</h3>
          <ProductForm defaultValues={editing || {}} onCancel={()=>{ setCreating(false); setEditing(null) }} onSave={onSave} />
        </section>
      )}

      <section className="card p-6 grid lg:grid-cols-2 gap-6">
        <div>
          <h3 className="heading mb-4">Create new admin</h3>
          <form onSubmit={onCreateAdmin} className="grid gap-3 max-w-md">
            <div>
              <label className="label">Username (email)</label>
              <input name="username" className="input" required />
            </div>
            <div>
              <label className="label">Password</label>
              <input name="password" type="password" className="input" required />
            </div>
            <button className="btn-primary w-fit">Create admin</button>
          </form>
        </div>
        <div>
          <h3 className="heading mb-4">Admins</h3>
          <ul className="grid gap-2">
            {admins.map(a => <li key={a._id} className="p-3 rounded-xl bg-gray-50 border">{a.username}</li>)}
          </ul>
        </div>
      </section>

      <section className="card p-6">
        <h3 className="heading mb-2">Bulk upload products</h3>
        <p className="subtle mb-4">Paste an array of product objects. Example: [{'{'}"name":"Apple","price":0.99{'}'}]</p>
        <textarea className="input h-40" value={bulkJSON} onChange={(e)=>setBulkJSON(e.target.value)} placeholder='[{"name":"Apple","price":0.99,"description":"Fresh","imageUrl":"..."}, ...]'></textarea>
        <div className="mt-3">
          <button className="btn-primary" onClick={doBulk}>Upload</button>
        </div>
      </section>
    </div>
  )
}
