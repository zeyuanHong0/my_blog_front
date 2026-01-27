import * as React from "react";
import { Viewer } from "@bytemd/react";

import { plugins } from "./config";

interface BytemdViewerProps {
  body: string;
  otherPlugins?: any[];
}

export const BytemdViewer = ({
  body,
  otherPlugins = [],
}: BytemdViewerProps) => {
  return <Viewer value={body} plugins={[...plugins, ...otherPlugins]} />;
};
