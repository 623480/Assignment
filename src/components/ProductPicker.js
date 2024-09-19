
import { useState, useEffect, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { useAPI } from "../hooks/useAPI";

const ProductPicker = ({isOpen,onAdd }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [searchQuery, setSearchQuery] = useState(" ");
  const [pageNumber, setPageNumber] = useState(1);

  const [responseData, loading, hasMore] = useAPI(searchQuery, pageNumber);


  useEffect(() => {
    if (isOpen) {
      setPageNumber(1);
    }
  }, [isOpen]);

  // Handle scroll event within the dialog
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop === clientHeight && hasMore && !loading) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1); // Load next page when scrolled to bottom
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleProductChange = (productId) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(productId)) {
        // Remove product
        const updatedSelectedProducts = prevSelectedProducts.filter(
          (id) => id !== productId
        );
        // Remove all variants of the product
        const updatedSelectedVariants = selectedVariants.filter(
          (variantId) =>
            !responseData
              .find((product) => product.id === productId)
              .variants.some((variant) => variant.id === variantId)
        );
        setSelectedVariants(updatedSelectedVariants);
        return updatedSelectedProducts;
      } else {
        // Add product
        setSelectedVariants((prevSelectedVariants) => {
          const productVariants =
            responseData
              .find((product) => product.id === productId)
              ?.variants.map((variant) => variant.id) || [];
          return [...new Set([...prevSelectedVariants, ...productVariants])];
        });
        return [...prevSelectedProducts, productId];
      }
    });
  };

  const handleVariantChange = (variantId, productId) => {
    setSelectedVariants((prevSelectedVariants) => {
      const updatedVariants = prevSelectedVariants.includes(variantId)
        ? prevSelectedVariants.filter((id) => id !== variantId)
        : [...prevSelectedVariants, variantId];

      const productHasVariantsSelected = responseData
        .find((product) => product.id === productId)
        ?.variants.some((variant) => updatedVariants.includes(variant.id));

      setSelectedProducts((prevSelectedProducts) => {
        if (productHasVariantsSelected) {
          return [...new Set([...prevSelectedProducts, productId])];
        } else {
          return prevSelectedProducts.filter((id) => id !== productId);
        }
      });

      return updatedVariants;
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = (responseData || []).filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProducts = () => {
    const selectedProductsDetails = responseData
      .filter((product) =>
        product.variants.some((variant) =>
          selectedVariants.includes(variant.id)
        )
      )
      .map((product) => ({
        productId: product.id,
        productTitle: product.title,
        imageSrc: product.image.src,
        selectedVariants: product.variants
          .filter((variant) => selectedVariants.includes(variant.id))
          .map((variant) => ({
            variantId: variant.id,
            variantTitle: variant.title,
            variantPrice: variant.price,
          })),
      }));

    onAdd(selectedProductsDetails); // Pass selected products with selected variants to parent
  };

  return (
    <div className="w-full">
      <div className="my-2 mx-8 w-[600px] h-8 border-2 border-[#0000001A] flex items-center">
        <CiSearch className="ml-2" />
        <input
          className="w-full mx-2 border-white"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
        />
      </div>

      {loading ? (
        "Loading..."
      ) : filteredProducts.length > 0 ? (
        <div className="min-h-12">
          {filteredProducts.map((product) => {
            const isProductSelected = selectedProducts.includes(product.id);
            return (
              <div key={product.id} className="w-full">
                <div className="w-full h-12 flex flex-row mt-4 px-4 border-b-2">
                  <input
                    className="mx-2 w-6 h-6 my-2 accent-givenGreen"
                    type="checkbox"
                    checked={isProductSelected}
                    onChange={() => handleProductChange(product.id)}
                  />
                  <img
                    className="w-8 h-8 mx-2 py-auto border-[1px] my-1 border-black rounded-md"
                    src={product.image.src}
                    alt={product.title}
                  />
                  <h1 className="py-2 mx-2">{product.title}</h1>
                </div>

                {/* Render product variants */}
                {product.variants.length > 0 && (
                  <div className="my-2">
                    {product.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex flex-row items-center py-4 border-b-2 pl-10"
                      >
                        <input
                          className="mx-2 w-6 h-6 accent-givenGreen"
                          type="checkbox"
                          checked={selectedVariants.includes(variant.id)}
                          onChange={() =>
                            handleVariantChange(variant.id, product.id)
                          }
                        />
                        <div className="flex flex-row justify-between flex-grow">
                          <h2 className="mx-2">{variant.title}</h2>
                          <span className="mx-5">{variant.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No products found</p>
      )}

      <div className="flex flex-row justify-between w-full h-[48px]">
        <span className="mx-4 py-2">
          {selectedProducts.length} Products Selected
        </span>
        <div className="mx-4 my-2">
          <button className="mx-2">Cancel</button>
          <button className="mx-2" onClick={handleAddProducts}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPicker;