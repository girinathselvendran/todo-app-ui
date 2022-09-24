import {
  IonContent,
  IonHeader,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import todoImg from "../../../src/assets/todo.png";
import SignIn from "../../components/Login";
import { SignUp } from "../../components/Signup";
import "./TodoList.css";

export const LoginPage = () => {
  const [segment, setSegment] = useState<any>("sign-up");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle style={{ textAlign: "center" }}>
            {segment === "sign-up" ? "Registration Page" : "Login Page"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color={"light"}>
        <section className="ion-margin todoAPP">
          <img alt="logo" src={todoImg} width={"200px"} height="100px" />{" "}
          <h4>APP</h4>
        </section>

        <IonSegment onIonChange={(e) => setSegment(e.detail.value)}>
          <IonSegmentButton value="sign-up">Sign-up</IonSegmentButton>
          <IonSegmentButton value="sign-in">Sign-in</IonSegmentButton>
        </IonSegment>

        {segment === "sign-up" ? <SignUp /> : null}
        {segment === "sign-in" ? <SignIn /> : null}
      </IonContent>
    </IonPage>
  );
};
