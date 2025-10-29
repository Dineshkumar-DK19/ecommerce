import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [sizes, setSizes] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.images[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className=" border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
            {productData.images.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24px] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>

        {/* product informations */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-2xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p className="text-medium">Select Sizes</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSizes(item)}
                  className={` bg-gray-100 py-2 px-4 cursor-pointer rounded ${
                    item === sizes ? " border border-orange-300" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,sizes)} className="bg-black text-white cursor-pointer px-8 py-3 text-sm active:bg-gray-700 rounded">
            Add to Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on Delivery is Available</p>
            <p>Easy return and Exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description and review section */}
      <div className="mt-20">
        <div className="flex">
          <p className="border border-gray-200 px-5 py-3 text-medium text-gray-950">Description</p>
           <p className="border  border-gray-200 px-5 py-3 text-medium  text-gray-950">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border border-gray-200 px-6 py-4 text-sm text-gray-500">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, fuga dicta officia consectetur dignissimos tempore blanditiis. Quis tenetur blanditiis molestias repudiandae qui dolore accusamus, culpa eum ducimus ipsam. Accusamus, repellendus? Aperiam, laudantium. Iure quod magni consectetur vel repudiandae eligendi! Ea nesciunt earum ratione, iusto temporibus deserunt, molestias eos magni, quidem rerum veniam eaque ducimus maiores fugiat distinctio nam. Facere dolore, molestias illum nam voluptatem, sequi facilis cumque sunt assumenda fugit omnis, consectetur necessitatibus. Laudantium harum itaque ullam qui, possimus quo vel ad similique velit sequi aliquid beatae commodi. Perspiciatis mollitia delectus temporibus illo obcaecati aliquam asperiores illum, repellendus porro suscipit?</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam accusantium dolorem odio iure perspiciatis error nihil quisquam eligendi? Praesentium dolore molestias aliquam vero quaerat officiis tempora impedit odit recusandae asperiores, reiciendis delectus itaque laboriosam non soluta. Placeat, rem quaerat. Molestias aliquid nemo odio laborum quisquam ad, totam deserunt modi amet! Impedit quibusdam ipsa ullam explicabo quia est nostrum nobis nulla dolores. Mollitia, nostrum distinctio! Impedit libero a, aut ratione in odio. Consectetur enim odio tempore beatae at aspernatur sunt debitis.</p>
        </div>
      </div>

      {/* Related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
