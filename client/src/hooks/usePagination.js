import { useCallback, useState } from "react";

export const usePagination = (pageSize = 20) => {
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });
    const resetPagination = () => setPagination({ pageIndex: 0, pageSize: pagination.pageSize })

    const handlePaginationChange = useCallback((newPagination) => {
        setPagination((prev) => ({ ...prev, ...newPagination }));
    }, []);

    return {
        pagination,
        setPagination,
        handlePaginationChange,
        resetPagination
    }
}