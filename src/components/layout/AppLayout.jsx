import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as identityAction from "../../store/actions/identities";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import IdentityBar from "../IdentityBar/IdentityBar";
import ReactLoading from "react-loading";
const AppLayout = () => {
  const dispatch = useDispatch();
  const identities = useSelector((state) => state.identities.identities);
  const currentIdentity = useSelector((state) => state.identities.identities[state.identities.index]);
  const [isLoading, setLoading] = useState(true);

  const loadIdentities = useCallback(async () => {
    try {
      await dispatch(identityAction.fetchIdentities());
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    loadIdentities().then(() => {
      setLoading(false);
    });
  }, [loadIdentities]);

  useEffect(() => {
    if (identities.length == 0 || identities == null) {
      setLoading(true);
      loadIdentities().then(() => {
        setLoading(false);
      });
    }
  }, [identities]);

  const onClickIdentity = async(newIndex) => {
    await dispatch(identityAction.chooseIdentity(newIndex))
    console.log("step 3")
    console.log(newIndex)
  }

  if (isLoading || identities.length == 0) {
    return (
      <div style={{ alignItems: "center", justifyContent: "center" }}>
        <ReactLoading
          type={"spokes"}
          color={"black"}
          height={"20%"}
          width={"20%"}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "00px 0px 0px 300px",
      }}
    >
      <IdentityBar identities={identities} currentIdentity={currentIdentity} onClickIdentity={onClickIdentity}/>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
