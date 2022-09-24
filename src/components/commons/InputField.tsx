import { IonInput, IonItem, IonLabel } from "@ionic/react";
import React from "react";

const InputField: React.FC<any> = ({ label, name, value, type, onChange, placeholder }) => {

  return (
    <IonItem>
      <IonLabel position="stacked">{label}</IonLabel>
      <IonInput
        name={name}
        type={type}
        value={value}
        onIonChange={onChange}
        placeholder={placeholder}
      ></IonInput>
    </IonItem>
  );
};
export default InputField;
