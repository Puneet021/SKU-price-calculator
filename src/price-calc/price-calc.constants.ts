export const skuFilterData: {
  label: string;
  items: FilterItem[];
} = {
  label: "SKUs Offered",
  items: [{ id: 0, value: 0, name: "Mobile App Development" }],
};

export const phasesFilterData: {
  label: string;
  items: FilterItemC[];
} = {
  label: "In-Scope Phases",
  items: [
    { id: 0, checked: false, name: "Define" },
    { id: 1, checked: false, name: "Shape" },
    { id: 2, checked: false, name: "Build" },
    { id: 3, checked: false, name: "Scale" },
  ],
};

export const deliveryComplexityFilterData: {
  label: string;
  items: FilterItem[];
} = {
  label: "Delivery Complexity",
  items: [
    { id: 0, value: 0, name: "Aggressive" },
    { id: 1, value: 1, name: "Longer" },
    { id: 2, value: 2, name: "Standard" },
  ],
};

export type FilterItem = {
  id: number;
  value: number;
  name: string;
};

type FilterItemC = {
  id: number;
  name: string;
  checked: boolean;
};
