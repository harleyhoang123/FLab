import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import LabNavigator from "../../navigations/LabNavigator";
import {
  DocumentEditorContainerComponent,
  Toolbar,
  DocumentEditorComponent,
  WordExport,
  SfdtExport,
} from "@syncfusion/ej2-react-documenteditor";
import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-react-documenteditor/styles/material.css";

DocumentEditorContainerComponent.Inject(Toolbar);
export default function WorkSpace() {
  const save = () => {
    SSObj.save({
      url: "",
      filename: "sampledata",
      savetype: "pdf",
    });
  };
  return (
    <View>
      <LabNavigator navigation={navigation} />
      <View>
        <View style={styles.container}>
          <DocumentEditorContainerComponent
            id="container"
            height={"auto"}
            serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
            enableToolbar={true}
            allowSave={true}
            saveUrl=""
          />
          <Button onClick={save} title="Save"></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  saveBtn: {
    height: 40,
    width: 40,
  },
});
