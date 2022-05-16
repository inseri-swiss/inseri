/// <reference lib="webworker" />
declare function loadPyodide(a: any)

let pyodide = null

importScripts("https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js");
const printOnConsole = (msg) => {
    self.postMessage({kind: "LOG", res: msg})
}

async function loadPyodideAndPackages() {
  pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/",
    stdout: printOnConsole
  });
}

let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
  await pyodideReadyPromise;
  const { python, param1, ...context } = event.data;

  for (const key of Object.keys(context)) {
    self[key] = context[key];
  }

  pyodide.globals.set("param1", pyodide.toPy(param1))

  try {
    await pyodide.loadPackagesFromImports(python);
    let results = await pyodide.runPython(python);
    self.postMessage({ kind: "RESULT", res: results });
  } catch (error) {
    self.postMessage({ kind: "ERROR", res: error.message });
  }
};
