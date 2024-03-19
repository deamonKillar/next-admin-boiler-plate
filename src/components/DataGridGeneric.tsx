// ** Import React
import React from "react";

// ** Import DataGrid
import { DataGrid, DataGridProps, GridValidRowModel } from "@mui/x-data-grid";

// ** Import Hook
import { PAGE_SIZE_OPTIONS } from "@/common/constants";
import useCan from "@/common/hooks/useCan";

//** Import Constant */

interface IDataGridGenericProps<R extends GridValidRowModel = any>
  extends DataGridProps<R>,
    React.RefAttributes<HTMLDivElement> {
  moduleName?: string;
  RowOptions?(props: object): JSX.Element;
}

const DataGridGeneric = <K extends GridValidRowModel = any>(
  props: IDataGridGenericProps<K>
) => {
  const {
    moduleName = "",
    columns,
    RowOptions = undefined,
    ...dataGridProps
  } = props;
  const ability = useCan();

  const canEdit = ability.can("edit", moduleName);
  const canDelete = ability.can("delete", moduleName);
  const show = ability.can("show", moduleName);

  const updatedColumns =
    moduleName && RowOptions
      ? columns.map((columns) => {
          if (columns.field === "actions") {
            return {
              ...columns,
              renderCell: <T extends GridValidRowModel>({ row }: T) => {
                if (RowOptions) {
                  return <RowOptions {...{ row, canEdit, canDelete, show }} />;
                  // return <RowOptions {...{ row }} />;
                } else {
                  return null;
                }
              },
            };
          }
          return columns;
        })
      : columns;

  // listUsersTable dataTable no-footer dtr-inline
  return (
    <DataGrid
      initialState={{
        columns: {
          columnVisibilityModel: { actions: canEdit || canDelete || show },
        },
      }}
      autoHeight
      disableColumnMenu
      sortingMode="server"
      paginationMode="server"
      sx={{
        // "& .MuiDataGrid-columnHeaders": { borderRadius: 0 },
        // "& .MuiTypography-root": { color: "rgba(76, 78, 100, 1)" },
        border: "none",
      }}
      {...dataGridProps}
      columns={updatedColumns}
      pageSizeOptions={PAGE_SIZE_OPTIONS}
    />
  );
};

export default DataGridGeneric;
