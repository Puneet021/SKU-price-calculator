import ClickButton from "../components/common/buttons/clickButton/clickButton";
import Filter from "../components/common/inputs/filter/filter";
import MultiSelect from "../components/common/inputs/multiSelect/multi-select";
import {
  deliveryComplexityFilterData,
  phasesFilterData,
  skuFilterData,
} from "./price-calc.constants";
import "./priceCalc.scss";

const PriceCalc = () => {
  return (
    <div className="mainContainer">
      <div className="tabs">
        <ClickButton
          text="Price Calculate"
          handleClick={() => {}}
          disabled={false}
        />
        <ClickButton
          text="Efforts Split"
          handleClick={() => {}}
          disabled={true}
        />
      </div>
      <div className="filters">
        <Filter data={skuFilterData} setChoice={() => {}} noDefaultVal />
        <MultiSelect data={phasesFilterData} setChecked={() => {}} />
        <Filter
          data={deliveryComplexityFilterData}
          setChoice={() => {}}
          noDefaultVal
        />
      </div>
    </div>
  );
};

export default PriceCalc;
