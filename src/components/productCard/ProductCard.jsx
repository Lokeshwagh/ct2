import React, { useContext, useEffect } from 'react';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

function ProductCard() {
    const context = useContext(myContext);
    const { mode, product, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice } = context;

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    console.log(cartItems);

    const addCart = (product) => {
        dispatch(addToCart(product));
        toast.success('Added to Cart');
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                {/* Section Title */}
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1
                        className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 animate-pulse"
                        style={{ color: 'white' }}
                    >
                        Our Latest Collection
                    </h1>
                    <div className="h-1 w-20 bg-gradient-to-r from-pink-600 to-orange-500 rounded"></div>
                </div>

                {/* Product Cards Grid */}
                <div className="flex flex-wrap -m-4">
                    {product
                        .filter((obj) => obj.title.toLowerCase().includes(searchkey))
                        .filter((obj) => obj.category.toLowerCase().includes(filterType))
                        .filter((obj) => obj.price.includes(filterPrice))
                        .slice(0, 8)
                        .map((item, index) => {
                            const { title, price, description, imageUrl, id } = item;
                            return (
                                <div key={index} className="p-4 md:w-1/4 w-full">
                                    <div
                                        className="relative h-full border-2 border-gray-300 rounded-[10px] overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                                        style={{
                                            background: 'linear-gradient(180deg, rgb(46 49 55), black)',
                                            color: 'white',
                                            border: '2px solid transparent',
                                            borderImage: 'linear-gradient(45deg, #ff2d00, #ffb921, #f4d4d4) 1',
                                        }}
                                    >
                                        {/* Image Section */}
                                        <div
                                            onClick={() => (window.location.href = `/productinfo/${id}`)}
                                            className="flex justify-center cursor-pointer relative overflow-hidden"
                                        >
                                            <img
                                                className="rounded-[10px] w-full h-64 object-cover p-2 transition-transform duration-500 hover:scale-110"
                                                src={imageUrl}
                                                alt={title}
                                            />
                                            {/* Overlay for Hover Effect */}
                                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                                                <span className="text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                                                    View Details
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-5 border-t-2 border-gray-600">
                                            <h2
                                                className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                                                style={{ color: 'white' }}
                                            >
                                                Cattle-Hub
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-white mb-2 truncate">
                                                {title}
                                            </h1>
                                            <p className="leading-relaxed mb-3 text-gray-300 line-clamp-2">
                                                {description}
                                            </p>
                                            <p className="leading-relaxed mb-3 text-pink-400 font-semibold">
                                                ₹{price}
                                            </p>

                                            {/* Add to Cart Button */}
                                            <div className="flex justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => addCart(item)}
                                                    className="relative w-full py-2 text-white font-medium rounded-lg overflow-hidden bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 focus:ring-4 focus:ring-pink-300 transition-all duration-300"
                                                >
                                                    <span className="relative z-10">Add to Cart</span>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-orange-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Badge for New Items */}
                                        {index < 3 && (
                                            <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-600 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                New
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}

export default ProductCard;