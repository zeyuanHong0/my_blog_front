import type { BytemdPlugin } from "bytemd";
import { visit } from "unist-util-visit";

// 复制到剪切板
const copyToClipboard = async (text: string) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      console.log("当前代码已复制到剪贴板");
    } catch (err) {
      console.error("复制代码失败，请手动复制");
      console.error("复制失败!", err);
    }
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textarea);
    } catch (err) {
      document.body.removeChild(textarea);
      console.error("无法复制到剪贴板", err);
    }
  }
};

// 一些图标
const clipboardCheckIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-check"><path d="m12 15 2 2 4-4"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const successTip = `<span style="font-size: 0.90em;">复制成功!</span>`;
// const foldBtn = `<svg t="1726055300369" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2293" width="1em" height="1em"><path d="M232 392L512 672l280-280z" fill="#707070" p-id="2294"></path></svg>`;
// const newSvgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 12h10l0 10l10-10h-10z" /></svg>`;

export function codeCopyPlugin(): BytemdPlugin {
  return {
    rehype: (processor) =>
      processor.use(() => (tree: any) => {
        visit(tree, "element", (node) => {
          if (node.tagName === "pre") {
            const codeNode = node.children.find(
              (child: any) => child.tagName === "code",
            );
            const language =
              codeNode?.properties?.className
                ?.find((cls: any) => cls.startsWith("language-"))
                ?.replace("language-", "") || "text";

            if (codeNode) {
              node.children.unshift({
                type: "element",
                tagName: "div",
                properties: {
                  className: ["code-block-extension-header"],
                },
                children: [
                  {
                    type: "element",
                    tagName: "div",
                    properties: {
                      className: ["code-block-extension-headerLeft"],
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "div",
                        properties: {
                          className: ["code-block-extension-foldBtn"],
                        },
                        children: [
                          {
                            type: "text",
                            value: "▼",
                          },
                        ],
                      },
                      {
                        type: "element",
                        tagName: "span",
                        properties: {
                          className: ["code-block-extension-lang"],
                        },
                        children: [{ type: "text", value: language }],
                      },
                    ],
                  },
                  {
                    type: "element",
                    tagName: "div",
                    properties: {
                      className: ["code-block-extension-headerRight"],
                      style: "cursor: pointer;",
                    },

                    children: [
                      {
                        type: "element",
                        tagName: "div",
                        properties: {
                          className: ["code-block-extension-copyCodeBtn"],
                          style: "filter: invert(0.5); opacity: 0.6;",
                        },
                        children: [{ type: "text", value: "复制代码" }],
                      },
                    ],
                  },
                ],
              });

              node.properties = {
                ...node.properties,
              };
            }
          }
        });
      }),

    viewerEffect({ markdownBody }) {
      const copyButtons = markdownBody.querySelectorAll(
        ".code-block-extension-copyCodeBtn",
      );
      const foldButtons = markdownBody.querySelectorAll(
        ".code-block-extension-foldBtn",
      );

      const copyHandlers: Array<{ el: Element; handler: () => void }> = [];
      const foldHandlers: Array<{ el: Element; handler: () => void }> = [];

      copyButtons.forEach((button) => {
        const handler = () => {
          const pre = button.closest("pre");
          const code = pre?.querySelector("code")?.textContent || "";
          copyToClipboard(code);

          const tmp = button.innerHTML;
          button.innerHTML = clipboardCheckIcon + successTip;
          setTimeout(() => {
            button.innerHTML = tmp;
          }, 1500);
        };
        button.addEventListener("click", handler);
        copyHandlers.push({ el: button, handler });
      });

      foldButtons.forEach((foldButton) => {
        const handler = () => {
          foldButton.classList.toggle("code-block-extension-fold");
          const pre = foldButton.closest("pre");
          if (pre) {
            // console.log(pre.style.paddingTop);
            if (pre.style.paddingTop === "1em") {
              pre.style.setProperty("padding-top", "3em", "important");
            } else {
              pre.style.setProperty("padding-top", "1em", "important");
            }
          }

          const code = pre?.querySelector("code");
          if (code) {
            code.classList.toggle("code-block-extension-fold");
          }

          const headerElement = pre?.querySelector(
            ".code-block-extension-header",
          );
          if (headerElement) {
            headerElement.classList.toggle("code-block-extension-fold");
          }
        };
        foldButton.addEventListener("click", handler);
        foldHandlers.push({ el: foldButton, handler });
      });

      // 在下次 viewerEffect 执行前移除旧的监听,否则会重复绑定事件
      return () => {
        copyHandlers.forEach(({ el, handler }) =>
          el.removeEventListener("click", handler),
        );
        foldHandlers.forEach(({ el, handler }) =>
          el.removeEventListener("click", handler),
        );
      };
    },
  };
}
