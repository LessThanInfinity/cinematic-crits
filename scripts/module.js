Hooks.once("init", () => {
  console.log("Shooting some cinmatic crits!");
});

Hooks.on("preCreateChatMessage", async (message) => {
  const outcome = message?.flags?.pf2e?.context?.outcome;
  const isBlind = message.blind;
  console.log("============+FIRING CINEMATIC CRITS+==================");

  const fileFolderName = "upload/Images/Crit";
  /* Make names obvious: lowercase all + join with underscore. */
  const critFilename = `${message.actor.name
    .toLowerCase()
    .split(" ")
    .join("_")}.gif`;

  const bgImg = `${fileFolderName}/${critFilename}`;
  const defaultCritSound =
    "modules/cinematic-crits/assets/sfx/default_crit.wav";
  const audioFilePath = "upload/Sounds/Crit/default_crit.wav";
  console.log("audioFilePath", audioFilePath);
  console.log("defaultCritSound", defaultCritSound);

  if (outcome === "criticalSuccess" && !isBlind) {
    // const bgImg = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    // your macro here, and just put bgImg well at bgImg in your large object.
    const audioFilePath = "upload/Sounds/Crit/default_crit.wav";
    console.log("audioFilePath", audioFilePath);
    game.modules.get("scene-transitions").api.macro(
      {
        sceneID: false,
        content: "",
        fontColor: "#ffffff",
        fontSize: "28px",
        bgImg,
        bgPos: "center center",
        bgLoop: false,
        bgMuted: true,
        bgSize: "cover",
        bgColor: "transparent",
        bgOpacity: 1,
        fadeIn: 400,
        delay: 2000,
        fadeOut: 400,
        audio: defaultCritSound,
        skippable: true,
        audioLoop: false,
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
