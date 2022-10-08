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

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/Projects/data";
import authorsTableData from "layouts/tables/data/authorsTableData";
import MDAvatar from "components/MDAvatar";

function Projects() {
  const [rowsData, setRows] = useState([]);
  const { columns, rows } = authorsTableData(rowsData);
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

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

    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch("http://glacial-refuge-38575.herokuapp.com/getAllUsers", requestOptions)
      .then((response) => response.json())
      .then((users) => {
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

  const downloadUsers = () => {
    var url = "http://glacial-refuge-38575.herokuapp.com/downloadUsers";
    window.open(url, "_blank", "noopener,noreferrer");
    closeMenu();
  };

  const downloadMeals = () => {
    var url = "http://glacial-refuge-38575.herokuapp.com/downloadMeals";
    window.open(url, "_blank", "noopener,noreferrer");
    closeMenu();
  };

  useEffect(() => {
    getData();
  }, []);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={downloadUsers}>Download list of users</MenuItem>
      <MenuItem onClick={downloadMeals}>Download complete Data</MenuItem>
      <MenuItem onClick={closeMenu}></MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            List of all users
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              List of all users click a column to sort by that column.
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
