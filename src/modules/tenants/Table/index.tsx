import { GridSortModel } from "@mui/x-data-grid";
import * as R from "ramda";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { RECOIL_ASYNC_STATE, SORT_DIRECTION } from "@/common/constants";
import DataGridGeneric from "@/components/DataGridGeneric";
import { RowOptions } from "./columns";
import {
  paginationAtom,
  tenantRowsAtom,
  tenantsColumnsAtom,
  tenantsQuery,
  totalWithTenantsQuery,
} from "./store";
import { Card } from "react-bootstrap";

const TenantTable = () => {
  const tenantsLoadable = useRecoilValueLoadable(tenantsQuery);
  const rows = useRecoilValue(tenantRowsAtom);
  const [columns, setColumns] = useRecoilState(tenantsColumnsAtom);
  const total = useRecoilValue(totalWithTenantsQuery);
  const [paginationModel, setPaginationModel] = useRecoilState(paginationAtom);
  const isLoading = tenantsLoadable.state === RECOIL_ASYNC_STATE.LOADING;

  const onSortModelChange = (sortModel: GridSortModel) => {
    const [sortedColumn] = sortModel;
    const newColumns = R.clone(columns);
    const [currentColumn] = R.filter(
      R.pathEq(sortedColumn.field, ["field"]),
      newColumns
    );

    newColumns.forEach((newColumn: any) => {
      if (newColumn === currentColumn) {
        currentColumn.isSorted = true;
        currentColumn.sortingOrder =
          currentColumn.sortingOrder?.[0] === SORT_DIRECTION.ASC
            ? [SORT_DIRECTION.DESC]
            : [SORT_DIRECTION.ASC];
      } else {
        newColumn.isSorted = false;
        newColumn.sortingOrder = [SORT_DIRECTION.DESC];
      }
    });

    setColumns(newColumns);
  };

  return (
    <>
      <Card className="box-content">
        <DataGridGeneric
          moduleName="Tenants"
          RowOptions={RowOptions}
          loading={isLoading}
          rows={rows}
          columns={columns}
          rowCount={total}
          disableRowSelectionOnClick
          onSortModelChange={onSortModelChange}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Card>
    </>
  );
};
TenantTable.guestGuard = false;
export default TenantTable;
