import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/api';
import Navbar from '../components/Navbar';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err) {
        setError(err.message || 'Failed to delete product');
      }
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Shoe Inventory</h1>
              <p className="text-gray-600">Manage your shoe product catalog</p>
            </div>
            <Link
              to="/add-product"
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add New Product</span>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, category, or gender..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-4"></div>
            <p className="text-gray-600 font-medium">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="inline-block p-6 bg-purple-100 rounded-full mb-6">
              <svg className="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {searchTerm ? 'No products found' : 'No products yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Start building your inventory by adding your first product'}
            </p>
            {!searchTerm && (
              <Link
                to="/add-product"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition duration-200 space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Your First Product</span>
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group">
                  {/* Product Image */}
                  {product.images && product.images.length > 0 && (
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          product.status === 'active' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-500 text-white'
                        }`}>
                          {product.status}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Product Header */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition duration-200">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold">
                          {product.category}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                          {product.gender}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <p className="text-3xl font-bold text-green-600">₹{product.price}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Material:</span>
                        <span className="text-gray-800 font-semibold">{product.material}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Stock:</span>
                        <span className={`font-bold ${
                          product.stock > 20 
                            ? 'text-green-600' 
                            : product.stock > 10 
                            ? 'text-yellow-600' 
                            : 'text-red-600'
                        }`}>
                          {product.stock} units
                        </span>
                      </div>
                    </div>

                    {/* Sizes */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 font-medium mb-2">Available Sizes:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.sizes && product.sizes.map((size, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Colors */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 font-medium mb-2">Available Colors:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.colors && product.colors.map((color, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Link
                        to={`/edit-product/${product._id}`}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition duration-200 flex items-center justify-center space-x-2 font-semibold"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition duration-200 flex items-center justify-center space-x-2 font-semibold"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Products;
