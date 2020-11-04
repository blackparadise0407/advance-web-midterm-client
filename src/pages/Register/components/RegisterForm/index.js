import React from "react";
import { map } from "lodash";
import { withFormik } from "formik";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import { InputField } from "../../../../components";
// import { registerSchema } from "../../../../helpers/validation";
import "./styles.scss";
import { Button, Grid, Link, makeStyles, Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const inputProps = [
  {
    id: "username",
    label: "Username",
    type: "text",
    icon: AccountCircleIcon,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    icon: EmailIcon,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    icon: LockIcon,
  },
  {
    id: "confirmPassword",
    label: "Confirm password",
    type: "password",
    icon: LockIcon,
  },
];

const _renderInput = (props) => {
  const {
    inputProps = [],
    onChange,
    errors,
    handleBlur,
    // touched,
    values,
  } = props;
  if (inputProps.length) {
    return (
      <React.Fragment>
        {map(inputProps, (per, idx) => (
          <div key={idx} className="FormInput">
            <InputField
              type={per.type}
              id={per.id}
              name={per.id}
              placeholder={per.label}
              errors={errors[per.id]}
              // touched={touched[per.id]}
              value={values[per.id]}
              onBlur={handleBlur}
              onChange={onChange}
              Icon={per.icon}
              label={per.label}
            />
          </div>
        ))}
      </React.Fragment>
    );
  } else return null;
};

const useStyles = makeStyles({
  button: {
    padding: "1rem 2rem",
    marginTop: "3rem",
    color: "white",
    borderRadius: "30px",
    boxShadow: `0px 5px 20px -2px ${blue[200]}`,
  },
  text: {
    fontWeight: 900,
    letterSpacing: 3,
  },
});

const RegisterForm = (props) => {
  const {
    values,
    // touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = props;
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit} className="RegisterFrom spacing-vertical-l">
      {_renderInput({
        inputProps: inputProps,
        values,
        errors,
        onChange: handleChange,
        handleBlur,
      })}
      <Button
        size="large"
        className={classes.button}
        variant="contained"
        color="secondary"
        type="submit"
      >
        <Typography className={classes.text} variant="h5">
          Submit
        </Typography>
      </Button>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Link href="/" color="error" underline="none">
            <Typography align="left" variant="body1">
              Back to home page
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link href="/login" color="error" underline="none">
            <Typography align="right" variant="body1">
              Login here
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

const EnhancedRegister = withFormik({
  mapPropsToValues: ({ username, email, password, confirmPassword }) => ({
    username: username || "",
    email: email || "",
    password: password || "",
    confirmPassword: confirmPassword || "",
  }),
  // validationSchema: registerSchema,
  handleSubmit: ({ username, email, password }, { props }) => {
    console.log(username, email, password);
    props.registerUser({ username, email, password });
  },
})(RegisterForm);

export default EnhancedRegister;
