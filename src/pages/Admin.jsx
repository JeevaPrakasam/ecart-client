import { addProduct } from "../api/productApi";
import ProductForm from "../components/ProductForm";

export default function Admin() {
    const handleAdd = async (data) => {
        await addProduct(data);
        alert("Product Added!");
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <ProductForm onSubmit={handleAdd} />
        </div>
    );
}
