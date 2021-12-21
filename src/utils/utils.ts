import fs from "fs";
import path from "path";

export const getForms = (dir: string) => {
  const forms: any[] = [];
  fs.readdirSync(dir).forEach((filename: string) => {
    const content = fs.readFileSync(path.join(dir, filename), "utf-8");
    forms.push(JSON.parse(content));
  });
  return forms;
};
