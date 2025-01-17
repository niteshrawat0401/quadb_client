
import { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
import { Eye } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, loginUser, logout } from "../reudx/actions/action"; // Update the path as needed

export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    agreeToTerms: false,
    rememberMe: false
  })

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.auth);

  console.log(formData)
  console.log(error)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      dispatch(loginUser({ email: formData.email, password: formData.password }));
      if (!error) {
         navigate('/productPage');
      }
    } else {
      dispatch(signUpUser(formData));
    if (!error) {
      setIsSignIn(true);
    }
    }
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn)
    // Reset form data when switching modes
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
      agreeToTerms: false,
      rememberMe: false
    })
  }

  return (
    <div className="flex min-h-screen">
      {/* Left section with image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20114307-pa26y0zl3clk1ByKN0GSwElglZBHAA.png"
          alt="Elegant grey armchair with cream throw blanket"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-8 left-8">
          <h1 className="text-2xl font-medium">3legant.</h1>
        </div>
      </div>

      {/* Right section with form */}
      <div className="w-full lg:w-1/2 px-6 py-8 lg:px-12 xl:px-16 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="lg:hidden">
            <h1 className="text-2xl font-medium">3legant.</h1>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">{isSignIn ? "Sign In" : "Sign up"}</h2>
            <p className="text-gray-600">
              {isSignIn ? "Don't have an account yet? " : "Already have an account? "}
              <button
                onClick={toggleAuthMode}
                className="text-emerald-600 hover:text-emerald-700"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              {!isSignIn && (
                <>
                  <div>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Username"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <input
                  type="email"
                  placeholder={isSignIn ? "Your username or email address" : "Email address"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>

            {isSignIn ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-black hover:underline">
                  Forgot password?
                </Link>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree with{" "}
                  <Link href="/privacy" className="text-black hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="text-black hover:underline">
                    Terms of Use
                  </Link>
                </label>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}  
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
              disabled={isLoading}
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

