import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { withStyles } from "@material-ui/core";
import styles from "../styles/DisplayStyles";

const calculateMargin = (currentIndex, splitNum, array) => {
  if (currentIndex < splitNum) {
    return 0;
  } else {
    const splitArray = [];
    // Create nested arrays within splitArray that reflect the split rows/columns in the rendered list of photos
    for (let i = 0; i < splitNum; i++) {
      splitArray.push(
        array.filter((val, idx) => idx % splitNum === i)
      );
      splitArray[i].unshift(0);
    }
    const maxArray = splitArray[0].map(x => 0);
    for (let i = 0; i < maxArray.length; i++) {
      for (let j = 0; j < splitArray.length; j++) {
        if (
          splitArray[j]
            .slice(0, i + 1)
            .reduce((acc, cv) => acc + cv, 0) >= maxArray[i]
        ) {
          maxArray[i] = splitArray[j]
            .slice(0, i + 1)
            .reduce((acc, cv) => acc + cv, 0);
        }
      }
    }
    // const margin = splitArray[currentIndex % splitNum]
    //   .map((a, i) => {
    //     return a - maxArray[i];
    //   })
    //   .slice(0, Math.ceil((currentIndex + 1) / splitNum));
    // return margin.reduce((acc, cv) => acc + cv, 0);
    return (
      splitArray[currentIndex % splitNum]
        .slice(0, Math.ceil(currentIndex / splitNum))
        .reduce((acc, cv) => acc + cv, 0) -
      maxArray[Math.floor(currentIndex / splitNum)]
    );
  }
};

// const calculateOrigin = (currentIndex, splitNum, array) => {
//   const splitArray = [];
//   for (let i = 0; i < splitNum; i++) {
//     splitArray.push(array.filter((val, idx) => idx % splitNum === i));
//     splitArray[i].unshift(0);
//   }
// };

const Display = props => {
  const { classes } = props;
  const isPortrait = useMediaQuery({
    query: "(orientation: portrait)",
  });
  const [heightArr, setHeightArr] = useState([]);
  const [widthArr, setWidthArr] = useState([]);
  const split = isPortrait
    ? Math.ceil(window.innerWidth / 500)
    : Math.ceil(window.innerHeight / 500);
  return (
    <div
      className={`${classes.root} ${
        isPortrait ? classes.containerCol : classes.containerRow
      }`}>
      {props.photosArr.map((photo, index) => {
        return (
          <div
            className={classes.photoItem}
            style={{
              width: `${
                isPortrait ? `${(1 / split) * 100}%` : `auto`
              }`,
              height: `${
                isPortrait ? `auto` : `${(1 / split) * 100}%`
              }`,
              marginLeft: `${
                isPortrait
                  ? 0
                  : calculateMargin(index, split, widthArr)
              }px`,
              marginTop: `${
                isPortrait
                  ? calculateMargin(index, split, heightArr)
                  : 0
              }px`,
            }}>
            <img
              onLoad={e => {
                setHeightArr([
                  ...heightArr,
                  (heightArr[index] = e.target.offsetHeight),
                ]);
                setWidthArr([
                  ...widthArr,
                  (widthArr[index] = e.target.offsetWidth),
                ]);
              }}
              src={photo.photoData}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
              }}
              alt={photo.title}
            />
          </div>
        );
      })}
    </div>
  );
};

export default withStyles(styles)(Display);
