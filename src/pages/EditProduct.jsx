import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, updateProduct } from "../api/productApi";
import ProductForm from "../components/ProductForm";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProductById(id);
                setProduct(res.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleUpdate = async (data) => {
        await updateProduct(id, data);
        navigate("/");
    };

    return (
        <div className="bg-[#d7ced121]">
            <div className="p-6 max-w-lg mx-auto">
                {product ? (
                    <ProductForm onSubmit={handleUpdate} editData={product} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
