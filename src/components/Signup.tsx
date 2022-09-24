import {
  IonAlert,
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonToast,
} from "@ionic/react";
import { useState } from "react";
import swal from "sweetalert";
import { sendOTP, signupService, verifyOTP } from "../server/service";
import InputField from "./commons/InputField";

export const SignUp = () => {
  const [showTost, setShowTost] = useState<any>(false)
  const [isOTPVerified, setIsOTPVerified] = useState<any>(false)
  const [showTostMessage, setShowTostMessage] = useState<any>("")
  const [inputVal, setInputVal] = useState<any>({
    fullName: "",
    emailId: "",
    phoneNumber: "",
    password: "",
    OTP: "",
  });

  const onHandelInput = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    setInputVal({ ...inputVal, [name]: value });
  };
  const handleSubmit = async () => {
    let body = { ...inputVal };
    let { data } = await signupService(body)
    setShowTostMessage(data?.data.toString())
    setShowTost(true)
    setTimeout(() => {
      setShowTost(false)
    }, 3000);

  };

  const sendVerifyOTP = async () => {

    try {
      const { data } = await sendOTP({ phoneNumber: inputVal.phoneNumber });
      if (data.status === 200) {
        setIsOTPVerified(true)
        swal({
          title: "Success!",
          text: "Verify OTP send to your Mobile Number!",
          icon: "success",
        });
      } else {

        setShowTostMessage(data?.data.toString())
        setShowTost(true)
      }
    } catch (error) {
      alert(error)
    }
  }
  const handleVerifyOTP = async (phoneNumber: any, OTP: any) => {
    console.log("asdf", phoneNumber, OTP);
    const { data } = await verifyOTP({ phoneNumber, OTP });
    if (data.status === 200) {
      setIsOTPVerified(true)
      swal({
        title: "Success!",
        text: "OTP Verified",
        icon: "success",
      });
    }
  }


  return (
    <div>
      <div className="ion-text-center">
        <IonGrid className="ion-margin" style={{ textAlign: "center" }}>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="5">
              <InputField
                name="fullName"
                label="Full Name"
                type="text"
                value={inputVal.fullName}
                placeholder="Enter Your FullName"
                onChange={(e: any) => onHandelInput(e)}
              />
            </IonCol>
          </IonRow>
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
                value={inputVal.password}
                onChange={(e: any) => onHandelInput(e)}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButton expand="block" className="ion-margin" onClick={handleSubmit}>Sign-up</IonButton>
      </div>
      <IonToast
        isOpen={showTost}
        message={showTostMessage}
      />
    </div>
  );
};
