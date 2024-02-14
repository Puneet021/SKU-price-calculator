export type FilterProps = {
  customWidth?: string;
  data: {
    label: string;
    items: FilterItem[];
  };
  setChoice: (val: string) => void;
  noDefaultVal?: boolean;
};

export type FilterStates = {
  isMenuOpen: boolean;
  currentChoice: number;
  filteredItems: FilterItem[];
};

export type FilterItem = {
  id: number;
  value: number;
  name: string;
};
