import { useState, useCallback } from "react";

export interface PaginationState {
  pageNum: number;
  pageSize: number;
  total: number;
}

export interface UsePaginationOptions {
  initialPageNum?: number;
  initialPageSize?: number;
}

export interface UsePaginationReturn extends PaginationState {
  setPageNum: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotal: (total: number) => void;
  resetPage: () => void;
  paginationProps: {
    pageNum: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
}

/**
 * 分页 Hook
 * @param options 配置项
 * @returns 分页状态和方法
 */
export const usePagination = (
  options: UsePaginationOptions = {},
): UsePaginationReturn => {
  const { initialPageNum = 1, initialPageSize = 10 } = options;

  const [pageNum, setPageNumState] = useState(initialPageNum);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [total, setTotalState] = useState(0);

  const setPageNum = useCallback((page: number) => {
    setPageNumState(page);
  }, []);

  const setPageSize = useCallback((size: number) => {
    setPageSizeState(size);
    setPageNumState(1); // 修改每页数量时重置到第一页
  }, []);

  const setTotal = useCallback((newTotal: number) => {
    setTotalState(newTotal);
  }, []);

  const resetPage = useCallback(() => {
    setPageNumState(initialPageNum);
  }, [initialPageNum]);

  return {
    pageNum,
    pageSize,
    total,
    setPageNum,
    setPageSize,
    setTotal,
    resetPage,
    paginationProps: {
      pageNum,
      pageSize,
      total,
      onPageChange: setPageNum,
      onPageSizeChange: setPageSize,
    },
  };
};
