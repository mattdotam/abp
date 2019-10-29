import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Grid, Button, withStyles } from "@material-ui/core";
import styles from "../styles/DisplayStyles";
import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCan } from "@mdi/js";
import red from "@material-ui/core/colors/red";
import EditPhoto from "./EditPhoto";
import axios from "axios";
import Single from "./Single";

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
    }
    const maxArray = splitArray[0].map(x => 0);
    for (let i = 0; i < maxArray.length; i++) {
      for (let j = 0; j < splitArray.length; j++) {
        const totalWidth = splitArray[j]
          .slice(0, i + 1)
          .reduce((acc, cv) => acc + cv, 0);
        if (totalWidth >= maxArray[i]) {
          maxArray[i] = totalWidth;
        }
      }
    }
    return (
      splitArray[currentIndex % splitNum]
        .slice(0, Math.floor(currentIndex / splitNum))
        .reduce((acc, cv) => acc + cv, 0) -
      maxArray[Math.floor(currentIndex / splitNum) - 1] -
      1
    );
  }
};

const Display = props => {
  const { classes } = props;
  const isPortrait = useMediaQuery({
    query: "(orientation: portrait)",
  });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const handleViewportSizeChange = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", handleViewportSizeChange);
    return () => {
      window.removeEventListener("resize", handleViewportSizeChange);
    };
  }, []);
  const [heightArr, setHeightArr] = useState([]);
  const [widthArr, setWidthArr] = useState([]);

  const split = isPortrait
    ? Math.ceil(windowSize.width / 500)
    : Math.ceil(windowSize.height / 500);

  const [editPhotoObject, setEditPhotoObject] = useState({
    id: undefined,
    title: undefined,
    albumId: undefined,
    albumTitle: undefined,
    albumSlug: undefined,
    dateStamp: undefined,
    description: undefined,
    slug: undefined,
    photoData: undefined,
    tags: "",
  });
  const [openEditPhoto, setOpenEditPhoto] = React.useState(false);

  const [single, setSingle] = React.useState(false);
  const [singlePhoto, setSinglePhoto] = React.useState(undefined);

  const photoPatch = photoData => {
    axios.patch(`/.netlify/functions/photo`, {
      ...photoData,
      token: props.token,
    });
    // .then(async photoPatch => {
    //   await axios
    //     .get(`/.netlify/functions/photo`)
    //     .then(albumsList => {
    //       setAlbums(albumsList.data);
    //     });
    // });
  };

  const photoDelete = photoData => {
    axios.delete(`/.netlify/functions/photo`, {
      data: {
        ...photoData,
        token: props.token,
      },
    });
    // .then(albumDelete => {
    //   getAlbums();
    // });
  };

  return (
    <div
      className={`${classes.root} ${
        isPortrait ? classes.containerCol : classes.containerRow
      }`}>
      <span>
        <EditPhoto
          openEditPhoto={openEditPhoto}
          setOpenEditPhoto={setOpenEditPhoto}
          editPhotoObject={editPhotoObject}
          setEditPhotoObject={setEditPhotoObject}
          photoPatch={photoPatch}
        />
      </span>
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
              onClick={() => {
                setSingle(true);
                setSinglePhoto({
                  ...photo,
                  albumTitle: props.album
                    ? props.album.title
                    : photo.albumTitle,
                  albumSlug: props.album
                    ? props.album.slug
                    : photo.albumSlug,
                });
              }}
              src={photo.photoData}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                cursor: "pointer",
              }}
              alt={photo.title}
            />
            {props.token !== null && (
              <Grid
                className={classes.photoAdmin}
                direction="row"
                spacing={1}
                container>
                <Grid item>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setEditPhotoObject({
                        ...photo,
                        albumTitle: props.album
                          ? props.album.title
                          : photo.albumTitle,
                      });
                      setOpenEditPhoto(true);
                    }}>
                    <Icon
                      path={mdiPencil}
                      title="Edit Photo"
                      size={1}
                      horizontal
                      vertical
                      rotate={180}
                      color="white"
                    />
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="small"
                    variant="contained"
                    style={{
                      backgroundColor: red[500],
                    }}
                    onClick={() =>
                      photoDelete({
                        id: photo.id,
                        albumId: photo.albumId,
                      })
                    }>
                    <Icon
                      path={mdiTrashCan}
                      title="Delete Photo"
                      size={1}
                      horizontal
                      vertical
                      rotate={180}
                      color="white"
                    />
                  </Button>
                </Grid>
              </Grid>
            )}
          </div>
        );
      })}
      <Single
        single={single}
        setSingle={setSingle}
        singlePhoto={singlePhoto}
        setSinglePhoto={setSinglePhoto}
        isPortrait={isPortrait}
        windowSize={windowSize}
        setPhotosArr={props.setPhotosArr}
        setAlbum={props.setAlbum}
      />
    </div>
  );
};

export default withStyles(styles)(Display);
