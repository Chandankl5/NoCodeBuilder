import { CanvasElement, OnInsertType, OnUpdateType } from "../../types/common";
import Image from "next/image";
import defaultImage from "../../assets/default-img.jpg";
import { createPortal } from "react-dom";
import Droppable, { DropMetaData } from "../Droppable/Droppable";
import { useState, useContext, useEffect, useRef } from "react";
import { getElementById } from "../../functions/LayoutTree";
import { CanvasContext } from "../../context/CanvasContext";
import { styleHTML } from "../constants/Code";

interface RenderTypeProps {
  element: CanvasElement;
  elementProps: Record<string, any>;
  childrenElements: React.ReactNode;
  onInsert: OnInsertType;
  onUpdate: OnUpdateType;
}

function RenderType({
  element,
  elementProps,
  childrenElements,
  onInsert,
  onUpdate,
}: RenderTypeProps) {
  const { type, id } = element;
  switch (type) {
    case "document": {
      return (
        <Document
          onDrop={(e, dropMetaData) => {
            e.stopPropagation();
            if (JSON.parse(dropMetaData.other).action === "update") {
              onUpdate(e, dropMetaData);
            } else {
              onInsert(e, dropMetaData);
            }
          }}
          key={id}
        >
          {childrenElements}
        </Document>
      );
    }
    case "button": {
      return (
        <button
          id={id}
          className={`btn btn-primary ${elementProps.className}`}
          {...elementProps}
        >
          {childrenElements}
        </button>
      );
    }
    case "text": {
      return (
        <p key={id} {...elementProps} id={id}>
          {childrenElements}
        </p>
      );
    }
    case "input": {
      return (
        <input
          className={`form-control ${elementProps.className}`}
          {...elementProps}
        />
      );
    }
    case "image": {
      return (
        <Image
          src={element?.props?.src || defaultImage}
          width={element?.props?.width || 200}
          {...elementProps}
          style={{
            ...elementProps.style,
            aspectRatio: "1.5",
          }}
          alt="image"
        />
      );
    }
    case "textarea": {
      return <textarea className="form-control" key={id} {...elementProps} />;
    }
    case "checkbox": {
      return (
        <input
          type="checkbox"
          className={`form-check-input ${elementProps.className}`}
          id={id}
          {...elementProps}
        />
      );
    }
    case "radio": {
      return (
        <input
          type="radio"
          id={id}
          className={`form-check-input ${elementProps.className}`}
          {...elementProps}
        />
      );
    }
    case "switch": {
      return (
        <div className="form-check form-switch" id={id}>
          <input
            className={`form-check-input ${elementProps.className}`}
            type="checkbox"
            role="switch"
            id={id}
            {...elementProps}
          />
        </div>
      );
    }
    case "box": {
      return (
        <div id={id} {...elementProps}>
          {childrenElements}
        </div>
      );
    }
    case "card": {
      return (
        <div
          id={id}
          className={`card ${elementProps.className}`}
          {...elementProps}
        >
          <div className="card-header">{elementProps.title}</div>
          <div className="card-body">{childrenElements}</div>
        </div>
      );
    }
    case "heading": {
      return (
        <p id={id} className={elementProps.className || "h1"} {...elementProps}>
          {childrenElements}
        </p>
      );
    }
    case "link": {
      return (
        <a
          className={`link-underline-primary ${elementProps.className}`}
          id={id}
          {...elementProps}
        >
          {childrenElements}
        </a>
      );
    }
  }
}

export function Document({
  children,
  onDrop,
}: {
  children: React.ReactNode;
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
    dropMetaData: DropMetaData
  ) => void;
}) {
  const [mountTarget, setMountTarget] = useState<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { layoutTree, setSelectedElement } = useContext(CanvasContext);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectedElement(getElementById((e.target as any)?.id, layoutTree.root));
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isDragging) return;
    (e.target as HTMLElement).closest("[draggable]")?.classList.add("hovered");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isDragging) return;
    (e.target as HTMLElement)
      .closest("[draggable]")
      ?.classList.remove("hovered");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };

  const portalChiildren = (
    <Droppable
      dataTranferType="application/json"
      style={{ height: "100%", width: "100%" }}
      id=""
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e, dropMetaData) => {
        setIsDragging(false);
        onDrop(e, dropMetaData);
      }}
    >
      {children}
    </Droppable>
  );

  const staticHTML = `
  <html lang="en">
    <head>
      <meta charet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
      ${styleHTML}
    </head>
    <body>
    </body>
  </html>
  `;

  useEffect(() => {
    if (iframeRef.current) {
      setMountTarget(iframeRef.current.contentDocument?.body as HTMLDivElement);
    }
  }, []);

  return (
    <iframe
      id="canvas-frame"
      srcDoc={staticHTML}
      style={{ width: "100%", height: "100%" }}
      title="canvas"
      ref={iframeRef}
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
      onClick={handleClick}
    >
      {mountTarget && createPortal(portalChiildren, mountTarget)}
    </iframe>
  );
}

export default RenderType;
