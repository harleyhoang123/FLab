import React, {useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View,} from "react-native";
import AddComponent from "../../components/AddComponent";
import {Dropdown} from "react-native-element-dropdown";
import HomeTopNavigator from "../../navigations/HomeNavigation";
import ForumNavigation from "../../navigations/ForumNavigation";
import Buttons from "../../components/Buttons";
import TextEditorComponent from "../../components/TextEditorComponent";
import EditorState from "draft-js/lib/EditorState";

function AddQuestion({navigation}) {

    const fakeData = '{"_immutable":{"allowUndo":true,"currentContent":{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"ad is SON NGU LONE","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":18,"focusKey":"1snjp","focusOffset":18,"isBackward":false,"hasFocus":false}},"decorator":{"_decorators":[{}]},"directionMap":{"1snjp":"LTR"},"forceSelection":false,"inCompositionMode":false,"inlineStyleOverride":null,"lastChangeType":"insert-characters","nativelyRenderedContent":{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"ad is SON NGU LONE","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":18,"focusKey":"1snjp","focusOffset":18,"isBackward":false,"hasFocus":false}},"redoStack":[],"selection":{"anchorKey":"1snjp","anchorOffset":18,"focusKey":"1snjp","focusOffset":18,"isBackward":false,"hasFocus":false},"treeMap":{"1snjp":[{"start":0,"end":18,"decoratorKey":null,"leaves":[{"start":0,"end":18}]}]},"undoStack":[{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"a","characterList":[{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":true},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":true}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"","characterList":[],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"n","characterList":[{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":2,"focusKey":"1snjp","focusOffset":2,"isBackward":false,"hasFocus":true},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":true}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"na","characterList":[{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":3,"focusKey":"1snjp","focusOffset":3,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":2,"focusKey":"1snjp","focusOffset":2,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"nao","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":4,"focusKey":"1snjp","focusOffset":4,"isBackward":false,"hasFocus":true},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":3,"focusKey":"1snjp","focusOffset":3,"isBackward":false,"hasFocus":true}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"naoH","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"aoH","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"oH","characterList":[{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"H","characterList":[{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"","characterList":[],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":5,"isBackward":false,"hasFocus":true},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":true}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"gnaoh","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"naoh","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"aoh","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"oh","characterList":[{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"h","characterList":[{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"","characterList":[],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":12,"focusKey":"1snjp","focusOffset":12,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"Hoang lam sa","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":13,"focusKey":"1snjp","focusOffset":13,"isBackward":false,"hasFocus":true},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":12,"focusKey":"1snjp","focusOffset":12,"isBackward":false,"hasFocus":true}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"Hoang lam sad","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":14,"focusKey":"1snjp","focusOffset":14,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":13,"focusKey":"1snjp","focusOffset":13,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"Hoang lam sadf","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":14,"focusKey":"1snjp","focusOffset":14,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"H","characterList":[{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":true},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":true}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"","characterList":[],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"n","characterList":[{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":2,"focusKey":"1snjp","focusOffset":2,"isBackward":false,"hasFocus":true},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":true}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"na","characterList":[{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":3,"focusKey":"1snjp","focusOffset":3,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":2,"focusKey":"1snjp","focusOffset":2,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"nao","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":4,"focusKey":"1snjp","focusOffset":4,"isBackward":false,"hasFocus":true},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":3,"focusKey":"1snjp","focusOffset":3,"isBackward":false,"hasFocus":true}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"naoh","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"aoh","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"oh","characterList":[{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"h","characterList":[{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"","characterList":[],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":10,"focusKey":"1snjp","focusOffset":10,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"asasdf dad","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":3,"focusKey":"1snjp","focusOffset":3,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":10,"focusKey":"1snjp","focusOffset":10,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"asa","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":2,"focusKey":"1snjp","focusOffset":2,"isBackward":false,"hasFocus":true},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":3,"focusKey":"1snjp","focusOffset":3,"isBackward":false,"hasFocus":true}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"as","characterList":[{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":2,"focusKey":"1snjp","focusOffset":2,"isBackward":false,"hasFocus":false}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"a","characterList":[{"style":[],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":true},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":1,"focusKey":"1snjp","focusOffset":1,"isBackward":false,"hasFocus":true}},{"entityMap":{},"blockMap":{"1snjp":{"key":"1snjp","type":"unstyled","text":"","characterList":[],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false},"selectionAfter":{"anchorKey":"1snjp","anchorOffset":0,"focusKey":"1snjp","focusOffset":0,"isBackward":false,"hasFocus":false}}]}}'

    const [value, setValue] = useState('Public');
    const [editorState, setEditorState] = useState(fakeData);

    const data = [
        {label: 'Public', value: 'Public'},
        {label: 'Inside Lab Room', value: 'Inside Lab Room'},
    ]
    const showData = () => {
        console.log("Editor data: "+JSON.stringify(editorState));
    }

    return (
        <View>
            <HomeTopNavigator navigation={navigation}/>
            <View style={styles.container}>
                <View  style={styles.forum}>
                    <ForumNavigation navigation={navigation}/>
                </View>
                <View style={styles.content}>
                    <Text style={styles.text}>Ask a question</Text>
                    <AddComponent title={"Title"}
                                  suggest={"Be specific and imagine you’re asking a question to another person."}
                                  multiline={false}
                                  style={{width: "96%"}}/>
                    <TextEditorComponent title={"What are the details of your problem?"}
                                  suggest={"Introduce the problem and expand on what you put in the title. Minimum 20 characters."}
                    editorState={editorState}
                    setEditorState={setEditorState}></TextEditorComponent>
                    <TextEditorComponent title={"What did you try and what were you expecting?"}
                                  suggest={"Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters."}
                    editorState={editorState}
                    setEditorState={setEditorState}></TextEditorComponent>
                    <AddComponent title={"Tags"}
                                  suggest={"Add up to 5 tags to describe what your question is about. Start typing to see suggestions."}
                                  multiline={false}
                                  style={{width: "96%"}}/>
                    <View style={ styles.summit}>
                        <Dropdown
                            style={styles.dropdown}
                            value={value}
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            onChange={item => {
                                setValue(item.value)
                            }}
                        />
                        <Buttons text={"Post Your Question"} style={styles.button} />
                    </View>
                    <Button
                        onPress={showData}
                        title="Learn More"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />

                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        flex:1,
    },
    forum: {
        flex:0.15,
        marginTop:20,
        alignItems:"flex-end",
    },
    content:{
        flex:0.65,
        borderLeftWidth:1,
        paddingLeft:50,
    },
    dropdown: {
        width: 300,
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginLeft:30,
    },
    text:{
        fontSize:30,
        fontWeight:"bold",
        margin:30,
    },
    button:{
        margin:30,
        width:250,
    },
    summit:{
        marginLeft:30,
    },
});
export default AddQuestion;