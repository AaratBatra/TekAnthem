

export const ColumnResizer = ({
  header,
}) => {
  if (header.column.getCanResize() === false) return <></>;

  return (
    <div
        onMouseDown={header.getResizeHandler()}
        onTouchStart={header.getResizeHandler()}
        onDoubleClick={()=>header.column.resetSize()}
        className="absolute top-0 right-0 rounded-lg cursor-col-resize max-md:w-1 w-px h-12 hover:bg-sky-600 hover:w-1"
        style= {{
          userSelect: "none",
          touchAction: "none",
        }}
    />
  );
};