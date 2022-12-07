import React, {useState} from 'react';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("@token");
        console.log("token: " + token);
        return token;
    } catch (e) {
        console.log("Can't get avatar: " + e);
    }
};


export const getDataUsingAsyncAwaitGetCall = async () => {
    const token = await getToken();
    try {
        const response = await axios.get(
            'http://192.168.31.197:8083/flab/lab/public/api/v1/projects',
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in custom network service: "+ JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        alert(error.message);
    }
};

export const createSprint = async (projectId, memberId, sprintName) => {
    const token = await getToken();
    try {
        const response = await axios.post(
            'http://192.168.31.197:8085/flab/workspace/public/api/v1/sprints/:workspace-id/sprint'.replace(":workspace-id", projectId),
            {
                memberId: memberId,
                sprintName: sprintName,
            }
            ,
            {
                headers: {
                    "Authorization": `Bearer ` + token
                }
            }
        );
        console.log("Data in createSprint: " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.log("error when create sprint:"+ JSON.stringify(error));
    }
};