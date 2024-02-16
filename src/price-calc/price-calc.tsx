import { useSelector } from "react-redux";
import ClickButton from "../components/common/buttons/clickButton/clickButton";
import Filter from "../components/common/inputs/filter/filter";
import MultiSelect from "../components/common/inputs/multiSelect/multi-select";
import "./priceCalc.scss";
import { IStore } from "../models/store.model";
import {
  fetchAsyncTableData,
  resetFilters,
  setDeliveryComplexityFilterSelect,
  setPhasesChecked,
  setSkuFilterSelect,
} from "../store/price-calc/priceCalcSlice";
import DataTable from "../components/common/table/table";
import { useAppDispatch } from "../store/useDispatch";

const PriceCalc = () => {
  const {
    skuFilterData,
    phasesFilterData,
    deliveryComplexityFilterData,
    tableData,
  } = useSelector((store: IStore) => store.priceCalc);
  const dispatch = useAppDispatch();
  dispatch(fetchAsyncTableData());
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
        <Filter
          data={skuFilterData}
          setChoice={(val: string) =>
            dispatch(setSkuFilterSelect({ name: val }))
          }
        />
        <MultiSelect
          data={phasesFilterData}
          setChecked={(ind: number, val: boolean) =>
            dispatch(setPhasesChecked({ id: ind, isChecked: val }))
          }
        />
        <Filter
          data={deliveryComplexityFilterData}
          setChoice={(val: string) =>
            dispatch(setDeliveryComplexityFilterSelect({ name: val }))
          }
        />
      </div>
      <div className="actionBtns">
        <ClickButton
          text="Clear All"
          handleClick={() => dispatch(resetFilters())}
          disabled={false}
        />
        <ClickButton text="Proceed" handleClick={() => {}} disabled={false} />
      </div>
      {tableData?.length ? (
        <div className="table">
          <DataTable rows={tableData} />
        </div>
      ) : null}
    </div>
  );
};

export default PriceCalc;
