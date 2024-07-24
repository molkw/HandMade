import React, { useState } from 'react';
import UploadProduct from '../components/UploadProduct';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  // Define fetchData function here if needed
  const fetchData = async () => {
    // Fetch or update data here
  };

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button
          className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* Upload Product Component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchData} // Pass fetchData if required
        />
      )}
    </div>
  );
};

export default AllProducts;
