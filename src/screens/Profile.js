import axios from "axios";
import AnalyticsGrid from "../components/profile/AnalyticsGrid";
import React from "react";
import { useHistory } from "react-router";
import Navbar from "../components/Navbar";
import ProfileChildren from "../components/profile/ProfileChildren";
import { fetchProfileInfo } from "../redux/API/API.actions";
import { connect } from "react-redux";

axios.defaults.withCredentials = true;

const Profile = ({ fetchProfileInfo, state }) => {
  const history = useHistory();
  //const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("ran");
    if (!state.user.isAuth) {
      history.push("/login");
    }
    if (state.user.isAuth) {
      fetchProfileInfo();
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

export default connect(
  (state) => {
    return {
      state: state,
    };
  },
  (dispatch) => ({
    fetchProfileInfo: () => dispatch(fetchProfileInfo()),
  })
)(Profile);
