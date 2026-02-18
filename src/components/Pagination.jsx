import { Left, Right } from "../assets/images/index";

export default function Pagination({
    currentPage,
    totalPages,
    setCurrentPage,
}) {
    if (totalPages <= 1) return null;

    const maxVisiblePages = 5;

    let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
    );

    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border ${currentPage === 1
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-white hover:bg-blue-100 cursor-pointer"
                    }`}
            >
                <img src={Left} alt="Previous" className="h-3 w-3" />
            </button>
            {Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
            ).map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded border cursor-pointer ${currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white hover:bg-blue-100"
                        }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border ${currentPage === totalPages
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-white hover:bg-blue-100 cursor-pointer"
                    }`}
            >
                <img src={Right} alt="Next" className="h-3 w-3" />
            </button>
        </div>
    );
}
