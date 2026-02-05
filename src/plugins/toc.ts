import type { BytemdPlugin } from "bytemd";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
// import slugify from "slugify";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface TocPluginOptions {
  onChange?: (toc: TocItem[]) => void;
  minLevel?: number;
  maxLevel?: number;
}

export function tocPlugin(options: TocPluginOptions = {}): BytemdPlugin {
  const { onChange, minLevel = 1, maxLevel = 6 } = options;
  let lastTocJson = ""; // 用于比较 toc 是否变化

  return {
    remark: (processor) => {
      return processor;
    },
    rehype: (processor) => {
      // h1~h6 加 id
      return processor.use(() => (tree) => {
        visit(tree, "element", (node) => {
          if (node.tagName && /^h[1-6]$/.test(node.tagName)) {
            // 只处理指定级别的标题
            const level = Number(node.tagName[1]);
            if (level < minLevel || level > maxLevel) return;
            const text = toString(node);
            if (text) {
              const id = text
                .toLowerCase()
                .trim()
                .replace(/[\s]+/g, "-")
                .replace(/[:：]/g, "-")
                .replace(/[^\w\u4e00-\u9fa5-]/g, ""); // 只保留字母数字和中文字符
              node.properties = node.properties || {};
              node.properties.id = id;
            }
          }
        });
      });
    },
    viewerEffect: ({ markdownBody }) => {
      const headings = markdownBody.querySelectorAll("h1, h2, h3, h4, h5, h6");
      console.log("Table of Contents:", headings);
      const toc: TocItem[] = Array.from(headings)
        .map((h) => {
          return {
            id: h.id,
            text: h.textContent || "",
            level: Number(h.tagName[1]),
          };
        })
        .filter((item) => item.level >= minLevel && item.level <= maxLevel);

      // toc变化的时候才触发onChange，不然会导致无限渲染
      const currentTocJson = JSON.stringify(toc);
      if (currentTocJson !== lastTocJson) {
        lastTocJson = currentTocJson;
        onChange?.(toc);
      }
    },
  };
}

// import type { BytemdPlugin } from 'bytemd'
// import { visit } from 'unist-util-visit'
// import { toString } from 'hast-util-to-string'
// import slugify from 'slugify'

// export interface TocItem {
//   id: string
//   text: string
//   level: number
// }

// export interface TocPluginOptions {
//   onChange?: (toc: TocItem[]) => void
//   minLevel?: number
//   maxLevel?: number
// }

// export function tocPlugin(options: TocPluginOptions = {}): BytemdPlugin {
//   const {
//     onChange,
//     minLevel = 1,
//     maxLevel = 6,
//   } = options

//   return {
//     rehype(processor) {
//       const seen = new Map<string, number>()

//       processor.use(() => (tree) => {
//         visit(tree, 'element', (node: any) => {
//           if (!/^h[1-6]$/.test(node.tagName)) return

//           const level = Number(node.tagName[1])
//           if (level < minLevel || level > maxLevel) return

//           const text = toString(node)
//           if (!text) return

//           const base = slugify(text, { lower: true, strict: true })
//           const count = seen.get(base) ?? 0
//           seen.set(base, count + 1)

//           node.properties ||= {}
//           node.properties.id = count ? `${base}-${count}` : base
//         })
//       })
//     },

//     viewerEffect({ markdownBody }) {
//       const headings = markdownBody.querySelectorAll(
//         'h1,h2,h3,h4,h5,h6'
//       )

//       const toc: TocItem[] = Array.from(headings)
//         .map((h) => ({
//           id: h.id,
//           text: h.textContent ?? '',
//           level: Number(h.tagName[1]),
//         }))
//         .filter(
//           (item) =>
//             item.level >= minLevel && item.level <= maxLevel
//         )

//       onChange?.(toc)
//     },
//   }
// }
