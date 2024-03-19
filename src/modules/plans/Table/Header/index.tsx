import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";

//** Import the debounce */
import useDebounce from "@/common/hooks/useDebounce";

import { filterValueAtom } from "./store";
import { Button } from "@mui/material";
import AuthApi from "@/services/authApis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const setFilterValue = useSetRecoilState(filterValueAtom);

  const debounceValue = useDebounce<string>(searchValue);

  useEffect(() => {
    setFilterValue((state) => ({
      ...state,
      search: debounceValue,
    }));
  }, [debounceValue]);

  const exportData = async () => {
    await AuthApi.exportData("Plans")
      .then((data: any) => {
        toast.success(`Data Exported Successfully.`, {
          autoClose: 4000,
        });
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  };

  return (
    <Box
      sx={{
        py: 0.3,
        px: 0.5,
        rowGap: 2,
        columnGap: 4,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="dt-buttons">
        <Button
          variant="contained"
          sx={{ borderRadius: "35px" }}
          style={{
            // right: "5px",
            fontSize: "14px",
          }}
          onClick={exportData}
        >
          <span style={{ fontSize: "0.5rem" }}>CSV</span>
        </Button>
      </div>

      <Box
        sx={{
          rowGap: 2,
          px: 1.6,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div id="listUsersTable_filter" className="dataTables_filter">
          <label>
            <i className="fa fa-search search-icon"></i>
            <input
              className="form-control form-control-sm"
              type="search"
              placeholder=""
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </label>
        </div>
      </Box>
    </Box>
  );
};

export default Header;
