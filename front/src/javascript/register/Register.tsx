import React from "react";
import Form from "./form";

import styles from "./register.module.css";

const Register: React.FC<{}> = () => {
  return (
    <div className={styles.register}>
      <div className={styles.logoContainer}>
        <img src="/img/logo.png" alt="Twenty logo" className={styles.logo} />
        <img src="/img/text.png" alt="Twenty name" className={styles.logo} />
      </div>
      <Form />
    </div>
  );
};

export default Register;
