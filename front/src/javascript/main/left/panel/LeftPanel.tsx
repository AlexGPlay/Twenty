import React from "react";
import CommonPanel from "../../../components/left/CommonPanel";
import Calendar from "../calendar/Calendar";
import Events from "../events/events";
import Invite from "../invite/Invite";
import Container from "../user/Container";

const LeftPanel: React.FC<{}> = () => {
  return (
    <CommonPanel>
      <Container />
      <Invite />
      <Events />
      <Calendar />
    </CommonPanel>
  );
};

export default LeftPanel;
