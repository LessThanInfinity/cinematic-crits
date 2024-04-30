const createMainDir = async () => {
  try {
    await FilePicker.createDirectory("data", "cinematic_crits");
  } catch (err) {
    console.log("Cinematic: main directory already exists");
  }
};

const createUploadDir = async () => {
  try {
    await FilePicker.createDirectory("data", "cinematic_crits/upload");
  } catch (err) {
    console.log("Cinematic: Upload directory already exists");
  }
};

const createImagesDir = async () => {
  try {
    await FilePicker.createDirectory("data", "cinematic_crits/upload/images");
  } catch (err) {
    console.log("Cinematic: Upload/images directory already exists");
  }
};

const createSoundsDir = async () => {
  try {
    await FilePicker.createDirectory("data", "cinematic_crits/upload/sounds");
  } catch (err) {
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

/**
 * Fetches expected image file for actor.
 * @param {string} actorName
 * @returns String - path to image file
 */
const getCritImageForActor = async (actorName) => {
  const imageDirectoryName = `${actorName.toLowerCase().split(" ").join("_")}`;
  try {
    const fileList = await FilePicker.browse(
      "data",
      `cinematic_crits/upload/images/${imageDirectoryName}`
    );
    const imageFiles = fileList.files.filter(
      (f) =>
        ImageHelper.hasImageExtension(f) || VideoHelper.hasVideoExtension(f)
    );
    const critImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

    /* If no files exist, send back default sound.  */
    if (critImage) {
      return critImage;
    } else {
      console.log("cinematic: No files in actor image directory");
    }
  } catch (err) {
    console.error("cinematic: Image fetch:", err);
    // send back default if error or cannot find directory
    console.log("cinematic: No actor directory found. ");
  }
  // TODO: consider whether we want to allow multiple images under a directory like with sounds.
  // const imageFileName = `${actorName.toLowerCase().split(" ").join("_")}.gif`;
  // return `cinematic_crits/upload/images/${imageFileName}`;
};

/**
 * Fetches a random audio file from the actor's directory.
 * If no files exist, sends back the default crit sound.
 * @param {string} actorName
 * @returns String - path to audio file
 */
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
    console.error("cinematic: Audio fetch:", err);
    // send back default if error or cannot find directory
    console.log("cinematic: No actor directory found. ");

    // TODO: Consider whether we want to send back default crit sound if no directory found.
    // We cannot return this because it will do a crit sound for every actor.
    // Perhaps we make this a setting.
    // return defaultCritSound;
  }
};

const fireCritCinematic = async (message) => {
  const outcome = message?.flags?.pf2e?.context?.outcome;
  const isBlind = message.blind;
  console.log("cinematic: Firing crits.");

  // Get an image to diplay and a sound to play for the cinematic.
  const bgImg = await getCritImageForActor(message.actor.name);
  const audio = await getCritSoundForActor(message.actor.name);

  // console.log("defaultCritSound", defaultCritSound);
  console.log("cinematic: bgImg", bgImg);
  console.log("cinematic: audio", audio);

  if (outcome === "criticalSuccess" && !isBlind) {
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

    return "";
  }
};

/**
 * If dice-so-nice is not enabled, we can fire the cinematic on preCreateChatMessage.
 */
Hooks.on("preCreateChatMessage", async (message) => {
  if (!Hooks.events.diceSoNiceRollComplete) {
    fireCritCinematic(message);
  }
});

/**
 * Specifically for the dice-so-nice module, wait for the roll to complete before firing the cinematic.
 */
Hooks.on("diceSoNiceRollComplete", async (messageId) => {
  const message = game.messages.get(messageId);
  fireCritCinematic(message);
});
