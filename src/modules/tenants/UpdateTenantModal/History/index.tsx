// import React from 'react'

import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { updateTenantModalAtom } from "../store";
import { Button, Offcanvas, Table } from "react-bootstrap";
import DataGridGeneric from "@/components/DataGridGeneric";
import { RECOIL_ASYNC_STATE, SORT_DIRECTION } from "@/common/constants";
import { GridSortModel } from "@mui/x-data-grid";
import * as R from "ramda";
import {
  paginationAtomSub,
  subscriptionColumnsAtom,
  subscriptionsQuery,
  subscriptionsRowsAtom,
  totalWithSubscriptionsQuery,
} from "../../Table/store";

import { subColumns } from "../../Table/columns";


const SubscriptionHistory = () => {
  const [tenantModalState, setTenantModalState] = useRecoilState(
    updateTenantModalAtom
  );
  const subscriptionsLoadable = useRecoilValueLoadable(subscriptionsQuery);
  const rows: any = useRecoilValue(subscriptionsRowsAtom);
  const [columns, setColumns] = useRecoilState(subscriptionColumnsAtom);
  const [paginationModel, setPaginationModel] = useRecoilState(paginationAtomSub);
  const total = useRecoilValue(totalWithSubscriptionsQuery);
  const isLoading = subscriptionsLoadable.state === RECOIL_ASYNC_STATE.LOADING;

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


  const closeModal = () => {
    setTenantModalState((state) => ({
      ...state,
      tenant: null,
      type: null,
    }));
  };

  return (
    <Offcanvas
      show={tenantModalState.isOpen}
      onHide={closeModal}
      placement="end"
      style={{ width: "1250px" }}
    >
      <Offcanvas.Header
        className="card-header"
        style={{ borderBottom: "1px solid", color: "#ebecf1" }}
      >
        <Offcanvas.Title className="card-title">
          Subscription History
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="card-body p-2 app-info-form">
        <DataGridGeneric
          moduleName="History"
          loading={isLoading}
          rows={rows}
          columns={subColumns}
          rowCount={total}
          disableRowSelectionOnClick
          onSortModelChange={onSortModelChange}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />

        <div className="card-footer border-0 text-right mb-2 pr-0">
          <Button
            className="btn-cancel mr-2"
            style={{
              fontSize: "10px",
              borderRadius: "20px",
            }}
            onClick={closeModal}
          >
            Cancel
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SubscriptionHistory;
