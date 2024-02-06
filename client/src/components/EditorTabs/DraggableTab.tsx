import React from "react";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
  label: React.ReactNode;
  value: string;
  index: number;
  key: number;
  child: React.DetailedReactHTMLElement<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
}

export default function DraggableTab(props: Props) {
  return (
    <Draggable
      draggableId={`${props.index}`}
      index={props.index}
      disableInteractiveElementBlocking
    >
      {(draggableProvided) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          className="fileTab"
        >
          {React.cloneElement(props.child, {
            ...props,
            ...draggableProvided.dragHandleProps,
            style: { cursor: "pointer" },
          })}
        </div>
      )}
    </Draggable>
  );
}
