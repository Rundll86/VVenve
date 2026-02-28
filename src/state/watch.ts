import { wrap } from "nine";
import { WrappedVariable } from "./vm";

export const watchingVariables = wrap<WrappedVariable[]>([]);