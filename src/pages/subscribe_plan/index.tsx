import { Grid } from "@mui/material";
import React, { useState } from "react";
import { Card } from "react-bootstrap";

const SubscribePlan = () => {
  const [selectedOption, setSelectedOption] = useState("Monthly");

  const handleToggleChange = () => {
    setSelectedOption(selectedOption === "Monthly" ? "Yearly" : "Monthly");
  };

  return (
    <Grid className="col-lg-12 col-md-12 col-xm-12">
      <Card className="card border-0">
        <div className="card-body pt-2 app-info-form">
          <div className="tab-menu-heading text-center">
            <div className="tabs-menu dark-theme-target">
              <ul className="nav">
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="toggle"
                    className="toggleCheckbox"
                    checked={selectedOption === "Yearly"}
                    onChange={handleToggleChange}
                  />
                  <label htmlFor="toggle" className="toggleContainer">
                    <div
                      style={{
                        display:
                          selectedOption === "Monthly" ? "block" : "none",
                      }}
                    >
                      Monthly
                    </div>
                    <div
                      style={{
                        display: selectedOption === "Yearly" ? "block" : "none",
                      }}
                    >
                      Yearly
                    </div>
                  </label>
                </div>
              </ul>
            </div>
          </div>
          <div className="tabs-menu-body">
            <div className="tab-content">
              <div className="tab-pane  active " id="monthly_plans">
                <div className="row justify-content-md-center">
                  <div
                    className="col-lg-4 col-md-6 col-sm-12"
                    data-aos="fade-up"
                    data-aos-delay={200}
                    data-aos-once="true"
                    data-aos-duration={400}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default SubscribePlan;
