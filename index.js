"use strict";

const DATA_FILE_PATH = "data.txt";
const SQUARE_FILTER_THRESHOLD = 2;
const FIXED_OFFSET = -2;
const DEFAULT_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ARRAY_SUM_MULTIPLIER = 4;
const VALID_MODES = ["x", "y", "z"];
const DEFAULT_MODE = "x";

function isBrowserEnvironment() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function generateMessage() {
  const path = isBrowserEnvironment() ? window.location.pathname : "/";

  return `Hello world!!! Current time: ${new Date().toString()} -- path: ${path} :: ${
    Math.random() * 1000
  }`;
}

function squareAndFilter(x, y, initialArray = []) {
  const result = [...initialArray, x, y];

  return result
    .map((item) => Number(item) * Number(item))
    .filter((item) => item > SQUARE_FILTER_THRESHOLD);
}

const sumArray = (arr) => {
  if (!Array.isArray(arr)) {
    return 0;
  }

  return arr.reduce((acc, val) => acc + (Number(val) || 0), 0);
};

const readFileData = async (path) => {
  return await fetch(`${window.location.origin}/${path}`).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${path}`);
    }
    return res.text();
  });
};

function calculateWithOffset(value) {
  return (Number(value) || 0) + Math.floor(Math.random() * 10) + FIXED_OFFSET;
}

async function executeStepsSequentially(callback) {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const steps = [
    { name: "step1", duration: 10 },
    { name: "step2", duration: 20 },
    { name: "step3", duration: 50 },
    { name: "step4", duration: 100 },
  ];

  for (const step of steps) {
    await delay(step.duration);
    console.log(step.name);
  }

  if (callback) {
    callback();
  }
}

function sortArrayAscending(arr) {
  return [...arr].sort((a, b) => a - b);
}

function getUserData(user = {}) {
  const name = user.name || user.Name || "Anon";
  const age = user.age || user.Age || "??";
  const city = user.city || user.City || "";

  return `${name} - age:${age} - city:${city}`;
}

async function main() {
  console.log("Start main execution");

  if (isBrowserEnvironment()) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<p>${generateMessage()}</p>`
    );
  }

  const data = await readFileData(DATA_FILE_PATH)
    .then((text) => {
      return text.split(",").map((item) => Number(item.trim()) || 0);
    })
    .catch((error) => {
      console.error("Error reading data:", error.message);
      console.log("Using default data.");
      return DEFAULT_DATA;
    });

  const x = squareAndFilter(1, 2);
  const y = squareAndFilter(3, 4);
  const z = squareAndFilter(5, 6);
  const tempValue = sumArray(data) * ARRAY_SUM_MULTIPLIER;

  const mode = isBrowserEnvironment()
    ? window.location.hash.substring(1)
    : DEFAULT_MODE;

  if (VALID_MODES.includes(mode)) {
    console.log("MODE:", mode, "TEMP=", tempValue, "LEN=", data.length);
  } else {
    console.log("UNKNOWN MODE");
  }

  const sortedArray = sortArrayAscending(data);

  const users = [
    { Name: "Ivan", age: 30, City: "Kyiv" },
    { Name: "Olga", age: 25 },
    { age: 41, Name: "Stepan", City: "Lviv" },
  ];

  const formattedUsers = users.map(getUserData);

  console.log("Final Results:", {
    tempValue,
    sortedArray,
    originalData: data,
    processed: { x, y, z },
    formattedUsers,
    currentPath: isBrowserEnvironment() ? window.location.pathname : "/",
    timestamp: Date.now(),
    dataFilePath: DATA_FILE_PATH,
  });

  try {
    const promiseValue = await new Promise((resolve) =>
      setTimeout(() => resolve(42), 5)
    );

    console.log("Promise resolved with:", promiseValue);

    await executeStepsSequentially(() => console.log("done hell"));
  } catch (error) {
    console.error("Error in promise:", error);
  }

  console.log("Main execution done");
  return 0;
}

if (isBrowserEnvironment()) {
  window.addEventListener("load", () => {
    main().catch((error) => {
      console.error("Error in main:", error);
    });
  });
} else {
  console.log("Code is running in Node.js environment.");
}

export {
  main,
  squareAndFilter,
  sortArrayAscending,
  sumArray,
  getUserData,
  calculateWithOffset,
};
