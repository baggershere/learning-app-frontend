import React from "react";
import { useDispatch } from "react-redux";
import { addScores } from "../../redux/API/API.actions";
import {
  calculateCategoryX,
  calculateCategoryY,
  selectRandomFromArray,
  shuffle,
} from "./util";

const NounsGame = () => {
  const dispatch = useDispatch();
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const createjs = window.createjs;
  const categories = [
    "Animals",
    "Countries",
    // "Colors",
    // "three",
    // "four",
    // "five",
  ];
  const gameData = {
    Animals: [
      "Bat",
      "Bear",
      "Beaver",
      "Bird",
      "Camel",
      "Cat",
      "Chicken",
      "Cow",
      "Crab",
    ],
    Countries: [
      "England",
      "Spain",
      "France",
      "Italy",
      "America",
      "Japan",
      "China",
    ],
  };
  const animals = [];
  let selectedCategory;
  let stage, phone, loader;
  let gameState = "LOADING";
  let manifest = [
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
      id: "france",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/flag_pics/3-2-france-flag-png-image-thumb+(1).png",
    },
    {
      id: "unitedkingdom",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/flag_pics/7-2-united-kingdom-flag-png-image_400x400.png",
    },
    {
      id: "spain",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/flag_pics/5-2-spain-flag-picture_400x400+(1)+(1).png",
    },
    {
      id: "germany",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/flag_pics/germany_flag.png",
    },
    {
      id: "Bat",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/bat.png",
    },
    {
      id: "Bear",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/bear.png",
    },
    {
      id: "Beaver",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/Beaver.png",
    },
    {
      id: "Bird",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/bird.png",
    },
    {
      id: "Camel",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/camel.png",
    },
    {
      id: "Cat",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/cat.png",
    },
    {
      id: "Chicken",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/chicken.png",
    },
    {
      id: "Cow",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/cow.png",
    },
    {
      id: "Crab",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/crab.png",
    },
    {
      id: "America",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/america.png",
    },
    {
      id: "France",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/france.png",
    },
    {
      id: "China",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/china.png",
    },
    {
      id: "England",
      type: createjs.Types.IMAGE,
      src: "https://f000.backblazeb2.com/file/audio1262/nouns/images/england.png",
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
    {
      id: "Francemp3",
      type: createjs.Types.SOUND,
      src: {
        mp3: "https://f000.backblazeb2.com/file/audio1262/nouns/sounds/countries/france+(2).mp3",
        ogg: "noExtensionOggFile",
      },
    },
    {
      id: "Americamp3",
      type: createjs.Types.SOUND,
      src: {
        mp3: "https://f000.backblazeb2.com/file/audio1262/nouns/sounds/countries/america.mp3",
        ogg: "noExtensionOggFile",
      },
    },
    {
      id: "Chinamp3",
      type: createjs.Types.SOUND,
      src: {
        mp3: "https://f000.backblazeb2.com/file/audio1262/nouns/sounds/countries/china.mp3",
        ogg: "noExtensionOggFile",
      },
    },
    {
      id: "Englandmp3",
      type: createjs.Types.SOUND,
      src: {
        mp3: "https://f000.backblazeb2.com/file/audio1262/nouns/sounds/countries/england+(2).mp3",
        ogg: "noExtensionOggFile",
      },
    },
    {
      id: "Italymp3",
      type: createjs.Types.SOUND,
      src: {
        mp3: "https://f000.backblazeb2.com/file/audio1262/nouns/sounds/countries/italy.mp3",
        ogg: "noExtensionOggFile",
      },
    },
    {
      id: "Japanmp3",
      type: createjs.Types.SOUND,
      src: {
        mp3: "https://f000.backblazeb2.com/file/audio1262/nouns/sounds/countries/japan.mp3",
        ogg: "noExtensionOggFile",
      },
    },
    {
      id: "Spainmp3",
      type: createjs.Types.SOUND,
      src: {
        mp3: "https://f000.backblazeb2.com/file/audio1262/nouns/sounds/countries/spain+(2).mp3",
        ogg: "noExtensionOggFile",
      },
    },
    // {
    //   id: "unitedkingdommp3",
    //   type: createjs.Types.SOUND,
    //   src: {
    //     mp3: "https://f000.backblazeb2.com/file/audio1262/flag_pics/UK.mp3",
    //     ogg: "noExtensionOggFile",
    //   },
    // },
    // {
    //   id: "spainmp3",
    //   type: createjs.Types.SOUND,
    //   src: {
    //     mp3: "https://f000.backblazeb2.com/file/audio1262/flag_sounds/spain.mp3",
    //     ogg: "noExtensionOggFile",
    //   },
    // },
  ];

  let loadingProgress;
  let score = 18;
  let wrong = 0;
  let timer = 0;

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
      loadingProgress = Math.round(loader.progress * 100);
      runLoadingScreen();
    });
    loader.on("complete", (e) => {
      gameState = "OPTIONS";
      runGameLoop();
    });
    window.addEventListener("resize", handleResize
      // window.innerWidth < 900 ? (phone = true) : (phone = false);
      // stage.removeAllEventListeners("click");
      // stage.removeAllChildren();
      // resizeCanvas();
      // runGameLoop();
    );
    resizeCanvas();
    runGameLoop();
  };

  const handleResize = (e) => {
    window.innerWidth < 900 ? (phone = true) : (phone = false);
      stage.removeAllEventListeners("click");
      stage.removeAllChildren();
      resizeCanvas();
      runGameLoop();
  }

  // const showCurrentTimeOnScreen = () => {
  //   let time = parseInt(Math.floor(e.target.getTime() / 1000));
  //   let text = new createjs.Text(time, "20px Open Sans", "black");
  //   text.x = 400;
  //   text.y = 0;
  // };

  const runLoadingScreen = () => {
    let loadingScreen = new LoadingScreen(stage, "lightgreen", loadingProgress);
    loadingScreen.createLoadingScreen();
  };

  const runOptionsScreen = () => {
    new CategoriesScreen(stage).createCategories();
  };
  let levelStatus, levelTarget, levelOptions;
  const runLevelScreen = () => {
    if (score >= 10) {
      gameState = "RUNENDLEVEL";
      dispatch(addScores(calculateError(score, wrong), "Nouns"));
      runGameLoop();
      return;
    }
    if (!levelStatus) {
      let randomItem =
        gameData[selectedCategory][
          Math.floor(Math.random() * gameData[selectedCategory].length)
        ];
      let filteredOptions = gameData[selectedCategory].filter(
        (item) => item !== randomItem
      );
      let shuffled = shuffle(filteredOptions);
      let sliced = shuffled.slice(0, 3);
      sliced.push(randomItem);
      let final = shuffle(sliced);
      levelTarget = randomItem;
      levelOptions = final;
      levelStatus = true;
    }

    new LevelScreen(stage, levelTarget, levelOptions).createLevel();
  };

  const runEndLevel = () => {
    console.log("level complete");

    let text = new createjs.Text(
      calculateError(score, wrong),
      "20px Open Sans",
      "black"
    );
    let shape = new createjs.Shape();
    shape.graphics.beginFill("red").drawRect(100, 50, 50, 50);
    shape.on("click", (e) => {
      score = 0;
      wrong = 0;
      gameState = "OPTIONS";
      runGameLoop();
    });
    stage.addChild(text, shape);
  };

  const calculateError = (s, w) => {
    return (s / (score + w)) * 100;
  };

  const runGameLoop = () => {
    stage.removeAllChildren();
    switch (gameState) {
      case "LOADING":
        runLoadingScreen();
        break;
      case "OPTIONS":
        runOptionsScreen();
        break;
      case "RUNLEVEL":
        runLevelScreen();
        break;
      case "RUNENDLEVEL":
        runEndLevel();
        break;
      default:
        console.log("default ran");
    }
  };

  // SCREEN CLASSES

  class Screen {
    constructor(stage, color) {
      this.categories = categories;
      this.color = color;
      this.stage = stage;
    }
    createBackground() {
      let background = new createjs.Shape();
      background.graphics
        .beginFill(this.color)
        .drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);
      background.name = "background";
      this.stage.addChild(background);
    }
    createHomeButton() {
      let square = new createjs.Shape();
      square.graphics.beginFill("red").drawRect(10, 10, 50, 50);
      square.on("click", (e) => {
        levelStatus = false;
        gameState = "OPTIONS";
        runGameLoop();
      });
      this.stage.addChild(square);
    }
  }

  class LoadingScreen extends Screen {
    constructor(stage, color, percentLoaded) {
      super(stage, color);
      this.percentLoaded = percentLoaded;
    }
    createLoadingStatusText() {
      let text = new createjs.Text(
        `${this.percentLoaded}%`,
        "50px Open Sans",
        "black"
      );
      this.stage.addChild(text);
    }
    createLoadingScreen() {
      this.createBackground();
      this.createLoadingStatusText();
      //this.percentLoaded >= 100 && this.createCategories(); //new Buttons("Continue", "lightblue", "black", "40").createPlayButton();
    }
  }
  class CategoriesScreen extends Screen {
    constructor(stage) {
      super(stage);
      this.stage = stage;
    }
    createCategories() {
      score = 0;
      wrong = 0;
      for (let i = 0; i < categories.length; i++) {
        let container = new createjs.Container();
        container.name = categories[i];
        let shape = new createjs.Shape();
        shape.graphics.beginFill("white").drawRect(0, 0, 150, 150);
        let bitmap = new createjs.Bitmap(
          loader.getResult(categories[i] + "Cat")
        );
        let text = new createjs.Text(categories[i], "20px Open Sans", "black");
        let imgWidth = bitmap.image.width;
        let scale = 100 / imgWidth;
        bitmap.scaleX = scale - 0.1;
        bitmap.scaleY = scale - 0.1;
        bitmap.x = 75 - 50;
        bitmap.y = 75 - 50;
        container.y =
          calculateCategoryY(this.stage.canvas.height, i + 1) - 150 / 2;
        container.x =
          calculateCategoryX(this.stage.canvas.width, i + 1) - 150 / 2;

        container.on("mouseover", (e) => {
          container.scaleX = 1.2;
          container.scaleY = 1.2;
          container.x = container.x - 150 * 0.1;
          container.y = container.y - 150 * 0.1;
        });

        container.on("mouseout", (e) => {
          container.scaleX = 1;
          container.scaleY = 1;
          container.x = container.x + 150 * 0.1;
          container.y = container.y + 150 * 0.1;
        });

        container.on("click", (e) => {
          selectedCategory = container.name;
          gameState = "RUNLEVEL";
          runGameLoop();
        });

        container.addChild(shape, text, bitmap);
        this.stage.addChild(container);
      }
    }
  }

  class LevelScreen extends Screen {
    constructor(stage, targetItem, itemOptions) {
      super(stage);
      this.stage = stage;
      this.targetItem = targetItem;
      this.itemOptions = itemOptions;
    }
    createLevel() {
      this.createBackground();
      this.createHomeButton();
      this.createTextBox();
      this.createChoices();
      this.createScore();
    }
    createScore() {
      let text = new createjs.Text(score + "/10", "20px Open Sans", "black");
      text.set({
        x: 100,
        y: 0,
      });
      this.stage.addChild(text);
    }
    createTextBox() {
      let container = new createjs.Container();
      container.name = this.targetItem;
      let shape = new createjs.Shape();
      let text = new createjs.Text(
        this.targetItem,
        "25px Open Sans",
        "lightblack"
      );
      container.x = this.stage.canvas.width * 0.2;
      container.y = this.stage.canvas.height * 0.1;
      shape.graphics
        .beginFill("white")
        .drawRect(0, 0, this.stage.canvas.width * 0.6, 50);
      container.addChild(shape, text);
      this.stage.addChild(container);
    }
    createChoices() {
      createjs.Sound.play(this.targetItem + "mp3");
      for (let i = 0; i < this.itemOptions.length; i++) {
        let container = new createjs.Container();
        container.name = this.itemOptions[i];
        let shape = new createjs.Shape();
        shape.color = shape.graphics.beginFill("white").command;
        shape.graphics.drawRect(0, 0, 200, 200);
        let text = new createjs.Text(
          this.itemOptions[i],
          "20px Open Sans",
          "black"
        );
        let bitmap = new createjs.Bitmap(loader.getResult(this.itemOptions[i]));
        let bitmapRatio =
          bitmap.image.height < bitmap.image.width
            ? 100 / bitmap.image.width
            : 100 / bitmap.image.height;
        bitmap.scaleX = bitmapRatio - 0.1;
        bitmap.scaleY = bitmapRatio - 0.1;
        bitmap.x = 100 - 50;
        bitmap.y = 100 - 50;

        if (phone) {
          container.y =
            i === 0 || i === 1
              ? this.stage.canvas.height * 0.33 - 100
              : this.stage.canvas.height * 0.66 - 100;
          container.x =
            i === 0 || i === 2
              ? this.stage.canvas.width * 0.25 - 100
              : this.stage.canvas.width * 0.75 - 100;
        } else {
          container.y =
            i === 0 || i === 1
              ? this.stage.canvas.height * 0.4 - 100
              : this.stage.canvas.height * 0.8 - 100;
          container.x =
            i === 0 || i === 2
              ? this.stage.canvas.width * 0.25 - 100
              : this.stage.canvas.width * 0.75 - 100;
        }
        container.on("mouseover", (e) => {
          console.log(e.currentTarget);
          e.currentTarget.children[0].scaleX = 1.1;
          e.currentTarget.children[0].scaleY = 1.1;
          e.currentTarget.x = e.currentTarget.x - 10;
          e.currentTarget.y = e.currentTarget.y - 10;
          e.currentTarget.children[1].scaleX = bitmapRatio;
          e.currentTarget.children[1].scaleY = bitmapRatio;
        });
        container.on("mouseout", (e) => {
          console.log(e.currentTarget);
          e.currentTarget.children[0].scaleX = 1;
          e.currentTarget.children[0].scaleY = 1;
          e.currentTarget.x = e.currentTarget.x + 10;
          e.currentTarget.y = e.currentTarget.y + 10;
          e.currentTarget.children[1].scaleX = bitmapRatio - 0.1;
          e.currentTarget.children[1].scaleY = bitmapRatio - 0.1;
        });
        container.on("click", (e) => {
          if (e.currentTarget.name === this.targetItem) {
            score++;
            createjs.Sound.play(e.currentTarget.name + "mp3");
            createjs.Tween.get(e.currentTarget).to(
              {
                scaleX: 1,
                scaleY: 1,
                x: stage.canvas.width / 2 - 110,
                y: stage.canvas.height / 2 - 100,
              },
              200
            );
            stage.children.forEach((child) =>
              child.name !== e.currentTarget.name ? (child.alpha = 0) : null
            );
            container.removeAllEventListeners();
            new Buttons(
              "Continue",
              "white",
              "black",
              20
            ).createNextLevelButton();
          } else {
            wrong++;
            createjs.Tween.get(e.currentTarget).to({ alpha: 0 }, 1000);
          }
          levelStatus = false;
        });

        container.addChild(shape, bitmap);
        this.stage.addChild(container);
      }
    }
  }

  // BUTTONS CLASS
  class Buttons {
    constructor(text, shapeColor, textColor, fontSize) {
      this.stage = stage;
      this.text = text;
      this.shapeColor = shapeColor;
      this.textColor = textColor;
      this.fontSize = fontSize;
    }
    createPlayButton() {
      console.log("ran", this.text);
      let container = new createjs.Container();
      let shape = new createjs.Shape();
      let text = new createjs.Text(this.text, `50px Open Sans`, this.textColor);

      let textWidth = text.getMeasuredWidth();
      let textHeight = text.getMeasuredHeight();
      text.x = 0;
      text.y = 0;
      container.x = this.stage.canvas.width / 2 - textWidth / 2;
      container.y = this.stage.canvas.height / 2 - textHeight / 2;

      shape.color = shape.graphics.beginFill("lightblue").command;
      shape.graphics.drawRect(0, 0, textWidth, textHeight);

      container.on("mouseover", (e) => {
        shape.color.style = "red";
      });
      container.on("mouseout", (e) => {
        shape.color.style = "lightblue";
      });
      container.on("click", (e) => {
        gameState = "RUNLEVEL";
        runGameLoop();
      });

      container.addChild(shape, text);
      this.stage.addChild(container);
    }
    createNextLevelButton() {
      console.log(this.text);
      const container = generateButtonContainer(
        this.text,
        this.shapeColor,
        this.textColor
      );
      container.on("click", (e) => {
        stage.children.forEach((child) => {
          if (child.name !== "background") {
            createjs.Tween.get(child)
              .to({ alpha: 0 }, 300)
              .call(() => {
                runGameLoop();
              });
          }
        });
      });
      stage.addChild(container);
    }
  }

  const generateButtonContainer = (textContent, shapeColor, textColor) => {
    console.log(textContent);
    const container = new createjs.Container();
    const shape = new createjs.Shape();
    const text = new createjs.Text(textContent, "20px Open Sans", "black");
    shape.color = shape.graphics.beginFill("lightgrey").command;
    shape.graphics.drawRect(0, 0, 200, 50);
    container.x = stage.canvas.width / 2 - 100;
    container.y = phone ? 200 : 107.5;
    container.alpha = 0;
    createjs.Tween.get(container).to({ alpha: 1 }, 500);
    container.addChild(shape, text);
    return container;
  };

  function resizeCanvas() {
    if (window.innerWidth >= window.innerHeight) {
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
      window.removeEventListener("resize", handleResize)
    }
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

export default NounsGame;
