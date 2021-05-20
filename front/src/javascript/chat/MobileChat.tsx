import React, { useState } from "react";

import MobileChatMenu from "./MobileChatMenu";
import MobileConversation from "./MobileConversation";

import styles from "./mobileChat.module.scss";

const MobileChat = () => {
  const [openConversation, setOpenConversation] = useState<number | null>(null);

  const handleConversationOpen = (id) => setOpenConversation(id);

  return (
    <div className={styles.mobileChat}>
      {openConversation ? (
        <MobileConversation
          id={openConversation}
          handleConversationChange={handleConversationOpen}
        />
      ) : (
        <MobileChatMenu handleOpenConversation={handleConversationOpen} />
      )}
    </div>
  );
};

export default MobileChat;
