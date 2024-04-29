// const fs = require("fs");

// const MAIN_DIRECTORY = "cinematic_crits/upload";
// const IMAGE_DIRECTORY = "cinematic_crits/upload/images";
// const SOUND_DIRECTORY = "cinematic_crits/upload/sounds";

const createMainDir = async () => {
  try {
    await FilePicker.createDirectory("data", "cinematic_crits");
  } catch (err) {
    // console.error(err);
    console.log("Cinematic: main directory already exists");
  }
};

const createUploadDir = async () => {
  try {
    await FilePicker.createDirectory("data", "cinematic_crits/upload");
  } catch (err) {
    // console.error(err);
    console.log("Cinematic: Upload directory already exists");
  }
};

const createImagesDir = async () => {
  try {
    await FilePicker.createDirectory("data", "cinematic_crits/upload/images");
  } catch (err) {
    // console.error(err);
    console.log("Cinematic: Upload directory already exists");
  }
};

const createSoundsDir = async () => {
  try {
    await FilePicker.createDirectory("data", "cinematic_crits/upload/sounds");
  } catch (err) {
    // console.error(err);
    console.log("Cinematic: Upload directory already exists");
  }
};

const createCinematicCritDirectories = async () => {
  await createMainDir();
  await createUploadDir();
  await createImagesDir();
  await createSoundsDir();
};

Hooks.once("init", async () => {
  console.log("Cinematic: Shooting some cinmatic crits!");
  await createCinematicCritDirectories();
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
