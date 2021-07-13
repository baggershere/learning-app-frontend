import React from "react";

const Sentences = () => {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const createjs = window.createjs;

  let selectedCategory;
  let stage, phone, loader;

  const init = () => {
    stage = new createjs.Stage(canvasRef.current);
    stage.enableMouseOver(10);
    createjs.Touch.enable(stage, false, true);
    createjs.Ticker.framerate = 30;
    createjs.Ticker.addEventListener("tick", stage);

    createjs.Sound.volume = 0.5;
    loader = new createjs.LoadQueue(false, null, true);
    loader.installPlugin(createjs.Sound);
    // loader.loadManifest(manifest);
    // loader.addEventListener("error", function (e) {
    //   console.log(e);
    // });
    // loader.on("progress", (e) => {
    //   loadingProgress = Math.round(loader.progress * 100);
    //   runLoadingScreen();
    // });
    // loader.on("complete", (e) => {
    //   gameState = "OPTIONS";
    //   runGameLoop();
    // });
    window.addEventListener("resize", handleResize);
    resizeCanvas();
  };

  const handleResize = (e) => {
    window.innerWidth < 900 ? (phone = true) : (phone = false);
      stage.removeAllEventListeners("click");
      stage.removeAllChildren();
      resizeCanvas();
      //runGameLoop();
  }

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
