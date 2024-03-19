import { atom } from "recoil";
import { BaseFilter } from "@/common/types";

// * User filter atom with types
export const filterValueAtom = atom(<BaseFilter>{
  key: "UsersHeader/filterValue",
  default: {
    search: "",
  },
});
