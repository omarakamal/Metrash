import { useForm } from 'react-hook-form'

export default function ProductForm({ defaultValues={}, onCancel, onSave }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: '', price: '', description: '', imageUrl: '',
      ...defaultValues
    }
  })

  return (
    <form onSubmit={handleSubmit(onSave)} className="grid gap-3 max-w-xl">
      <div>
        <label className="label">Name</label>
        <input className="input" {...register('name', { required: 'Name is required' })} />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="label">Price</label>
        <input type="number" step="0.01" min="0" className="input" {...register('price', { required: 'Price is required', valueAsNumber: true })} />
        {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>}
      </div>
      <div>
        <label className="label">Image URL</label>
        <input className="input" {...register('imageUrl')} placeholder="https://..." />
      </div>
      <div>
        <label className="label">Description</label>
        <textarea className="input h-28" {...register('description')} />
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancel</button>
        <button disabled={isSubmitting} className="btn-primary">{isSubmitting ? 'Saving…' : 'Save'}</button>
      </div>
    </form>
  )
}
