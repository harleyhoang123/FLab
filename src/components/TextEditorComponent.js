import {StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TextEditorComponent({title, suggest, editorState, setEditorState}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.suggest}>{suggest}</Text>
            <View style={styles.editor}>
                <Editor
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    suggest: {
        fontSize: 16,
        margin: 5,
    },
    editor: {
        border: "1px solid black", padding: 2, minHeight: 400,
    },
});
export default TextEditorComponent;