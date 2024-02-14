export interface IMultiSelectProps {
  customWidth?: string;
  data: {
    label: string;
    items: FilterItem[];
  };
  setChecked: (ind: number, val: boolean) => void;
}
export interface IMultiSelectStates {
  isMenuOpen: boolean;
  filteredItems: FilterItem[];
  originalItems: FilterItem[];
  selectedItems: FilterItem[];
  searchVal: string;
}

type FilterItem = {
  id: number;
  name: string;
  checked: boolean;
};
