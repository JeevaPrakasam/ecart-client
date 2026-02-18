import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onDelete }) {
    const navigate = useNavigate();
    return (
        <div className="border border-[#bebebe] p-4 rounded shadow hover:shadow-lg transition">
            <img src={product.image} className="h-40 w-full object-contain" />
            <h2 className="font-semibold mt-2">{product.title}</h2>
            <p className="font-bold">₹ {product.price}</p>

            <div className="flex gap-2 mt-3">
                <button
                    onClick={() => navigate(`/edit/${product.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(product.id)}
                    className="bg-transparent border border-[#bebebe] text-[#2b7fff] px-3 py-1 rounded cursor-pointer"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
