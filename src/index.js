import os from "os";
import path from "path";

const main = async () => {
  // Get username from args
  const args = process.argv.slice(2);

  if (!args || args.length < 1) {
    throw new Error("Invalid input");
  }

  const username = args[0].split("=")[1];

  console.log(`Welcome to the File Manager, ${username}!`);

  process.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
  });

  let currentDirname = os.homedir();

  console.log(`You are currently in ${currentDirname}`);

  process.stdin.on("data", (data) => {
    if (data.toString().startsWith(".exit")) {
      process.kill(process.pid, "SIGINT");
      return;
    }
  });

  process.stdin.on("error", (err) => console.log("Invalid input"));
  process.stdin.on("end", () => console.log("ended"));

  process.stdin.on("data", (data) => {
    process.stdout.write(">");

    const strData = data.toString();

    const splittedData = strData.split(" ");

    const command = splittedData[0];

    switch (command.trim()) {
      case "up":
        const newDirname = path.resolve(currentDirname, "..");
        if (newDirname.startsWith(os.homedir())) {
          currentDirname = newDirname;
        }
        break;
      case "cd":
        const argPath = splittedData[1];
        if (path.isAbsolute(argPath)) {
          if (argPath.startsWith(os.homedir())) {
            currentDirname = newDirname;
          }
        } else {
          const newDirname = path.resolve(currentDirname, argPath);
          if (newDirname.startsWith(os.homedir())) {
            currentDirname = newDirname;
          }
        }
        break;

      default:
        console.log("invalid");
        break;
    }

    process.stdout.write(">");
  });

  process.stdin.on("data", (data) => {
    console.log(`You are currently in ${currentDirname}`);
  });
};

await main();
