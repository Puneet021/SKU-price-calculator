import { FilterItem } from "../../../../models/filterItem.model";

export type FilterProps = {
  customWidth?: string;
  data: {
    label: string;
    items: FilterItem[];
  };
  setChoice: (val: string) => void;
  disabled?: boolean;
};

export type FilterStates = {
  isMenuOpen: boolean;
  currentChoice: number;
  filteredItems: FilterItem[];
};
