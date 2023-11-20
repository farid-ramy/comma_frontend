import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useUrl } from "../context/UrlProvider";
import { ShowWarningAlert } from "../utilities/toastify";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BranchDetails from "./Branch/BranchDetails";
import Kitchen from "./Branch/Kitchen";
import Packages from "./Branch/Packages";
import Rooms from "./Branch/Rooms";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const { url } = useUrl();
  const { branchId } = useParams();

  const [branch, setbranch] = useState({});

  useEffect(() => {
    axios(`${url}/branches/${branchId}`)
      .then((res) => setbranch(res.data))
      .catch(() =>
        ShowWarningAlert("Please check your connection or try again later")
      );
  }, [branchId]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Branch Details" {...a11yProps(0)} />
          <Tab label="Kitchen" {...a11yProps(1)} />
          <Tab label="Packages" {...a11yProps(2)} />
          <Tab label="Rooms" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <BranchDetails branch={branch} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Kitchen branch={branch} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Packages branch={branch} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Rooms branch={branch} />
      </CustomTabPanel>
    </Box>
  );
}
