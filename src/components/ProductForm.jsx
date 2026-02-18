import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Left } from "../assets/images";

export default function ProductForm({ onSubmit, editData }) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();
    useEffect(() => {
        if (editData) {
            reset(editData);
        } else {
            reset({
                title: "",
                price: "",
                category: "",
                description: "",
                image: ""
            });
        }
    }, [editData, reset]);

    const submitHandler = (data) => {
        data.category = data.category.toLowerCase();
        onSubmit(data);
        reset();
        navigate("/");
    };

    return (
        <div className="bg-[#d7ced121]">
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="space-y-3 border p-4 rounded shadow"
            >
                <div className="flex items-center gap-2.5">
                    <img onClick={() => navigate('/')} src={Left} alt="Previous" className="h-4 w-4 cursor-pointer" />
                    <h2 className="text-xl mb-0 font-bold">{editData ? "Edit Product" : "Add New Product"}</h2>
                </div>
                <hr></hr>
                <div>
                    <input
                        {...register("title", {
                            required: "Title is required", pattern: {
                                message: "Only letters allowed"
                            },
                        })}
                        placeholder="Title"
                        className="w-full border p-2 rounded bg-white focus-visible:border-0 focus-visible:outline-2 focus-visible:outline-blue-500"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title.message}</p>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 1, message: "Price must be greater than 0" }
                        })}
                        placeholder="Price"
                        className="w-full border p-2 rounded bg-white focus-visible:border-0 focus-visible:outline-2 focus-visible:outline-blue-500"
                    />
                    {errors.price && (
                        <p className="text-red-500 text-sm">{errors.price.message}</p>
                    )}
                </div>
                <div>
                    <input
                        {...register("image", { required: "Image URL is required" })}
                        placeholder="Image URL"
                        className="w-full border p-2 rounded bg-white focus-visible:border-0 focus-visible:outline-2 focus-visible:outline-blue-500"
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm">{errors.image.message}</p>
                    )}
                </div>
                <div>
                    <input
                        placeholder="Category"
                        className="w-full border p-2 rounded bg-white focus-visible:border-0 focus-visible:outline-2 focus-visible:outline-blue-500"
                        {...register("category", {
                            required: "Category is required",
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Only letters allowed"
                            },
                            minLength: {
                                value: 3,
                                message: "Category must be at least 3 characters",
                            },
                        })}
                    />

                    {errors.category && (
                        <p className="text-red-500 text-sm">{errors.category.message}</p>
                    )}
                </div>
                <div>
                    <textarea
                        {...register("description", {
                            required: "Description is required"
                        })}
                        placeholder="Description"
                        className="w-full border p-2 rounded bg-white focus-visible:border-0 focus-visible:outline-2 focus-visible:outline-blue-500"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            {errors.description.message}
                        </p>
                    )}
                </div>
                <hr></hr>
                <button className="hover:bg-blue-700 bg-blue-600 cursor-pointer text-white w-full py-2 rounded transition">
                    {editData ? "Update Product" : "Add Product"}
                </button>
            </form>
        </div>
    );
}
