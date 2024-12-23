import { useCallback, useState } from "react";

export const useFilters = (resetPagination, initialFilters) => {
    const [filters, setFilters] = useState(initialFilters);
    const resetFilter = useCallback(() => {
        setFilters(initialFilters);
        resetPagination && resetPagination()
    }, [initialFilters, resetPagination]);
    const handleFilterChange = useCallback((name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
        resetPagination && resetPagination();
    }, [setFilters, resetPagination]);
    return {
        filters,
        setFilters,
        handleFilterChange,
        resetFilter
    }
}
