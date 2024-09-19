import { useRef, useState } from "react";
import ProductPicker from "./components/ProductPicker";
import ProductItem from "./components/ProductItem";
import AddProductButton from "./components/AddProductButton";
import { HiOutlineXMark } from "react-icons/hi2";

function App() {
  const dialogRef = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showVariants, setShowVariants] = useState({});
  const [discountClicked, setDiscountClicked] = useState({});

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  const handleSelectedProducts = (products) => {
    setSelectedProducts(products);
    closeDialog();
  };

  const toggleVariants = (productId) => {
    setShowVariants((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  const handleDiscount = (productId) => {
    setDiscountClicked((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  return (
    <div className="w-3/12 mx-auto my-10">
      <h1>Add Products</h1>
      <div className="my-2 flex">
        <span className="ml-10 mr-20">Product</span>
        <span className="ml-16">Discount</span>
      </div>

      {selectedProducts.length > 0 && (
        <div className="my-4">
          {selectedProducts.map((product) => (
            <ProductItem
              key={product.productId}
              product={product}
              showVariants={showVariants}
              discountClicked={discountClicked}
              toggleVariants={toggleVariants}
              handleDiscount={handleDiscount}
              openDialog={openDialog}
            />
          ))}
        </div>
      )}

      <AddProductButton openDialog={openDialog} />

      <div className="flex justify-end mt-5">
        <button
          className="w-[193px] h-[48px] border-2 border-givenGreen rounded-[4px]"
          onClick={openDialog}
        >
          Add Product
        </button>
      </div>

      <dialog
        className="w-[663px] min-h-4 max-h-[612px] rounded-md"
        ref={dialogRef}
        aria-labelledby="dialog-title"
        aria-modal="true"
        role="dialog"
      >
        <div className="flex justify-between border-b-[1px]">
          <span id="dialog-title" className="mx-4 my-2">
            Select Products
          </span>
          <button
            className="mx-4 my-2"
            onClick={closeDialog}
            aria-label="Close dialog"
          >
            <HiOutlineXMark />
          </button>
        </div>
        <ProductPicker
          isOpen={dialogRef.current?.open}
          onAdd={handleSelectedProducts}
        />
      </dialog>
    </div>
  );
}

export default App;
