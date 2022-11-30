import React from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import LabNavigator from "../../navigations/LabNavigator";
// import {
//   useFonts,
//   BeVietnamPro_200ExtraLight_Italic,
// } from "@expo-google-fonts/dev";
// import {
//   DocumentEditorContainerComponent,
//   Toolbar,
//   DocumentEditorComponent,
//   WordExport,
//   SfdtExport,
//   SpreadSheetDocument,
// } from "@syncfusion/ej2-react-documenteditor";
// import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
// import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
// import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
// import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
// import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
// import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
// import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
// import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
// import "../../../node_modules/@syncfusion/ej2-react-documenteditor/styles/material.css";
//
// DocumentEditorContainerComponent.Inject(Toolbar);
// let SSObj = SpreadSheetDocument;
export default function WorkSpace({navigation}) {
  // const saveDoc = () => {
  //   SSObj.save({
  //     url: "'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'",
  //     filename: "sampledata",
  //     savetype: "pdf",
  //   });
  //   console.log("click");
  //   console.log(
  //     JSON.stringify({
  //       Name: document.getElementById("documentcontainer").value,
  //     })
  //   );
  // };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      {/*<View style={styles.container}>*/}
      {/*  <View style={styles.left}>*/}
      {/*    <View style={styles.left}>*/}
      {/*      <Text style={styles.leftContent}>List WorkSpace</Text>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*  <View style={styles.right}>*/}
      {/*    <TextInput />*/}
      {/*    <DocumentEditorContainerComponent*/}
      {/*      id="documentcontainer"*/}
      {/*      height={"auto"}*/}
      {/*      serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"*/}
      {/*      enableToolbar={true}*/}
      {/*      allowSave={true}*/}
      {/*      saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"*/}
      {/*    />*/}
      {/*    <Button onPress={saveDoc} title="Save"></Button>*/}
      {/*  </View>*/}
      {/*</View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  leftContent: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingRight: 8,
    paddingLeft: 8,
    borderWidth: 1,
    borderColor: "#DEE2E6",
    fontFamily: "sans-serif",
    fontSize: 16,
  },
  saveBtn: {
    height: 40,
    width: 40,
  },
  left: {
    width: "18%",
    height: "100%",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  right: {
    width: "82%",
  },
});
