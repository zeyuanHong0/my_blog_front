import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | 哲理源`;
    return () => {
      document.title = "哲理源";
    };
  }, [title]);
}
