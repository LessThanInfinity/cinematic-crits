Hooks.once("init", () => {
  console.log("Shooting some cinmatic crits!");
});

Hooks.on("preCreateChatMessage", async (message) => {
  console.log("===in pre=== ");
  console.log(message);
  const outcome = message?.flags?.pf2e?.context?.outcome;
  // const isBlind = message.blind;
  console.log("====preCreateChatMessage====", outcome);
  console.log("ACTOR", message.actor);

  const fileFolderName = "upload/Images/Crit";
  const critFilename = `${message.actor.name}_crit.gif`;
  const bgImg = `${fileFolderName}/${critFilename}`;
  console.log("bgImg", bgImg);

  if (outcome === "criticalSuccess") {
    // const bgImg = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    // your macro here, and just put bgImg well at bgImg in your large object.
    game.modules.get("scene-transitions").api.macro(
      {
        sceneID: false,
        content: "",
        fontColor: "#ffffff",
        fontSize: "28px",
        bgImg,
        bgPos: "center center",
        bgLoop: true,
        bgMuted: true,
        bgSize: "cover",
        bgColor: "transparent",
        bgOpacity: 0.7,
        fadeIn: 400,
        delay: 2700,
        fadeOut: 400,
        audio: "",
        skippable: true,
        audioLoop: true,
        gmHide: false,
        gmEndAll: true,
        showUI: false,
        activateScene: false,
        fromSocket: false,
        users: [],
      },
      true
    );

    return "asd";
  }
});
