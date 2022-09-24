import { useState } from "react";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonRow,
  IonToast,
} from "@ionic/react";
import InputField from "./commons/InputField";
import { signinService } from "../server/service";

const SignIn = () => {
  const [showTost, setShowTost] = useState<any>(false)
  const [showTostMessage, setShowTostMessage] = useState<any>("")
  const [inputVal, setInputVal] = useState<any>({
    emailId: "",
    password: "",
  });

  const onHandelInput = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    setInputVal({ ...inputVal, [name]: value });
  };
  const handleSubmit = async () => {
    let body = { ...inputVal };
    let { data } = await signinService(body)
    setShowTostMessage(data?.data.toString())
    setShowTost(true)
    setTimeout(() => {
      setShowTost(false)
    }, 3000);
    if (data.data.toString() === "SignIn Successful") {
      window.location.replace('/todo');
      localStorage.setItem("emailId", data.info);
    }
  };

  const mandate = inputVal.emailId !== "" && inputVal.password !== "";

  return (
    <div className="ion-text-center">
      <IonGrid className="ion-margin">
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" sizeMd="5">
            <InputField
              name="emailId"
              label="Email-Id"
              type="email"
              placeholder="Enter Your Email Id"
              value={inputVal.emailId}
              onChange={(e: any) => onHandelInput(e)}
            />
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" sizeMd="5">
            <InputField
              name="password"
              label="password"
              type="password"
              placeholder="Enter Your Password"
              onChange={(e: any) => onHandelInput(e)}
              value={inputVal.password}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonButton expand="block" className="ion-margin" disabled={!mandate} onClick={handleSubmit} >Sign-In</IonButton>
      <IonToast
        isOpen={showTost}
        message={showTostMessage}
      />
    </div>
  );
};
export default SignIn;
