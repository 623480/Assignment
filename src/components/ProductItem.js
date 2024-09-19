import React from "react";
import { MdModeEdit } from "react-icons/md";

const ProductItem = ({
  product,
  showVariants,
  discountClicked,
  toggleVariants,
  handleDiscount,
  openDialog,
}) => {
  return (
    <div key={product.productId} className="flex flex-col ml-5 my-3">
      <div className="flex items-center">
        <div className="w-[215px] h-[32px] border-2 shadow-md flex justify-between items-center">
          <h2 className="truncate w-10/12 text-xs pl-2">
            {product.productTitle}
          </h2>
          <MdModeEdit
            onClick={openDialog}
            className="mr-5 my-1 text-xl w-4 h-4 text-[#00000033] hover:text-givenGreen cursor-pointer"
            aria-label="Edit product"
          />
        </div>
        <div className="w-[141px] h-[32px] ml-2">
          {!discountClicked[product.productId] ? (
            <button
              className="w-full h-full bg-givenGreen rounded-[4px] text-white"
              onClick={() => handleDiscount(product.productId)}
            >
              Add Discount
            </button>
          ) : (
            <div className="w-full h-full flex flex-row">
              <input
                type="text"
                placeholder="0"
                className="w-6/12 h-full mr-1 border-2 border-gray-300"
              />
              <input
                type="text"
                placeholder="Discount Code"
                className="w-6/12 border-2 ml-1 h-full border-gray-300"
              />
            </div>
          )}
        </div>
      </div>

      <button
        className="text-blue-500 text-sm mt-2"
        onClick={() => toggleVariants(product.productId)}
      >
        {showVariants[product.productId] ? "Hide Variants" : "Show Variants"}
      </button>

      {showVariants[product.productId] &&
        product.selectedVariants.length > 0 && (
          <div className="ml-8 mt-2">
            {product.selectedVariants.map((variant) => (
              <div
                key={variant.variantId}
                className="flex justify-between items-center"
              >
                <span>{variant.variantTitle}</span>
                <span>{variant.variantPrice}</span>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default ProductItem;
