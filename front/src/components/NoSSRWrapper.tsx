import dynamic from "next/dynamic";
import React from "react";
import { ChildrenProps } from "@/lib/type";


const NoSSRWrapper = (props: ChildrenProps) => {
  return <React.Fragment>{props.children}</React.Fragment>
}

export default dynamic(() => {
  return Promise.resolve(NoSSRWrapper)
}, {ssr: false})