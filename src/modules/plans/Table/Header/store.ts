import { atom } from "recoil";
import { BaseFilter } from "@/common/types";

// * plan filter atom with types
export const filterValueAtom = atom(<BaseFilter>{
  key: "PlansHeader/filterValue",
  default: {
    search: "",
  },
});
