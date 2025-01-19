import React, { useEffect, useState } from 'react';
import { Search, Edit2, Trash2, Save, X } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

const ProductStock = () => {
  const [productData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    price: '',
    measurements: '',
    colors: ''
  });

  const fetchProducts = async () => {
    await axios.get('http://localhost:8080/product/products')
      .then((res) => {
        console.log(res?.data);
        setProductData(res?.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        throw error;
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingId(product._id);
    setEditForm({
      title: product.title,
      description: product.description,
      price: product.price,
      mrp: product.mrp,
      measurements: product.measurements,
      colors: product.colors
    });
    toast.success('Edit mode activated');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      title: '',
      description: '',
      price: '',
      mrp: '',
      measurements: '',
      colors: ''
    });
  };

  const handleSaveEdit = async (productId) => {
    try {
      const response = await axios.put(`http://localhost:8080/product/products/${productId}`, editForm);
      if (response.status === 200) {
        toast.success('Product updated successfully');
        fetchProducts();
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  const handleDelete = async (productId) => {
    await axios.delete(`http://localhost:8080/product/products/${productId}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to delete product');
        } else {
          console.log(res);
          fetchProducts();
          toast.success('Product deleted successfully');
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        toast.error('Failed to delete product');
        throw error;
      });
  };

  const renderTableCell = (product, field) => {
    if (editingId === product._id) {
      return (
        <input
          type={field === 'price' ? 'number' : 'text'}
          value={editForm[field]}
          onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
          className="w-full px-2 py-1 border rounded"
        />
      );
    }
    if (field === 'colors') {
      return product.colors === "Red" ? (
        <div className='rounded bg-red-600 h-5 w-5 m-auto'></div>
      ) : product.colors === 'Blue' ? (
        <div className='rounded-3xl h-5 w-5 bg-blue-700 m-auto'></div>
      ) : (
        <div className='rounded bg-yellow-400 h-5 w-5 m-auto'></div>
      );
    }
    if (field === 'price' || field === 'mrp') {
      return `$${product[field].toFixed(2)}`;
    }
    return product[field];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">Product Stock</h1>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Mrp</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Measurements</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productData?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className='flex justify-center'>
                    <img src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20114307-pa26y0zl3clk1ByKN0GSwElglZBHAA.png' alt={product.title} className="h-12 w-12 rounded-lg object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {renderTableCell(product, 'title')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {renderTableCell(product, 'description')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {renderTableCell(product, 'price')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {renderTableCell(product, 'mrp')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {renderTableCell(product, 'measurements')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {renderTableCell(product, 'colors')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2 justify-center">
                    {editingId === product._id ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(product._id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Save className="h-5 w-5" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductStock;