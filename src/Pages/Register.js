import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import {
  validEmail,
  validName,
  validPassword,
  validSellerId,
} from "../Components/Regex";
import { ModalContext } from "../Routers";
import "../Styles/Register.css";

const Register = () => {
  const modalContextValues = useContext(ModalContext);
  const userListDetails = JSON.parse(localStorage.getItem("userList"));
  console.log("userListDetails", userListDetails);
  const [sellerRegister, setSellerRegister] = useState(false);
  // const [seller_id, setSeller_id] = useState(null);

  const [registerCredentials, setRegisterCredentials] = useState({
    first_name: "",
    last_name: "",
    user_email: "",
    user_password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
  });

  // -----------------------------OnChange with Error handling-------------------
  const handleOnChange = (e) => {
    if (e.target.name == "first_name") {
      if (e.target.value == "") {
        setErrorMessage({ ...errorMessage, ["firstNameError"]: false });
      } else {
        if (!validName.test(e.target.value)) {
          setErrorMessage({
            ...errorMessage,
            ["firstNameError"]:
              "Numbers, Special characters and Space are not allowed",
          });
        } else {
          setRegisterCredentials({
            ...registerCredentials,
            [e.target.name]: e.target.value,
          });
          setErrorMessage({ ...errorMessage, ["firstNameError"]: false });
        }
      }
    } else if (e.target.name == "last_name") {
      if (e.target.value == "") {
        setErrorMessage({ ...errorMessage, ["lastNameError"]: false });
      } else {
        if (!validName.test(e.target.value)) {
          setErrorMessage({
            ...errorMessage,
            ["lastNameError"]:
              "Numbers, Special characters and Space are not allowed",
          });
        } else {
          setRegisterCredentials({
            ...registerCredentials,
            [e.target.name]: e.target.value,
          });
          setErrorMessage({ ...errorMessage, ["lastNameError"]: false });
        }
      }
    } else if (e.target.name == "user_email") {
      if (e.target.value == "") {
        setErrorMessage({ ...errorMessage, ["emailError"]: false });
      } else {
        if (!validEmail.test(e.target.value.toLowerCase())) {
          setErrorMessage({
            ...errorMessage,
            ["emailError"]: "Example: email@text.com",
          });
        } else {
          const alreadyPresent = userListDetails.find(
            (item) => item.user_email == e.target.value
          );
          console.log("alreadyPresent", alreadyPresent);
          if (alreadyPresent) {
            setErrorMessage({
              ...errorMessage,
              ["emailError"]: "Email is already registered",
            });
          } else {
            setRegisterCredentials({
              ...registerCredentials,
              [e.target.name]: e.target.value.toLowerCase(),
            });
            setErrorMessage({ ...errorMessage, ["emailError"]: false });
          }
        }
      }
    } else if (e.target.name == "user_password") {
      setRegisterCredentials({
        ...registerCredentials,
        [e.target.name]: e.target.value,
      });
      if (e.target.value == "") {
        setErrorMessage({ ...errorMessage, ["passwordError"]: false });
      } else {
        if (e.target.value.length >= 8 && e.target.value.length <= 15) {
          if (!validPassword.test(e.target.value)) {
            setErrorMessage({
              ...errorMessage,
              ["passwordError"]:
                "Atleast one numberic, Upper, Lower and Special characters be there",
            });
          } else {
            setRegisterCredentials({
              ...registerCredentials,
              [e.target.name]: e.target.value,
            });
            setErrorMessage({ ...errorMessage, ["passwordError"]: false });
          }
        } else {
          setErrorMessage({
            ...errorMessage,
            ["passwordError"]: "Password must contains 8 - 15 characters",
          });
        }
      }
    } else if (e.target.name == "confirm_password") {
      if (e.target.value == "") {
        setErrorMessage({ ...errorMessage, ["confirmPasswordError"]: false });
      } else {
        if (registerCredentials.user_password != e.target.value) {
          setErrorMessage({
            ...errorMessage,
            ["confirmPasswordError"]:
              "Password and confirm password must be same",
          });
        } else {
          setRegisterCredentials({
            ...registerCredentials,
            [e.target.name]: e.target.value,
          });
          setErrorMessage({ ...errorMessage, ["confirmPasswordError"]: false });
        }
      }
    }
    // else if (e.target.name == "seller_id") {
    //   if (e.target.value == "") {
    //     setErrorMessage({ ...errorMessage, ["seller_id_Error"]: false });
    //   } else {
    //     if (!validSellerId.test(e.target.value)) {
    //       setErrorMessage({
    //         ...errorMessage,
    //         ["seller_id_Error"]:
    //           "only lower characters and numbers are allowed",
    //       });
    //     } else {
    //       const alreadyPresent = userListDetails.find(
    //         (item) => item?.seller_id && item?.seller_id == e.target.value
    //       );
    //       console.log("alreadyPresent", alreadyPresent);
    //       if (alreadyPresent) {
    //         setErrorMessage({
    //           ...errorMessage,
    //           ["seller_id_Error"]: "Seller ID is already registered",
    //         });
    //       } else {
    //         setSeller_id(e.target.value);
    //         setErrorMessage({ ...errorMessage, ["seller_id_Error"]: false });
    //       }
    //     }
    //   }
    // }
  };

  // -----------------------Submit Register btn-------------------------------
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    let newUser = {};
    if (
      !errorMessage.firstNameError &&
      !errorMessage.lastNameError &&
      !errorMessage.emailError &&
      !errorMessage.passwordError &&
      !errorMessage.confirmPasswordError
    ) {
      if (sellerRegister) {
        const emailId_str = registerCredentials.user_email;
        const sellerUsername = emailId_str.split("@")[0];
        newUser = {
          first_name: registerCredentials.first_name,
          last_name: registerCredentials.last_name,
          user_email: registerCredentials.user_email,
          user_password: registerCredentials.user_password,
          seller_id: `seller.${sellerUsername}`,
        };
        // userListDetails.push(newUser);
        // localStorage.setItem("userList", JSON.stringify(userListDetails));
        // toast.success(
        //   "Your Account has been successfully created, Please Login with your credentials",
        //   {
        //     position: toast.POSITION.TOP_CENTER,
        //   }
        // );
        // console.log("userListDetails", userListDetails);
        // setSellerRegister(false)
        // modalContextValues?.setShowModal("login");
      } else {
        newUser = {
          first_name: registerCredentials.first_name,
          last_name: registerCredentials.last_name,
          user_email: registerCredentials.user_email,
          user_password: registerCredentials.user_password,
        };
        // userListDetails.push(newUser);
        // localStorage.setItem("userList", JSON.stringify(userListDetails));
        // toast.success(
        //   "Your Account has been successfully created, Please Login with your credentials",
        //   {
        //     position: toast.POSITION.TOP_CENTER,
        //   }
        // );
        // console.log("userListDetails", userListDetails);
        // setSellerRegister(false)
        // modalContextValues?.setShowModal("login");
      }
      userListDetails.push(newUser);
      localStorage.setItem("userList", JSON.stringify(userListDetails));
      toast.success(
        "Your Account has been successfully created, Please Login with your credentials",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      console.log("userListDetails", userListDetails);
      setSellerRegister(false);
      modalContextValues?.setShowModal("login");
    }
  };

  // -----------------------cancel btn-------------------------
  const handleRegisterCancel = (e) => {
    e.preventDefault();
    setSellerRegister(false);
    modalContextValues?.setShowModal(false);
  };

  // ------------------------SignIn Text----------------------
  const handleSignIn = () => {
    setSellerRegister(false);
    modalContextValues?.setShowModal("login");
  };

  // -----------------------Cross btn--------------------
  const handleCrossBtn = () => {
    modalContextValues?.setShowModal(false);
  };

  // ------------------------Outside click-----------------------
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          modalContextValues?.setShowModal(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  // -------------------------useEffect--------------------------
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <div className="register_full_screen_container">
      <div className=" register_main_container" ref={wrapperRef}>
        <span className="register_cross_btn" onClick={handleCrossBtn}>
          X
        </span>
        <form
          className="inner_register_container"
          onSubmit={handleRegisterSubmit}
        >
          <img
            className="mb-4"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRRMYLaTswxDX7M_l7AG_ja01Qam1CjlNNYA&usqp=CAU"
            alt=""
            width="72"
          />
          {sellerRegister ? (
            <h1 className="h3 mb-5 fw-normal">CREATE AN SELLER ACCOUNT </h1>
          ) : (
            <h1 className="h3 mb-5 fw-normal">CREATE AN ACCOUNT </h1>
          )}
          <div className="mb-3 row">
            <label
              htmlFor="first_name"
              className="col-4 col-form-label register_form_label"
            >
              First Name
            </label>
            <div className="col-8" style={{ marginBottom: "10px" }}>
              <div style={{ height: "50px" }}>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  id="first_name"
                  placeholder="First Name"
                  onChange={handleOnChange}
                  required
                />
                <div className="firstName_error error_field">
                  {errorMessage.firstNameError && errorMessage.firstNameError}
                </div>
              </div>
            </div>
            <label
              htmlFor="last_name"
              className="col-4 col-form-label register_form_label"
            >
              Last Name
            </label>
            <div className="col-8" style={{ marginBottom: "10px" }}>
              <div style={{ height: "50px" }}>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  id="last_name"
                  placeholder="Last Name"
                  onChange={handleOnChange}
                  required
                />
                <div className="lastName_error error_field">
                  {errorMessage.lastNameError && errorMessage.lastNameError}
                </div>
              </div>
            </div>
            {/** {sellerRegister && (
              <Fragment>
                <label
                  htmlFor="seller_id"
                  className="col-4 col-form-label register_form_label"
                >
                  User Id
                </label>
                <div className="col-8" style={{ marginBottom: "10px" }}>
                  <div style={{ height: "50px" }}>
                    <input
                      type="text"
                      className="form-control"
                      name="seller_id"
                      id="seller_id"
                      placeholder="Seller Id"
                      onChange={handleOnChange}
                      required
                    />
                    <div className="seller_error error_field">
                      {errorMessage.seller_id_Error &&
                        errorMessage.seller_id_Error}
                    </div>
                  </div>
                </div>
              </Fragment>
            )}*/}

            <label
              htmlFor="user_email"
              className="col-4 col-form-label register_form_label"
            >
              Email
            </label>
            <div className="col-8" style={{ marginBottom: "10px" }}>
              <div style={{ height: "50px" }}>
                <input
                  type="email"
                  className="form-control"
                  name="user_email"
                  id="user_email"
                  placeholder="Email Address"
                  onChange={handleOnChange}
                  required
                />
                <div className="email_error error_field">
                  {errorMessage.emailError && errorMessage.emailError}
                </div>
              </div>
            </div>
            <label
              htmlFor="user_password"
              className="col-4 col-form-label register_form_label"
            >
              Password
            </label>
            <div className="col-8 " style={{ marginBottom: "10px" }}>
              <div style={{ height: "50px" }}>
                <div className="passwordInput_container">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control "
                    name="user_password"
                    id="user_password"
                    placeholder="Password"
                    onChange={handleOnChange}
                    required
                  />
                  <span
                    className="eye_container"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <i className="fa-regular fa-eye "></i>
                    ) : (
                      <i className="fa-sharp fa-regular fa-eye-slash"></i>
                    )}
                  </span>
                </div>
                <div className="password_error error_field">
                  {errorMessage.passwordError && errorMessage.passwordError}
                </div>
              </div>
            </div>
            <label
              htmlFor="confirm_password"
              className="col-4 col-form-label register_form_label"
            >
              Confirm Password
            </label>
            <div className="col-8" style={{ marginBottom: "10px" }}>
              <div style={{ height: "50px" }}>
                <input
                  type="text"
                  className="form-control"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirm Password"
                  onChange={handleOnChange}
                  required
                />
                <div className="confirmPassword_error error_field">
                  {errorMessage.confirmPasswordError &&
                    errorMessage.confirmPasswordError}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary add_btn">
              Register
            </button>
            <button
              type="submit"
              className="btn btn-primary cancel_btn"
              onClick={handleRegisterCancel}
            >
              Cancel
            </button>
          </div>
          <div>
            Already Registered?{" "}
            <span className="alreday_sign-in" onClick={handleSignIn}>
              Sign-In
            </span>
          </div>
          {sellerRegister ? (
            <div
              className="register_as_seller"
              onClick={() => setSellerRegister(false)}
            >
              Click here to register as User.
            </div>
          ) : (
            <div
              className="register_as_seller"
              onClick={() => setSellerRegister(true)}
            >
              Click here to register as Seller.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
