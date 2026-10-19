import { useEffect, useImperativeHandle, useState, forwardRef } from "react";

import useCategoryTagStore from "@/store/categoryTagStore";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FilterDialogRef {
  handleShowDialog: () => void;
}

interface Props {
  changeFilterNum: (num: number) => void;
}

const FilterDialog = forwardRef<FilterDialogRef, Props>(
  ({ changeFilterNum }, ref) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const confirmBtnText = "应用筛选";

    const [categoryId, setCategoryId] = useState("0");
    const [tagId, setTagId] = useState("0");

    const { categorySelectList, tagSelectList, isLoading, init } =
      useCategoryTagStore();

    useEffect(() => {
      if (!isDialogOpen) return;

      void init().catch((error) => {
        console.error("加载分类和标签失败:", error);
      });
    }, [init, isDialogOpen]);

    // 计算当前的筛选数量
    const filterNum = (categoryId !== "0" ? 1 : 0) + (tagId !== "0" ? 1 : 0);

    const handleShowDialog = () => {
      setIsDialogOpen(true);
    };
    const handleCancel = () => {
      setIsDialogOpen(false);
    };

    useImperativeHandle(ref, () => ({
      handleShowDialog,
    }));
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="max-h-[90vh] max-w-[90%] overflow-y-auto sm:max-w-md"
        >
          <DialogHeader>
            <DialogTitle>筛选文章</DialogTitle>
            <DialogDescription>分类与标签可组合筛选。</DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-4">
            <Field>
              <Label htmlFor="name-1">分类</Label>
              <Select
                value={categoryId}
                onValueChange={setCategoryId}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={isLoading ? "正在加载分类..." : "选择分类"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categorySelectList.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="username-1">标签</Label>
              <Select
                value={tagId}
                onValueChange={setTagId}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={isLoading ? "正在加载标签..." : "选择标签"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {tagSelectList.map((tag) => (
                      <SelectItem key={tag.id} value={tag.id}>
                        {tag.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button
              className="bg-primary text-background hover:bg-primary/90"
              disabled={isSubmitting}
              onClick={() => {
                setIsSubmitting(true);
                changeFilterNum(filterNum);
                setIsDialogOpen(false);
                setIsSubmitting(false);
              }}
            >
              {confirmBtnText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

export default FilterDialog;
