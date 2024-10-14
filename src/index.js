import os from "os";

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

  process.stdin.on("data", (data) => {
    console.log(`You are currently in ${currentDirname}`);
  });

  process.stdin.on("data", (data) => {});

  process.stdin.on("error", (err) => console.log("Invalid input"));
  process.stdin.on("end", () => console.log("ended"));
};

await main();
