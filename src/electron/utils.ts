import { execPath, platform } from "process";
import { basename } from "path";

export function isPacked() {
  const execFile = basename(execPath).toLowerCase();
  if (platform === "win32") {
    return execFile !== "electron.exe";
  }
  return execFile !== "electron";
}
