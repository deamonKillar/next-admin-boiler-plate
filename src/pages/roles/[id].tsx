import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Table } from "react-bootstrap";
import { Box } from "@mui/material";
import RoleApi from "@/services/roleApis";

const INITIAL_VALUES = {
  role: "",
};

const ViewRoles = () => {
  const router = useRouter();
  const roleId: any = router.query;

  const [data, setData] = useState(INITIAL_VALUES);

  useEffect(() => {
    const getRole = async () => {
      const response: any = await RoleApi.getRoleById(roleId);
      if (response.statusCode === 200) {
        delete response.result?.id;
        setData(response.result);
      }
    };
    getRole();
  }, []);

  const listRole = () => {
    router.push("/roles");
  };

  return (
    <div className="col-xl-3 col-lg-3 col-md-12 app-main-card">
      <div className="card border-0">
        <Box className="card-header">
          <h3 className="card-title">Role Details</h3>
        </Box>

        <div className="card-body app-info-form">
          {/* <div className="table-responsive"> */}

          <Table>
            <tbody>
              {Object.entries(data).map(([key, value]) => (
                <tr key={key} className="view-content">
                  <td className="py-2 px-0 border-top-0">
                    <span className="font-weight-semibold w-50">{key}</span>
                  </td>
                  <td className="py-2 px-0 border-top-0">{value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="card-footer border-0 text-right mb-2 pr-0">
            <Button
              type="submit"
              className="btn-primary"
              style={{ fontSize: "10px", borderRadius: "20px" }}
              onClick={listRole}
            >
              Return
            </Button>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ViewRoles;
