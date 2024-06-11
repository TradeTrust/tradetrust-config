import path from "path";
import { getForms } from "../utils/utils";
import { FormV2, FormV3, FormV4 } from "../types";

const dirFormsV2 = path.join(__dirname, "../../fixtures/config/forms/v2");
const dirFormsV3 = path.join(__dirname, "../../fixtures/config/forms/v3");
const dirFormsV4 = path.join(__dirname, "../../fixtures/config/forms/v4");

export const formsV2: FormV2[] = getForms(dirFormsV2);
export const formsV3: FormV3[] = getForms(dirFormsV3);
export const formsV4: FormV4[] = getForms(dirFormsV4);