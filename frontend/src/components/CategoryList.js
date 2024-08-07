import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
        {loading ? (
          categoryLoading.map((el, index) => (
            <div
              className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'
              key={'categoryLoading' + index}
            />
          ))
        ) : (
          categoryProduct.map((product, index) => {
            // Parse the productImage string to an array
            const productImageArray = JSON.parse(product?.productImage || '[]');
            const imageUrl = productImageArray[0];

            return (
              <Link
                to={'/product-category?category=' + product?.category}
                className='cursor-pointer flex flex-col items-center'
                key={product?.category}
              >
                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center'>
                  <img
                    src={imageUrl}
                    alt={product?.category}
                    className='w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110'
                  />
                </div>
                <p className='text-center text-sm md:text-base capitalize font-bold mt-2'>{product?.category}</p>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoryList;
