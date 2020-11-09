import React from "react";
import { map } from "lodash";
import { withFormik } from "formik";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import { Button, Grid, Link, makeStyles, Typography } from "@material-ui/core";
import { lightBlue } from "@material-ui/core/colors";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import clsx from "clsx";

import { InputField } from "../../../../components";
import { GoogleSvg, FacebookSvg } from "../../../../constants";
import "./styles.scss";

const inputProps = [
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
];

const _renderInput = (props) => {
  const { inputProps = [], onChange, errors, handleBlur, values } = props;
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

const useStyles = makeStyles((theme) => ({
  button: {
    padding: "1rem 2rem",
    marginTop: "3rem",
    color: "white",
    borderRadius: "30px",
    boxShadow: `0px 5px 20px -2px ${lightBlue[300]}`,
  },
  text: {
    fontWeight: 900,
    letterSpacing: 3,
  },
  socialLogin: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: theme.spacing(1, 0),
    backgroundColor: "#fff",
    transition: "opacity 0.2s ease, background 0.2s ease",
    // border: '1px solid #aaa',
    padding: theme.spacing(1, 2),

    borderRadius: 30,
    "&:hover": {
      opacity: "0.8",
      "& $buttonText": {
        color: "#fff",
      },
    },
  },
  facebook: {
    boxShadow: "0px 2px 15px -4px #bccbf5",
    "&:hover": {
      backgroundColor: "#3C5898",
    },
  },
  google: {
    boxShadow: "0px 2px 15px -4px #f5b9b5",
    "&:hover": {
      backgroundColor: "#F65312",
    },
  },
  buttonText: {
    textTransform: "initial",
    color: "#000",
    fontWeight: 500,
    transition: "color 0.2s ease",
  },
  svg: {
    marginRight: "1rem",
    width: "2.6rem",
    height: "2.6rem",
  },
}));

const LoginForm = (props) => {
  const {
    values,
    // touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    googleSignIn,
    facebookSignIn,
  } = props;
  const classes = useStyles();

  const _responseGoogle = ({ profileObj: { email, googleId, name } }) => {
    googleSignIn({ email, googleId, name });
  };

  const _failGoogle = (err) => {
    console.log("VCL");
    console.log(err);
  };

  const responseFacebook = ({ name, id }) => {
    facebookSignIn({ id, name });
  };

  return (
    <form onSubmit={handleSubmit} className="LoginForm spacing-vertical-l">
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
        <Grid item xs={6}>
          <Link href="/" color="error" underline="none">
            <Typography align="left" variant="body1">
              Back to home page
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link href="/register" color="error" underline="none">
            <Typography align="right" variant="body1">
              Register here
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Typography className="divider" type="body1">
        OR
      </Typography>
      <GoogleLogin
        clientId="388165780875-depk0657p2fkgbdi2e7rnjvcrueocfqd.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={_responseGoogle}
        onFailure={_failGoogle}
        onClick={() => console.log("google clicked")}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <Button
            // type="button"
            onClick={renderProps.onClick}
            className={clsx(classes.socialLogin, classes.google)}
          >
            <img className={classes.svg} src={GoogleSvg} alt="" />
            <Typography className={classes.buttonText} variant="body1">
              Sign in with google
            </Typography>
          </Button>
        )}
      />
      <FacebookLogin
        appId="274806887289221"
        autoLoad={true}
        fields="name,email,picture"
        // onClick={() => console.log("facebook click")}
        // onFailure={() => console.log("FAILED")}
        // callback={responseFacebook}
        render={(renderProps) => (
          <Button
            // type="button"
            // onClick={renderProps.onClick}
            className={clsx(classes.socialLogin, classes.facebook)}
          >
            <img className={classes.svg} src={FacebookSvg} alt="" />
            <Typography className={classes.buttonText} variant="body1">
              Sign in with facebook
            </Typography>
          </Button>
        )}
      />
    </form>
  );
};

const EnhancedLogin = withFormik({
  mapPropsToValues: ({ email, password }) => ({
    email: email || "",
    password: password || "",
  }),
  // validationSchema: registerSchema,
  handleSubmit: (values, { props }) => {
    props.loginUser(values);
  },
})(LoginForm);

export default EnhancedLogin;
