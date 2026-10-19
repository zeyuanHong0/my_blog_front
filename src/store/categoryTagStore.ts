import { create } from "zustand";

import { fetchCategorySelectList } from "@/api/category";
import { fetchTagSelectList } from "@/api/tag";

type SelectOption = {
  id: string;
  name: string;
};

export type CategoryTagState = {
  isLoaded: boolean;
  isLoading: boolean;
  categorySelectList: SelectOption[];
  tagSelectList: SelectOption[];
  init: () => Promise<void>;
};

let initPromise: Promise<void> | null = null;

const useCategoryTagStore = create<CategoryTagState>((set, get) => {
  return {
    isLoaded: false,
    isLoading: false,
    categorySelectList: [],
    tagSelectList: [],
    init: () => {
      if (get().isLoaded) return Promise.resolve();
      if (initPromise) return initPromise;

      set({ isLoading: true });

      initPromise = Promise.all([
        fetchCategorySelectList(),
        fetchTagSelectList(),
      ])
        .then(([categoryRes, tagRes]) => {
          set({
            isLoaded: true,
            categorySelectList: [
              { id: "0", name: "全部分类" },
              ...categoryRes.data,
            ],
            tagSelectList: [{ id: "0", name: "全部标签" }, ...tagRes.data],
          });
        })
        .finally(() => {
          set({ isLoading: false });
          initPromise = null;
        });

      return initPromise;
    },
  };
});

export default useCategoryTagStore;
