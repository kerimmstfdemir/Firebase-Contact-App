import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CallIcon from "@mui/icons-material/Call";
import { FromStyledDiv, FormStyledHeader } from "./Form.styled";
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState } from "react";

const Form = () => {

    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
          color: 'white',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
          },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'white',
        },
        },
      );

  const genderSelect = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

  const [gender, setGender] = useState("male");

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  return (
    <div style={{display:"flex", justifyContent:"center"}}>
    <FromStyledDiv>
    <FormStyledHeader>ADD CONTACT</FormStyledHeader>
        <Box sx={{ display: "flex", alignItems: "flex-end"}}>
          <AccountCircle sx={{ color: "white", mr: 1, my: 0.5 }} />
          <CssTextField 
          name="text"
          type="text" 
          label="Name" 
          variant="standard" InputLabelProps={{style:{color:"white"}}} 
          inputProps={{style:{color:"white"}}}/>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <CallIcon sx={{ color: "white", mr: 1, my: 0.5 }} />
          <CssTextField
            type="tel"
            id="input-with-sx"
            label="Phone Number"
            variant="standard"
            InputLabelProps={{style:{color:"white"}}}
            sx={{input:{color:"white"}}}
            inputProps={{pattern:"[0-9]"}}
          />
        </Box>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": {width: "25ch" }, marginTop:"0.5rem" }}
        noValidate
        autoComplete="off">
        <div>
        <CssTextField
          id="standard-select-genderSelect"
          select
          label="Gender"
          value={gender}
          onChange={handleChange}
          variant="standard"
          InputLabelProps={{style:{color:"white"}}}
        >
          {genderSelect.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CssTextField>
        </div>
      </Box>

      <Button variant="contained">Add</Button>
      
    </FromStyledDiv>
    </div>
  );
};

export default Form;

