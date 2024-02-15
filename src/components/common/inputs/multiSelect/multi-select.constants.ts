import { FilterItemC } from "../../../../models/filterItem.model";

export interface IMultiSelectProps {
  customWidth?: string;
  data: {
    label: string;
    items: FilterItemC[];
  };
  setChecked: (ind: number, val: boolean) => void;
}
export interface IMultiSelectStates {
  isMenuOpen: boolean;
  filteredItems: FilterItemC[];
  originalItems: FilterItemC[];
  selectedItems: FilterItemC[];
  searchVal: string;
}
