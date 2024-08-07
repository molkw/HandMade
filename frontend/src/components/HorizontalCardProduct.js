import React, { useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayTND from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();

    const fetchData = async () => {
        setLoading(true);
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category);
            if (Array.isArray(categoryProduct?.data)) {
                setData(categoryProduct.data);
            } else {
                console.error('Unexpected data format:', categoryProduct);
                setData([]);
            }
        } catch (error) {
            console.error('Failed to fetch category products:', error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-bold py-4'>{heading}</h2>
            <div className='relative'>
                <button
                    className='bg-black text-white shadow-md rounded-full p-2 absolute left-0 top-1/2 transform -translate-y-1/2 text-lg hidden md:block'
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className='bg-black text-white shadow-md rounded-full p-2 absolute right-0 top-1/2 transform -translate-y-1/2 text-lg hidden md:block'
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>
                <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none' ref={scrollElement}>
                    {loading ? (
                        loadingList.map((_, index) => (
                            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-60 bg-white rounded-lg shadow-lg flex flex-col'>
                                <div className='bg-slate-200 h-36 w-full animate-pulse'></div>
                                <div className='p-4 flex flex-col flex-grow'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                    <div className='flex gap-3 mt-auto'>
                                        <p className='text-green-800 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                        <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    </div>
                                    <button className='text-sm text-white px-3 py-1 rounded-full w-full bg-slate-200 animate-pulse mt-2'></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product) => {
                            let images;
                            try {
                                images = JSON.parse(product?.productImage) || [];
                            } catch (error) {
                                console.error('Failed to parse productImage:', error);
                                images = [];
                            }

                            return (
                                <Link
                                    key={product?.id}
                                    to={`product/${product?.id}`}
                                    className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-60 bg-white rounded-lg shadow-lg flex overflow-hidden'
                                >
                                    <div className='h-full w-1/3 flex-shrink-0 overflow-hidden'>
                                        <img
                                            src={images[0] || 'defaultImage.png'}
                                            alt={product?.productName || 'Product Image'}
                                            className='object-cover h-full w-full transition-all duration-300 ease-in-out hover:scale-110'
                                            onError={(e) => {
                                                e.target.src = 'defaultImage.png';
                                                e.target.alt = 'Image not found';
                                            }}
                                        />
                                    </div>
                                    <div className='p-4 flex flex-col flex-grow'>
    <h2 className='font-semibold text-base md:text-lg text-black mb-2 flex-grow'>
        {product?.productName}
    </h2>
    <p className='capitalize text-slate-500 mb-3 flex-grow'>
        {product?.category}
    </p>
    <div className='flex items-baseline gap-3 mb-4 flex-grow'>
        <p className='text-green-800 font-semibold'>
            {displayTND(product?.sellingPrice)}
        </p>
        <p className='text-slate-500 line-through'>
            {displayTND(product?.price)}
        </p>
    </div>
    <button className='text-sm bg-green-800 hover:bg-green-700 text-white px-3 py-2 rounded-full mt-auto transition duration-300 ease-in-out'>
        Add to Cart
    </button>
</div>

                                </Link>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default HorizontalCardProduct;
