import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchFrontBlogsByPage } from "@/api/blog";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import useDelayedSkeleton from "@/hooks/useDelayedSkeleton";

import BlogList from "@/components/SearchableBlogList";
import { BlogListSkeleton } from "@/components/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PAGE_SIZE = 10;

const Blog = () => {
  useDocumentTitle("文章");

  const [blogs, setBlogs] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const { loading, showSkeleton, executeRequest } = useDelayedSkeleton();
  const [failed, setFailed] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedPage = Number(searchParams.get("page"));
  const pageNum =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;
  const keyword = searchParams.get("keyword") ?? "";
  const categoryId = searchParams.get("categoryId") ?? "";
  const tagId = searchParams.get("tagId") ?? "";
  const totalPages = Math.ceil(total / PAGE_SIZE);

  useEffect(() => {
    let active = true;
    setFailed(false);

    void executeRequest(async () => {
      try {
        const res = await fetchFrontBlogsByPage({ pageNum, keyword, categoryId, tagId });
        if (!active) return;

        const { list, total: resultTotal } = res.data;
        const lastPage = Math.max(1, Math.ceil(resultTotal / PAGE_SIZE));
        if (pageNum > lastPage) {
          setSearchParams(
            (params) => {
              const next = new URLSearchParams(params);
              if (lastPage === 1) next.delete("page");
              else next.set("page", String(lastPage));
              return next;
            },
            { replace: true },
          );
          return;
        }
        setBlogs(list);
        setTotal(resultTotal);
      } catch (error) {
        if (!active) return;
        console.error("加载文章列表失败:", error);
        setFailed(true);
      }
    });

    return () => {
      active = false;
    };
  }, [pageNum, keyword, categoryId, tagId, executeRequest, setSearchParams]);

  const goToPage = (page: number) => {
    const next = new URLSearchParams(searchParams);
    if (page === 1) next.delete("page");
    else next.set("page", String(page));
    window.scrollTo({ top: 0, behavior: "instant" });
    setSearchParams(next);
  };

  const renderContent = () => {
    if (loading) {
      return showSkeleton ? <BlogListSkeleton /> : null;
    }
    if (failed) {
      return (
        <p className="text-muted-foreground py-12 text-center text-sm">
          文章加载失败，请刷新页面重试。
        </p>
      );
    }
    return (
      <>
        <BlogList blogs={blogs} total={total} />
        {totalPages > 1 && (
          <Pagination className="mt-10">
            <PaginationContent className="gap-3 sm:gap-4">
              <PaginationItem>
                <PaginationPrevious
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground rounded-lg"
                  disabled={pageNum <= 1}
                  onClick={() => goToPage(pageNum - 1)}
                />
              </PaginationItem>
              <PaginationItem>
                <span
                  className="text-muted-foreground inline-block min-w-10 text-center text-sm tabular-nums"
                  aria-live="polite"
                >
                  <span className="text-foreground font-medium">{pageNum}</span>
                  {" / "}
                  {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground rounded-lg"
                  disabled={pageNum >= totalPages}
                  onClick={() => goToPage(pageNum + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </>
    );
  };
  return (
    <div className="max-w-wrapper mx-auto flex min-h-screen flex-col px-6 pt-12 pb-24 md:px-8 md:pt-16 lg:px-20 xl:px-40">
      <div className="mb-10 space-y-4">
        <h2 className="text-foreground text-3xl font-extrabold tracking-tight md:text-4xl lg:text-4xl">
          文章
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
          在这里分享我的技术心得、生活感悟以及一些有趣的想法。
        </p>
        <div className="bg-primary/80 mt-4 h-1 w-20 rounded-full"></div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 flex-1 duration-700 ease-in-out">
        {renderContent()}
      </div>
    </div>
  );
};

export default Blog;
