import { useEffect, useState, useMemo } from "react";
import { getProducts, deleteProduct } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

export default function Products() {
    const [products, setProducts] = useState([]);

    // Filters
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    //delete modal
    const [deleteId, setDeleteId] = useState(null);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        await deleteProduct(deleteId);
        setProducts((prev) => prev.filter((p) => p.id !== deleteId));
        setDeleteId(null);
    };

    // Fetch Products
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Debounce Search (500ms)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    const categories = useMemo(() => {
        const unique = [...new Set(products.map((p) => p.category?.toLowerCase()))];
        return unique;
    }, [products]);

    const processedProducts = useMemo(() => {
        let updated = [...products];

        if (debouncedSearch) {
            updated = updated.filter((p) =>
                p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
            );
        }

        if (category) {
            updated = updated.filter(
                (p) => p.category?.toLowerCase() === category.toLowerCase()
            );
        }

        if (sort === "low-high") {
            updated.sort((a, b) => a.price - b.price);
        } else if (sort === "high-low") {
            updated.sort((a, b) => b.price - a.price);
        } else if (sort === "a-z") {
            updated.sort((a, b) => a.title.localeCompare(b.title));
        }

        return updated;
    }, [products, debouncedSearch, category, sort]);

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = processedProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(processedProducts.length / productsPerPage);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="border focus-visible:outline-none border-[#bebebe] px-3.5 py-1 text-[14px] rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="cursor-pointer border focus-visible:outline-none border-[#bebebe] px-3.5 py-1 text-[14px] rounded"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="">All Categories</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <select
                    className="cursor-pointer focus-visible:outline-none border border-[#bebebe] px-3.5 py-1 text-[14px] rounded"
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="">Sort By</option>
                    <option value="low-high">Price: Low → High</option>
                    <option value="high-low">Price: High → Low</option>
                    <option value="a-z">Title: A → Z</option>
                </select>
            </div>
            {currentProducts.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    No products found.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {currentProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onDelete={handleDeleteClick}
                        />
                    ))}
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
            {deleteId && (
                <div className="fixed inset-0 bg-[hsla(0,0%,0%,0.5)] bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-100 text-center">
                        <h2 className="font-semibold mb-4">
                            Are you sure want to delete this product?
                        </h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-5 py-1 rounded cursor-pointer border hover:bg-gray-100"
                            >
                                No
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="px-5 py-1 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
