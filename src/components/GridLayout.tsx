import React, {
  FunctionComponent,
  HTMLAttributes,
  PropsWithChildren,
} from "react";

import "./GridLayout.css";

const Grid: FunctionComponent<
  HTMLAttributes<PropsWithChildren<HTMLDivElement>>
> = ({ children, ...props }) => {
  return (
    <div className="gridLayout" {...props}>
      {children}
    </div>
  );
};

export default Grid;
