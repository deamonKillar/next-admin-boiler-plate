import React from "react";
import { Breadcrumb } from "react-bootstrap";

const Dashboard = () => {
  return (
    <div className="page-header mt-5-7 ml-4">
      <div className="page-leftheader">
        <h4 className="page-title mb-0">Dashboard</h4>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Admin</Breadcrumb.Item>
          <Breadcrumb.Item href="#" active>
            Dashboard
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Dashboard;
