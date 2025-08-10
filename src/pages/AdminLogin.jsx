import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'
import { toast } from '../components/ToastHost.jsx'

export default function AdminLogin() {
  const { register, handleSubmit } = useForm()
  const { login } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()

  const onSubmit = async (vals) => {
    try {
      await login(vals.username, vals.password)
      toast('Welcome back!')
      const to = loc.state?.from?.pathname || '/admin'
      nav(to, { replace: true })
    } catch (e) {
      toast(e.message || 'Login failed', 'error')
    }
  }

  return (
    <div className="container-max max-w-md">
      <div className="card p-6 mt-8">
        <h2 className="heading mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <div>
            <label className="label">Username (email)</label>
            <input className="input" {...register('username', { required: true })} placeholder="owner@example.com"/>
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" className="input" {...register('password', { required: true })} />
          </div>
          <button className="btn-primary mt-2">Sign in</button>
        </form>
      </div>
    </div>
  )
}
