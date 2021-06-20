import React from "react";
import {
  collision,
  mouseObjCollision,
  placeBox,
  selectRandomFromArray,
  shuffle,
} from "./util";

const Sentences = () => {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const createjs = window.createjs;
  const manifest = [
    {
      id: "tree",
      type: createjs.Types.IMAGE,
      src: "https://db3pap007files.storage.live.com/y4mVq1Hesme1E8q6BkOZ_nHE6N2Oa7SItuOgI113jBRzI-_rQB9zIKvL7v2pKKZnoGsPrMiIUQI8DYUl_bQQz77-1NQzZdxVUwDFwImsu1MBvUGtE50EcJsaAX7K33EYM-1ZPnfa7X2IaE1xx9WohyW43LywM3Yap2PIbL-NBEP74Sw8vqfde0pVd2J7ALCFxau?width=356&height=400&cropmode=none",
    },
    {
      id: "plane",
      type: createjs.Types.IMAGE,
      src: "https://db3pap007files.storage.live.com/y4m7y0fQKNnYjL-5PztzRM5B6Ar1sNjHkZsq0rLc4L_Mvpy0pX6Raudqr1UpXb7xiG44tHSglPEN6piU0K-hSHSqhbNE_KyQyQe6JiK0GG-H2VLN4SLWGujQxVnUVHgF-KzMQYvTanr1TQnwujI54OImhyHJJZDTDiNf1WPXR9aQdFixJnPDNwZuzqxktpSoDuA?width=400&height=400&cropmode=none",
    },
    {
      id: "Italy",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/italy.png",
    },
    {
      id: "Japan",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/japan.png",
    },
    {
      id: "Spain",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/spain.png",
    },
    {
      id: "AnimalsCat",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/animalcat.png",
    },
    {
      id: "CountriesCat",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/countriesCat+(1).png",
    },
  ];

  let selectedCategory;
  let stage, phone, loader, percentLoaded, offset;
  let gameState = "LOADING";
  let categories = ["Present Simple", "Past Simple", "Future Simple"];
  let gameLevel = 1;
  let presentSimple = [
    ["I", "eat", "apples"],
    // ["He", "eats", "bananas"],
    // ["We", "drink", "water"],
  ];
  let currentBoxes = [];
  let currentWords = [];

  const init = () => {
    stage = new createjs.Stage(canvasRef.current);
    stage.enableMouseOver(10);
    createjs.Touch.enable(stage, false, true);
    createjs.Ticker.framerate = 30;
    createjs.Ticker.addEventListener("tick", stage);

    createjs.Sound.volume = 0.5;
    loader = new createjs.LoadQueue(false, null, true);
    loader.installPlugin(createjs.Sound);
    loader.loadManifest(manifest);
    loader.addEventListener("error", function (e) {
      console.log(e);
    });
    loader.on("progress", (e) => {
      let loadingProgress = Math.round(loader.progress * 100);
      percentLoaded = loadingProgress;
      runLoadingScreen();
    });
    loader.on("complete", (e) => {
      gameState = "LOADED";
      runGameLoop();
    });
    window.addEventListener("resize", handleResize);
    resizeCanvas();
  };

  // ##################################### Game loop functions ###########################################

  const runLoadingScreen = () => {
    let loadingScreen = new LoadingScreen(percentLoaded);
    loadingScreen.runLoadingScreen();
  };

  const runCategoriesScreen = () => {
    let categoriesScreen = new CategoriesScreen();
    categoriesScreen.runCategoriesScreen();
  };

  const runLevelScreen = () => {
    let levelScreen = new LevelScreen();
    levelScreen.displayLevelScreen();
  };

  // ###################################### Game classes #################################################

  class Screen {
    createBackground() {
      let background = new createjs.Shape();
      background.name = "background";
      background.graphics
        .beginFill("lightgreen")
        .drawRect(0, 0, stage.canvas.width, stage.canvas.height);
      stage.addChild(background);
    }
  }

  class LoadingScreen extends Screen {
    showPercentLoaded() {
      let text = new createjs.Text(`${percentLoaded}`, "20px Open Sans");
      stage.addChild(text);
    }
    runLoadingScreen() {
      this.createBackground();
      this.showPercentLoaded();
    }
  }

  class CategoriesScreen extends Screen {
    constructor() {
      super();
      this.categories = categories;
    }
    showCategories() {
      let categoryContainers = [];
      let categoryCoordinates = [
        {
          x: phone ? stage.canvas.width * 0.1 : stage.canvas.width * 0.05,
          y: stage.canvas.height * 0.4,
        },
        {
          x: phone ? stage.canvas.width * 0.55 : stage.canvas.width * 0.375,
          y: stage.canvas.height * 0.4,
        },
        {
          x: phone ? stage.canvas.width * 0.325 : stage.canvas.width * 0.7,
          y: phone ? stage.canvas.height * 0.525 : stage.canvas.height * 0.4,
        },
      ];
      for (let i = 0; i < this.categories.length; i++) {
        let categoryContainer = new createjs.Container();
        let categoryShape = new createjs.Shape();
        let categoryText = new createjs.Text();

        // Styling the text
        categoryText.text = categories[i];
        categoryText.font = "27px Open Sans";
        categoryText.x = 200 / 2 - categoryText.getMeasuredWidth() / 2;
        categoryText.y = 50 / 2 - categoryText.getMeasuredHeight() / 2;

        // Styling the shape
        categoryShape.color =
          categoryShape.graphics.beginFill("lightblue").command;
        categoryShape.graphics.drawRect(0, 0, 200, 50);

        // Positioning and naming the container
        categoryContainer.x = categoryCoordinates[i].x;
        categoryContainer.y = categoryCoordinates[i].y;
        categoryContainer.name = categories[i];
        categoryContainer.alpha = 0;
        createjs.Tween.get(categoryContainer).to({ alpha: 1 }, 300);

        // Mouseover event listeners
        categoryContainer.on("mouseover", (e) => {
          categoryShape.color.style = "red";
        });

        categoryContainer.on("mouseout", (e) => {
          categoryShape.color.style = "lightblue";
        });

        categoryContainer.on("click", (e) => {
          gameState = "RUN_LEVEL";
          selectedCategory = categoryContainer.name;
          fadeOutChildren(300);
          setTimeout(() => {
            runGameLoop();
          }, 300);
        });

        categoryContainer.addChild(categoryShape, categoryText);
        stage.addChild(categoryContainer);
      }
    }
    showCategoriesText() {
      const text = new createjs.Text();
      text.text = "Choose a category";
      text.font = "30px Open Sans";
      text.x = stage.canvas.width / 2 - text.getMeasuredWidth() / 2;
      text.y = stage.canvas.height * 0.25;
      text.alpha = 0;
      createjs.Tween.get(text).to({ alpha: 1 }, 300);
      stage.addChild(text);
    }
    runCategoriesScreen() {
      this.createBackground();
      this.showCategoriesText();
      this.showCategories();
    }
  }

  class LevelScreen extends Screen {
    constructor() {
      super();
      this.emptyBoxes = [];
      this.wordContainers = [];
    }
    selectRandomSentence() {
      if (selectedCategory === "Present Simple") {
        const randomSentence = selectRandomFromArray(presentSimple);
        const randomSentenceClone = [...randomSentence];
        const shuffledArray = shuffle(randomSentenceClone);
        // Assign to class
        this.randomSentence = randomSentence;
        this.shuffledArray = shuffledArray;
      }
    }
    createEmpytyBoxes() {
      // Create a container for each word in the target sentence.
      for (let i = 0; i < this.randomSentence.length; i++) {
        // Create a container that holds everything for each word
        const boxContainer = new createjs.Container();
        boxContainer.name = this.randomSentence[i] + "_box";
        boxContainer.alpha = 0;
        createjs.Tween.get(boxContainer).to({ alpha: 1 }, 300);
        const boxContainerCoordinates = placeBox(
          this.randomSentence.length,
          i,
          stage,
          phone,
          "box"
        );
        boxContainer.x = boxContainerCoordinates.x;
        boxContainer.y = boxContainerCoordinates.y;
        boxContainer.setBounds(
          boxContainer.x,
          boxContainer.y,
          phone ? 130 : 150,
          50
        );
        // Create the background
        const boxShape = new createjs.Shape();
        boxShape.color = boxShape.graphics.beginFill("white").command;
        boxShape.stroke = boxShape.graphics
          .setStrokeStyle(1)
          .beginStroke("black").command;
        boxShape.graphics.drawRect(0, 0, phone ? 130 : 150, 50);

        boxContainer.addChild(boxShape);

        currentBoxes.push(boxContainer);
      }
    }
    displayRandomWords() {
      for (let i = 0; i < this.shuffledArray.length; i++) {
        // Create random word container
        const wordContainer = new createjs.Container();
        wordContainer.name = this.shuffledArray[i] + "_word";
        let coordinates = placeBox(
          this.shuffledArray.length,
          i,
          stage,
          phone,
          "word"
        );
        wordContainer.x = coordinates.x;
        wordContainer.y = coordinates.y;
        wordContainer.setBounds(
          wordContainer.x,
          wordContainer.y,
          phone ? 130 : 150,
          50
        );
        // Create word shape
        const wordShape = new createjs.Shape();
        wordShape.color = wordShape.graphics.beginFill("lightblue").command;
        wordShape.graphics.drawRect(0, 0, phone ? 130 : 150, 50);
        // Create word text
        const wordText = new createjs.Text();
        wordText.text = this.shuffledArray[i];
        wordText.font = phone ? "25px Open Sans" : "30px Open Sans";

        wordContainer.addChild(wordShape, wordText);
        // Add dragging event listener

        currentWords.push(wordContainer);
      }
    }
    handleMovement() {
      for (let i = 0; i < currentBoxes.length; i++) {
        stage.addChild(currentBoxes[i]);
      }
      for (let i = 0; i < currentWords.length; i++) {
        stage.addChild(currentWords[i]);
        
      }

      for (let i = 0; i < currentWords.length; i++) {
        let origX = currentWords[i].x;
        let origY = currentWords[i].y;

        currentWords[i].on("mousedown", (e) => {
          console.log(origX);
          offset = {
            x: currentWords[i].x - e.stageX,
            y: currentWords[i].y - e.stageY,
          };
          stage.setChildIndex(currentWords[i], stage.getNumChildren() - 1);
        });

        currentWords[i].on("pressmove", (e) => {
          e.currentTarget.x = e.stageX + offset.x;
          e.currentTarget.y = e.stageY + offset.y;

          for (let j = 0; j < currentBoxes.length; j++) {
            if (mouseObjCollision(e.stageX, e.stageY, currentBoxes[j])) {
            }
          }
        });

        currentWords[i].on("pressup", (e) => {
          currentBoxes.forEach((box) => {
            if (mouseObjCollision(e.stageX, e.stageY, box)) {
              currentWords.forEach((word) => {
                if (word.name !== currentWords[i].name && word.x === box.x) {
                  word.x = origX;
                  word.y = origY;
                } else {
                  currentWords[i].x = box.x;
                  currentWords[i].y = box.y;
                }
              });
            }
          });
        });
      }

      //  wordContainer.on("mousedown", (e) => {
      //     offset = {
      //       x: wordContainer.x - e.stageX,
      //       y: wordContainer.y - e.stageY,
      //     };
      //   });

      //   wordContainer.on("pressmove", (e) => {
      //     e.currentTarget.x = e.stageX + offset.x;
      //     e.currentTarget.y = e.stageY + offset.y;
      //     stage.children.forEach((child) => {
      //       if (
      //         child.name &&
      //         child.name.slice(child.name.length - 4) === "_box"
      //       ) {
      //         if (
      //           mouseObjCollision(e.stageX, e.stageY, child)
      //         ) {
      //           child.children[0].stroke.style = "blue";
      //         }
      //         if (!collision(e.currentTarget, child)) {
      //           child.children[0].stroke.style = "black";
      //         }
      //       }
      //     });
      //   });

      //   wordContainer.on("pressup", e => {
      //     stage.children.forEach((child) => {
      //       if (
      //         child.name &&
      //         child.name.slice(child.name.length - 4) === "_box"
      //       ) {
      //         if (
      //           mouseObjCollision(e.stageX, e.stageY, child)
      //         ) {

      //           e.currentTarget.x = child.getBounds().x;
      //           e.currentTarget.y = child.getBounds().y;
      //         }
      //         if (!collision(e.currentTarget, child)) {
      //           child.children[0].stroke.style = "black";
      //         }
      //       }
      //     });
      //   })
    }
    displayLevelScreen() {
      this.createBackground();
      this.selectRandomSentence();
      this.createEmpytyBoxes();
      this.displayRandomWords();
      this.handleMovement();
    }
  }

  const runGameLoop = () => {
    switch (gameState) {
      case "LOADING":
        runLoadingScreen();
        break;
      case "LOADED":
        runCategoriesScreen();
        break;
      case "RUN_LEVEL":
        runLevelScreen();
        break;
      default:
        console.log("default_ran");
    }
  };

  // #################################### Util functions ############################################

  const fadeOutChildren = (time) => {
    console.log(stage.children);
    stage.children.forEach((child) => {
      child.name !== "background" &&
        createjs.Tween.get(child).to({ alpha: 0 }, time);
    });
  };

  const handleResize = (e) => {
    window.innerWidth < 900 ? (phone = true) : (phone = false);
    stage.removeAllEventListeners("click");
    stage.removeAllChildren();
    resizeCanvas();
    runGameLoop();
  };

  function resizeCanvas() {
    if (window.innerWidth >= 800) {
      phone = false;
      canvasRef.current.width = 800;
      canvasRef.current.height = 550;

      let widthToHeight = 800 / 550;
      let newWidth = window.innerWidth;
      let newHeight = window.innerHeight - 200;
      let newWidthToHeight = newWidth / newHeight;
      if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        containerRef.current.style.height = newHeight + "px";
        containerRef.current.style.width = newWidth + "px";
      } else {
        newHeight = newWidth / widthToHeight;
        containerRef.current.style.height = newHeight + "px";
        containerRef.current.style.width = newWidth + "px";
      }
    } else {
      phone = true;
      canvasRef.current.width = canvasRef ? 550 : null;
      canvasRef.current.height = canvasRef ? 800 : null;
      let widthToHeight = 550 / 800;
      let newWidth = window.innerWidth;
      let newHeight = window.innerHeight - 200;
      let newWidthToHeight = newWidth / newHeight;
      if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        containerRef.current.style.height = newHeight + "px";
        containerRef.current.style.width = newWidth + "px";
      } else {
        newHeight = newWidth / widthToHeight;
        containerRef.current.style.height = newHeight + "px";
        containerRef.current.style.width = newWidth + "px";
      }
    }
  }

  React.useEffect(() => {
    init();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <div ref={containerRef} className="canvas-holder">
      <canvas
        id="canvas2"
        ref={canvasRef}
        width="800px"
        height="550px"
      ></canvas>
    </div>
  );
};

export default Sentences;
