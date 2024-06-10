import { IPagination } from "@interface/global.interface";
import { useState } from "react";

interface PaginationProps {
    totalPages: IPagination,
    setTotalPages: React.Dispatch<React.SetStateAction<IPagination>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    rowsPerPage: number;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;

}

const Pagination: React.FC<PaginationProps> = ({ totalPages, setTotalPages, setRefresh, rowsPerPage, setRowsPerPage }) => {
    const [inputRowPerPage, setInputRowPerPage] = useState(rowsPerPage);

    const handlePrevious = () => {
        if (totalPages.currentPage > 1) {
            setTotalPages(prev => ({
                ...prev,
                currentPage: prev.currentPage - 1,
            }));
            setRefresh(prev => !prev);
        }
    };

    const handleNext = () => {
        if (totalPages.currentPage < totalPages.totalPages) {
            setTotalPages(prev => ({
                ...prev,
                currentPage: prev.currentPage + 1,
            }));
            setRefresh(prev => !prev);
        }
    };



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const value = parseInt(e.target.value); 
        setInputRowPerPage(parseInt(e.target.value));
    };

    const handleRowsPerPageChange = () => {
        setRowsPerPage(inputRowPerPage);
        setRefresh(prevRefresh => !prevRefresh);
    };

    const pageNumbers = Array.from({ length: totalPages.totalPages }, (_, index) => index + 1);

    const handlePages = (pageNumbers: number) => {
        setTotalPages({ ...totalPages, currentPage: pageNumbers })
        setRefresh(prevRefresh => !prevRefresh);

    }

    return (
        <div className="flex justify-between items-center px-2 py-2">
            {/* perpage */}
            <div className="space-x-2">
                <input
                    type="number"
                    value={inputRowPerPage}
                    className="border rounded-lg p-1 w-10 text-center"
                    onChange={handleInputChange} />
                <button
                    onClick={handleRowsPerPageChange}
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg">RowsPerPage</button>
            </div>

            {/* next and previous */}
            <div className="flex flex-col justify-center items-center">

                <div className="space-x-4">
                    <button onClick={handlePrevious} className="border-2 border-black px-2">-</button>
                    {pageNumbers.map(page => (
                        <button
                            className={`px-1 ${page === totalPages.currentPage ? 'font-bold' : ''}`}
                            onClick={() => handlePages(page)} key={page}>{page}</button>
                    ))}
                    <button onClick={handleNext} className="border-2 border-black px-2">+</button>
                </div>
                <div>
                    <span>{`Page ${totalPages.currentPage} of ${totalPages.totalPages}`}</span>
                </div>
            </div>
        </div>
    )
}

export default Pagination
