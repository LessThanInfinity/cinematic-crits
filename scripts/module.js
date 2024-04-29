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
    console.log("Cinematic: Upload/images directory already exists");
  }
};

const createSoundsDir = async () => {
  try {
    await FilePicker.createDirectory("data", "cinematic_crits/upload/sounds");
  } catch (err) {
    // console.error(err);
    console.log("Cinematic: Upload/sounds directory already exists");
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

const getCritImageForActor = async (actorName) => {
  const imageFileName = `${actorName.toLowerCase().split(" ").join("_")}.gif`;
  return `cinematic_crits/upload/images/${imageFileName}`;

  // TODO: consider whether we want to allow multiple images under a directory.
  // const critImagePath = await FilePicker.browse(
  //   "data",
  //   `cinematic_crits/upload/images/${imageFileName}`
  // );
  // return critImagePath;
};

const getCritSoundForActor = async (actorName) => {
  const audioDirectoryName = `${actorName.toLowerCase().split(" ").join("_")}`;
  const defaultCritSound =
    "modules/cinematic-crits/assets/sfx/default_crit.wav";
  try {
    const fileList = await FilePicker.browse(
      "data",
      `cinematic_crits/upload/sounds/${audioDirectoryName}`
    );
    const audioFiles = fileList.files.filter((f) =>
      AudioHelper.hasAudioExtension(f)
    );
    const critAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];

    /* If no files exist, send back default sound.  */
    if (critAudio) {
      return critAudio;
    } else {
      console.log(
        "cinematic: No files in actor audio directory. Using default crit sound"
      );
      return defaultCritSound;
    }
  } catch (err) {
    console.error("Cinematic: Audio fetch:", err);

    // send back default if error or cannot find directory
    console.log("cinematic: Using default crit sound");

    return defaultCritSound;
  }
};

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

  // const bgImg = `${fileFolderName}/${critFilename}`;

  const bgImg = await getCritImageForActor(message.actor.name);
  const audio = await getCritSoundForActor(message.actor.name);

  // console.log("defaultCritSound", defaultCritSound);
  console.log("cinematic: bgImg", bgImg);
  console.log("cinematic: audio", audio);

  // const audioFileList = await FilePicker.browse("data", 'upload/Images/Crit');

  // const imageFiles = fileList.files.filter(f => ImageHelper.hasImageExtension(f) || VideoHelper.hasVideoExtension(f));
  // const bgImg = imageFiles[Math.floor(Math.random() * imageFiles.length)];

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
        audio,
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
