import path from "path";
import { getForms } from "../utils/utils";

const dirFormsV2 = path.join(__dirname, "../../fixtures/config/forms/v2");
const dirFormsV3 = path.join(__dirname, "../../fixtures/config/forms/v3");

export const documentFormsV2 = getForms(dirFormsV2);
export const documentFormsV3 = getForms(dirFormsV3);
