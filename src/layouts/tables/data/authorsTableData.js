/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";

export default function data(rowsData) {
  return {
    columns: [
      { Header: "Full Name", accessor: "author", width: "45%", align: "left" },
      { Header: "Email", accessor: "function", align: "left" },
      { Header: "Phone No.", accessor: "status", align: "center" },
      { Header: "Date of Birth", accessor: "employed", align: "center" },
      { Header: "Gender", accessor: "action", align: "center" },
      { Header: "Height", accessor: "height", align: "center" },
      { Header: "Weight", accessor: "weight", align: "center" },
    ],

    rows: rowsData ? rowsData : [],
  };
}
