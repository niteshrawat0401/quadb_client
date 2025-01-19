import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../reudx/actions/productAction";
import { addToCart, fetchCart, removeFromCart, updateCart } from "../../reudx/actions/cartAction";
import { ShoppingCart, X, Minus, Plus } from "lucide-react";
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../reudx/actions/action';

const ShopPage = () => {
    const dispatch = useDispatch();

    const userData = JSON.parse(localStorage.getItem('currentUser'))
    const { products, loading, error } = useSelector((state) => state.product);
    const { cartItems, totalPrice } = useSelector((state) => state?.cart);
    const [isCartOpen, setIsCartOpen] = useState(false);
    console.log( cartItems?.products)

    useEffect(()=>{
      dispatch(fetchProducts())
      dispatch(fetchCart( {userId : userData?.user?._id}))
    },[dispatch])

    const handleAddToCart = (productId) => {
        const quantity = 1;
        const userId = userData?.user?._id
        dispatch(addToCart(userId, productId, quantity));
      };

      const handleIncrement = (cartId, productId, currentQuantity) => {
        const newQuantity = currentQuantity + 1;
        dispatch(updateCart(cartId, productId, newQuantity));
      };
      
      const handleDecrement = (cartId, productId, currentQuantity) => {
        const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
        dispatch(updateCart(cartId, productId, newQuantity));
      };

      const handleLogout = () => {
        dispatch(logout());
      };

    const toggleCart = () => setIsCartOpen(!isCartOpen);


  return (
    <div>
         <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="relative w-96">
            </div>
            <div className="flex items-center gap-3">
              <img
                src="/placeholder.svg"
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-xs text-gray-500">User</p><p className="text-sm font-medium">
                   {userData?.user?.username}</p>
                <NavLink className="text-xs font-bold text-black cursor-pointer"  onClick={handleLogout} to="/auth" >Logout</NavLink>
              </div>
            </div>
          </div>
        </header>
        <header className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-semibold">Shop Page</h1>
          <p className="text-gray-500">Let’s design the place you always imagined.</p>
        </div>
        <div className='flex justify-end'><ShoppingCart className='cursor-pointer'  onClick={toggleCart}/>{cartItems?.products?.length}</div>
      </header>

      <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error}</p>}
        {products.map((product) => (
          <div key={product._id} className="bg-white border rounded-lg shadow-md p-4">
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20114307-pa26y0zl3clk1ByKN0GSwElglZBHAA.png"
                alt={product.label}
                className="h-40 w-full object-cover rounded-lg"
              />
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                -50%
              </span>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold">{product.label}</h3>
              <div className="text-gray-500">
                {product.originalPrice && (
                  <span className="line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="text-black font-bold text-xl">${product.price.toFixed(2)}</div>
              <div className="flex justify-center gap-2 mt-4">
                <button onClick={()=>handleAddToCart(product?._id)} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

          {/* Cart Sidebar */}
          <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 w-96`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button onClick={toggleCart}>
            <X />
          </button>
        </div>
        <div className="flex flex-col h-auto max-w-md mx-auto bg-white">

      {/* Cart Items */}
      {cartItems?.products?.length > 0  ?
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Black Tray Table */}
            {cartItems?.products?.map((items)=>{
                return(
                    <>
                    <div key={items.productId._id} className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
            <image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20114307-pa26y0zl3clk1ByKN0GSwElglZBHAA.png"
              alt={items?.productId?.title}
                width={96}
                height={96}
                className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{items?.productId?.title}</h3>
                <p className="text-sm text-gray-500">Color: {items?.productId?.colors}</p>
              </div>
              <button variant="ghost" size="icon" className="h-8 w-8" onClick={() => dispatch(removeFromCart(cartItems?._id,items._id))}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center border rounded-md">
                <button variant="ghost" size="icon" className="h-8 w-8" onClick={()=>handleDecrement(cartItems?._id, items.productId._id, items.quantity)}>
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{items?.quantity}</span>
                <button variant="ghost" size="icon" className="h-8 w-8" onClick={()=>handleIncrement(cartItems?._id, items.productId._id, items.quantity)}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="font-medium">${items?.price === 0 ? items?.productId?.price :  items?.price}</span>
            </div>
          </div>
        </div>
                    </>
                )
            })
            }
      </div> : 
            <h1 className='text-center text-5xl'>Empty Cart</h1>
      }

      {/* Footer */}
      {
        cartItems?.products?.length > 0  &&
      <div className="border-t p-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm">Subtotal</span>
          <span className="font-medium">${totalPrice}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Tax</span>
          <span className="font-medium">20</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Total</span>
          <span className="font-medium">${totalPrice + 20}</span>
        </div>
        <button className="w-full bg-black text-white hover:bg-black/90">
          Checkout
        </button>
        <Link 
          href="#" 
          className="block text-center text-sm text-gray-600 hover:underline"
        >
          View Cart
        </Link>
      </div>}
    </div>
      </div>
    </div>
  )
}

export default ShopPage