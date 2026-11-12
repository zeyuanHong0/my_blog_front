import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { SearchIcon, SlidersHorizontal, X } from "lucide-react";

import useCategoryTagStore from "@/store/categoryTagStore";

import BlogListItem from "./list-item";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Button from "@/components/button";
import FilterDialog, { FilterDialogRef } from "./filter-dialog";
import EmptyBox from "@/components/empty";

interface Props {
  blogs: any[];
  total: number;
}

interface SimpleItem {
  id: string;
  name: string;
}

interface AppliedSearch {
  keyword: string;
  category: SimpleItem | null;
  tag: SimpleItem | null;
}

const SearchBlogList = ({ blogs, total }: Props) => {
  const formRef = useRef<FilterDialogRef>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const keywordParam = searchParams.get("keyword") ?? "";
  const searchCategoryId = searchParams.get("categoryId");
  const searchTagId = searchParams.get("tagId");

  const [inputValue, setInputValue] = useState(keywordParam); // 输入中的关键词
  const [appliedSearch, setAppliedSearch] = useState<AppliedSearch>({
    keyword: keywordParam,
    category: null,
    tag: null,
  });

  const { categorySelectList, tagSelectList, isLoaded, init } =
    useCategoryTagStore();

  // 已应用的筛选条件数量
  const filterNum =
    Number(appliedSearch.category !== null) +
    Number(appliedSearch.tag !== null);

  const isShowFilterCondition =
    filterNum > 0 || appliedSearch.keyword.trim() !== "";

  const handleShowFilterDialog = () => {
    formRef.current?.handleShowDialog();
  };

  const updateSearchParams = ({ keyword, category, tag }: AppliedSearch) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    const params = {
      keyword: keyword.trim() ? keyword : "",
      categoryId: category?.id ?? "",
      tagId: tag?.id ?? "",
    };

    nextSearchParams.delete("page");
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        nextSearchParams.set(key, value);
      } else {
        nextSearchParams.delete(key);
      }
    });

    setSearchParams(nextSearchParams);
  };

  const handleFilterChange = (
    category: SimpleItem | null,
    tag: SimpleItem | null,
  ) => {
    updateSearchParams({ keyword: inputValue, category, tag });
  };

  const handleClearFilter = () => {
    formRef.current?.handleClear();
    setInputValue("");
    updateSearchParams({
      keyword: "",
      category: null,
      tag: null,
    });
  };

  // 初始化分类和标签数据
  useEffect(() => {
    if (!isLoaded) {
      void init().catch((error) => {
        console.error("加载分类和标签失败:", error);
      });
    }
  }, [isLoaded, init]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const category =
      categorySelectList.find((c) => c.id === searchCategoryId) || null;
    const tag = tagSelectList.find((t) => t.id === searchTagId) || null;
    const appliedSearch = { keyword: keywordParam, category, tag };
    setAppliedSearch(appliedSearch);
    setInputValue(keywordParam);
  }, [
    categorySelectList,
    isLoaded,
    keywordParam,
    searchCategoryId,
    searchTagId,
    tagSelectList,
  ]);

  return (
    <>
      <div>
        {/* 搜索区域 */}
        <div className="mb-6 flex w-full items-center gap-3 px-4">
          {/* 输入框 */}
          <div className="min-w-0 flex-1">
            <InputGroup className="bg-background hover:border-foreground/20 focus-within:border-ring focus-within:ring-ring/20 h-10 rounded-xl transition-none focus-within:ring-2">
              <InputGroupInput
                placeholder="搜索文章、分类或标签"
                className="placeholder:text-muted-foreground h-full px-4 text-sm"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <InputGroupAddon align="inline-end" className="pr-2">
                {inputValue && (
                  <X
                    className="text-muted-foreground size-4 cursor-pointer"
                    onClick={() => setInputValue("")}
                  />
                )}
                <Button
                  className="hover:bg-muted rounded-full border-0 bg-transparent p-3"
                  onClick={() =>
                    updateSearchParams({
                      keyword: inputValue,
                      category: appliedSearch.category,
                      tag: appliedSearch.tag,
                    })
                  }
                >
                  <SearchIcon className="text-muted-foreground size-4" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
          {/* 筛选按钮 */}
          <Button
            type="button"
            className="bg-background text-foreground hover:bg-accent h-10 shrink-0 gap-2 rounded-3xl border-0 px-5 text-sm font-medium"
            onClick={handleShowFilterDialog}
          >
            <SlidersHorizontal className="text-muted-foreground size-4" />
            <span>
              筛选{" "}
              {filterNum > 0 && (
                <span className="text-muted-foreground">({filterNum})</span>
              )}
            </span>
          </Button>
        </div>

        {/* 搜索的条件展示 */}
        {isShowFilterCondition && (
          <div className="mb-5 flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 pr-8 pl-4 text-sm">
            <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
              {/* 输入文字 */}
              {appliedSearch.keyword.trim() !== "" && (
                <span>
                  搜索{" "}
                  <span className="text-foreground font-medium">
                    “{appliedSearch.keyword}”
                  </span>
                  <span className="text-border px-1"></span>
                </span>
              )}
              {/* 分类 */}
              {appliedSearch.category && (
                <span>
                  <span className="text-foreground font-medium">
                    {appliedSearch.category.name}
                  </span>
                  <span className="text-muted-foreground px-1">·</span>
                </span>
              )}
              {/* 标签 */}
              {appliedSearch.tag && (
                <span>
                  <span className="text-foreground font-medium">
                    #{appliedSearch.tag.name}
                  </span>
                  <span className="text-muted-foreground px-1">·</span>
                </span>
              )}
              {/* 数量 */}
              <span className="text-xs">{total} 篇匹配</span>
            </div>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 text-xs font-medium transition-colors focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none"
              onClick={handleClearFilter}
            >
              清除筛选
            </button>
          </div>
        )}

        {/* 文章列表 */}
        {blogs.length > 0 ? (
          <ul className="flex flex-col gap-10 px-4 pt-4 sm:gap-14">
            {blogs.map((el) => (
              <li key={el.id}>
                <Link
                  to={`/blog/${el.id}`}
                  className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <BlogListItem blog={el} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyBox iconSize={300} />
        )}
      </div>

      {/* 筛选弹窗 */}
      <FilterDialog
        ref={formRef}
        changeFilterItem={handleFilterChange}
        category={appliedSearch.category}
        tag={appliedSearch.tag}
        searchCategoryId={searchCategoryId}
        searchTagId={searchTagId}
      />
    </>
  );
};

export default SearchBlogList;
