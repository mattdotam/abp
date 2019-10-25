export default function getBrowserSettings(width, height) {
  const direction = width >= height ? "row" : "column";
  const stack =
    direction === "column"
      ? Math.floor(width / 600) + 1
      : Math.floor(height / 400) + 1;

  const overflowX = direction === "column" ? "hidden" : "visible";
  const overflowY = direction === "row" ? "visible" : "hidden";

  let stackHeight;
  let stackWidth;

  if (direction === "column") {
    stackHeight = "auto";
    stackWidth = width / stack;
  } else {
    stackWidth = "auto";
    stackHeight = height / stack;
  }

  const imgWidth = direction === "column" ? stackWidth : "auto";
  const imgHeight = direction === "row" ? stackHeight : "auto";

  return {
    direction,
    overflowX,
    overflowY,
    imgWidth,
    imgHeight,
    stack: {
      number: stack,
      height: stackHeight,
      width: stackWidth,
    },
  };
}
