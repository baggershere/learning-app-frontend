import axios from "axios";
import AnalyticsGrid from "../components/profile/AnalyticsGrid";
import React from "react";
import { useHistory } from "react-router";
import Navbar from "../components/Navbar";
import ProfileChildren from "../components/profile/ProfileChildren";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileInfo } from "../redux/API/API.actions";
import { resetSelectedChild } from "../redux/user/user.actions";
import { SET_SELECTED_CHILD } from "../redux/user/user.types";

axios.defaults.withCredentials = true;

const Profile = () => {
  const history = useHistory();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!state.user.isAuth) {
      history.push("/login");
    }
    if (state.user.isAuth) {
      dispatch(fetchProfileInfo());
    }
  }, []);

  if (state.profile.loading) {
    return (
      <React.Fragment>
        <Navbar />
        <h1>Loading</h1>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Navbar />
        <ProfileChildren children={state.profile.children} />
        <AnalyticsGrid />
      </React.Fragment>
    );
  }
};

export default Profile;
