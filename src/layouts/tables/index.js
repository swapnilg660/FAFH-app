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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useEffect, useState } from "react";
import MDAvatar from "components/MDAvatar";

function Tables() {
  const [rowsData, setRows] = useState([]);
  const { columns, rows } = authorsTableData(rowsData);
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const getData = () => {
    var urlencoded = new URLSearchParams();

    var requestOptions = {
      method: "GET",
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://glacial-refuge-38575.herokuapp.com/getAllUsers", requestOptions)
      .then((response) => response.json())
      .then((users) => {
        console.log("users: ", users);
        users.forEach((user) => {
          var row = {
            author: (
              <Author
                image="https://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg"
                name={user.fullName}
                email={user.userToken}
              />
            ),
            function: <Job title="Client" description={user.email} />,
            status: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {user.phoneNumber}
              </MDTypography>
            ),
            employed: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {user.dateOfBirth}
              </MDTypography>
            ),
            action: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {user.gender}
              </MDTypography>
            ),
            height: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {user.height} cm
              </MDTypography>
            ),
            weight: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {user.weight} kg
              </MDTypography>
            ),
          };
          setRows((prev) => [...prev, row]);
        });
      })
      .catch((error) => console.log("error: ", error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
