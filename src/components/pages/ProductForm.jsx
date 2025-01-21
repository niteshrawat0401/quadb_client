import { useState } from "react"
import { Plus, ChevronDown, PenSquare, ImagePlus } from 'lucide-react'
import axios from "axios"

const ProductForm = () => {
    const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);
    const [showPriceInput, setShowPriceInput] = useState(false);
    const [showMRPInput, setShowMRPInput] = useState(false);
    const [showColorsInput, setShowColorsInput] = useState(false);
    const [additionalFields, setAdditionalFields] = useState([]);
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      price: "",
      mrp: "",
      measurements: "",
      colors: "",
    });
  
    const handleAddPrice = () => {
      setShowPriceInput(true);
    };
    const handleAddMRP = () => {
      setShowMRPInput(true);
    };
    const handleAddColors = () => {
      setShowColorsInput(true);
    };
    const handleAddMoreInfo = () => {
      setAdditionalFields([...additionalFields, { id: Date.now(), value: "" }]);
    };
    const handleAdditionalFieldChange = (id, value) => {
      setAdditionalFields(
        additionalFields.map((field) =>
          field.id === id ? { ...field, value } : field
        )
      );
    };
  
    const handleSubmit = async () => {
      if (!formData.title || !formData.description) {
        console.error("Please fill in all required fields.");
        return;
      }
  
      const dataToSubmit = {
        ...formData,
        additionalFields: additionalFields.map((field) => field.value),
      };
  
      try {
        const response = await axios.post("https://quadb-server.onrender.com/product/products",dataToSubmit);
        console.log("Product added successfully:", response.data);
        setFormData({
          title: "",
          description: "",
          price: "",
          mrp: "",
          measurements: "",
          colors: "",
        });
        setAdditionalFields([]);
      } catch (error) {
        console.error("Error adding product:", error.response?.data || error.message);
      }
    };
  return (
    <div>
        <div className="min-h-screen">
      <div className="flex-1 bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="relative w-96">
            </div>
            <div className="flex items-center gap-3">
              <img
                src="/placeholder.svg"
                alt="Admin"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Moni Roy</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </header>
        {/* Form Content */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
          
          <div className="bg-white rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Add label <PenSquare className="w-4 h-4 ml-2" />
              </button>
            </div>
            <div className="flex gap-8">
              {/* Image Upload */}
              <div className="w-48 h-48 border-2 border-dashed rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <ImagePlus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20114307-pa26y0zl3clk1ByKN0GSwElglZBHAA.png" alt=""/>
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Add Image
                  </button>
                </div>
              </div>
              {/* Form Fields */}
              <div className="flex-1 space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="ADD PRODUCT TITLE"
                    className="w-full px-4 py-2 text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Add description"
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="flex gap-4">
                  {!showPriceInput ? (
                    <button 
                      onClick={handleAddPrice}
                      className="flex-1 flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="flex items-center">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Price
                      </span>
                    </button>
                  ) : (
                    <input
                      type="number"
                      placeholder="Enter price"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  )}
                  
                  {!showMRPInput ? (
                    <button 
                      onClick={handleAddMRP}
                      className="flex-1 flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <span className="flex items-center">
                        <Plus className="w-4 h-4 mr-2" />
                        Add MRP or Price Before Discount
                      </span>
                    </button>
                  ) : (
                    <input
                      type="number"
                      placeholder="Enter MRP"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.mrp}
                      onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Measurements</p>
                  <input
                    type="text"
                    placeholder="Add details"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.measurements}
                    onChange={(e) => setFormData({ ...formData, measurements: e.target.value })}
                  />
                </div>
                {
                !showColorsInput ?
                <button onClick={handleAddColors} className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Add colors <ChevronDown className="w-4 h-4 ml-2" />
                </button> :
                <select onChange={(e) => setFormData({ ...formData, colors: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Color</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Yellow">Yellow</option>
                </select>
                }
                <div>
                  <button
                    onClick={() => setIsAdditionalInfoOpen(!isAdditionalInfoOpen)}
                    className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Additional Info
                    <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${isAdditionalInfoOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isAdditionalInfoOpen && (
                    <div className="mt-4 space-y-3">
                      {additionalFields.map((field) => (
                        <input
                          key={field.id}
                          type="text"
                          placeholder="Enter additional information"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={field.value}
                          onChange={(e) => handleAdditionalFieldChange(field.id, e.target.value)}
                        />
                      ))}
                      <button 
                        onClick={handleAddMoreInfo}
                        className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <span className="flex items-center">
                          <Plus className="w-4 h-4 mr-2" />
                          Add More Information
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                <button 
                  onClick={handleSubmit}
                  className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ProductForm
