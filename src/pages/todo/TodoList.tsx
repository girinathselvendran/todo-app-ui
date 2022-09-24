import {
    IonAlert,
    IonButton,
    IonCard,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonSpinner,
    IonToast,
    IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { createOutline, closeCircleOutline, logOutOutline } from "ionicons/icons";
import {
    createService,
    deleteService,
    getTodoService,
    updateService,
} from "../../server/service";

export const TablePage = () => {
    const [showTost, setShowTost] = useState<any>({
        isShow: false,
        message: "",
    });
    const [inputVal, setInputVal] = useState<string>("");
    const [saveEditbtn, setSaveEditbtn] = useState<string>("Save");
    const [todoList, setTodoList] = useState<any>();
    const [editId, seteditId] = useState<any>();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [id, setId] = useState<any>();

    const emailId = localStorage.getItem("emailId");

    const inputRef = useRef<any>();

    console.log("inputVal", todoList);
    useEffect(() => {
        const getTodo = async () => {
            let res = await getTodoService(emailId);
            setTodoList(res.data.data);
        };
        getTodo();
    }, [emailId]);

    const handleSubmit = async (e: any) => {
        console.log("!inputVal", !inputVal);

        if (!inputVal) {
            setShowTost({ isShow: true, message: "Update Successful" });
            setShowTost({ isShow: true, message: "Input is empty" });
            return
        }

        if (saveEditbtn === "Save") {
            let res = await createService({
                todoList: inputVal,
                userEmailId: emailId,
            });

            let result = res.data.data.filter(
                (item: any) => item.userEmailId === emailId
            );
            setTodoList(result);
            setShowTost({ isShow: true, message: "Save Successful" });
        }
        if (saveEditbtn === "Update") {
            let res = await updateService(editId, { data: inputVal });
            let result = res.data.data.filter(
                (item: any) => item.userEmailId === emailId
            );

            setTodoList(result);
            setShowTost({ isShow: true, message: "Update Successful" });
        }

        setInputVal("");
        setSaveEditbtn("Save");
    };

    const onHandleEdit = async (data: any) => {
        setInputVal(data.todoList);
        setSaveEditbtn("Update");
        seteditId(data?._id);
        inputRef.current.focus();
    };
    const onHandleDelete = async () => {
        let res = await deleteService(id);
        let result = res.data.data.filter(
            (item: any) => item.userEmailId === emailId
        );
        setTodoList(result);
        setShowTost({ isShow: true, message: "Delete successful" });

    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.pathname = "/loginPage";
    }


    return (
        <IonPage>
            {/* <Menu /> */}
            <IonHeader>
                <IonToolbar color={"tertiary"} >
                    <IonLabel className="ion-margin-start" style={{ fontSize: "20px" }}>Todo List</IonLabel>
                    <IonButton slot="end" color="light" size="default" className="ion-margin-end"
                        onClick={handleLogout}
                    >
                        <IonIcon icon={logOutOutline} slot={"start"} />
                        Log out
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <IonCard color={"light"} style={{ minHeight: "500px" }}>


                        <section>
                            <IonItem
                                lines="none"
                                style={{ border: "2px solid black", borderRadius: "50px" }}
                                className="ion-margin"
                            >
                                <IonInput
                                    ref={inputRef}
                                    style={{ height: "15px", fontSize: "20px" }}
                                    autofocus={true}
                                    name="todo"
                                    value={inputVal}
                                    onIonChange={(e: any) => setInputVal(e.target.value)}
                                    onKeyPress={(event) =>
                                        event.key === "Enter" ? handleSubmit(event) : null
                                    }
                                />
                                <IonButton
                                    color={"tertiary"}
                                    style={{ width: "70px", height: "35px", fontSize: "15px" }}
                                    onClick={handleSubmit}
                                >
                                    {saveEditbtn}
                                </IonButton>
                            </IonItem>
                        </section>
                        <section>
                            <h3 className="ion-text-center">
                                <b>ToDo List</b>
                            </h3>
                            {todoList ?
                                <>
                                    {todoList.length > 0 ? todoList?.map((item: any, index: any) => {
                                        return (
                                            <div
                                                key={index}
                                                className="ion-margin"
                                            >
                                                <IonItem lines="none">
                                                    <h3 style={{ maxWidth: "300px", wordWrap: "break-word" }}>
                                                        <span >{item.todoList}</span>
                                                    </h3>

                                                    <IonButton
                                                        style={{ margin: "0px", padding: "0px 5px" }}
                                                        slot="start"
                                                        fill="clear"
                                                        onClick={() => onHandleEdit(item)}
                                                    >
                                                        <IonIcon icon={createOutline} slot="start" />
                                                        Edit
                                                    </IonButton>

                                                    <IonButton
                                                        style={{ margin: "0px", padding: "0px 5px" }}
                                                        slot="end"
                                                        fill="clear"
                                                        onClick={() => {
                                                            setShowAlert(true)
                                                            setId(item._id)
                                                        }}
                                                    >
                                                        <IonIcon icon={closeCircleOutline} slot="start" />
                                                        Delete
                                                    </IonButton>
                                                </IonItem>
                                            </div>
                                        );
                                    })
                                        :
                                        <div className="ion-text-center">
                                            <span>No Records</span>
                                        </div>
                                    }
                                </>
                                :
                                <div className="ion-text-center" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <IonSpinner /> 	&nbsp;	&nbsp; Loading...
                                </div>}
                        </section>
                    </IonCard>
                </div>
            </IonContent>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                cssClass="my-custom-class"
                header={"Delete List"}
                subHeader={"Do you want to delete this list?"}
                message={"If yes please click ok button."}
                buttons={[
                    { text: "Cancel", handler: () => setId("") },
                    { text: "Ok", handler: () => onHandleDelete() },
                ]}
            />
            <IonToast isOpen={showTost.isShow} message={showTost.message} duration={3000} />
        </IonPage >
    );
};
