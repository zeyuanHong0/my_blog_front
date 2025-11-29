import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CircleSmall } from "lucide-react";

interface BreadCrumbProps {
  list: {
    name: string;
    href: string;
  }[];
}

const BreadCrumb = ({ list }: BreadCrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {list.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < list.length - 1 && (
              <BreadcrumbSeparator>
                <CircleSmall />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
