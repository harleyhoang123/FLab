import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome/Welcome";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import Home from "../screens/Home/Home";
import ListNews from "../screens/News/ListNews";
import NewsDetail from "../screens/News/NewsDetail";
import Notification from "../screens/Notification/Notification";
import Forum from "../screens/Forum/Forum";
import Profile from "../screens/Profile/Profile";
import QuestionDetail from "../screens/Forum/QuestionDetail";
import AddQuestion from "../screens/Forum/AddQuestion";
import AddNews from "../screens/News/AddNews";
import EditProfile from "../screens/Profile/EditProfile";
import ListMaterial from "../screens/Material/ListMaterial";
import AddMaterial from "../screens/Material/AddMaterial";
import MaterialDetail from "../screens/Material/MaterialDetail";
import OrderMaterial from "../screens/Material/OrderMaterial";
import RequestMaterial from "../screens/Material/RequestMaterial";
import Ticket from "../screens/Ticket/Ticket";
import TicketDetail from "../screens/Ticket/TicketDetail";
import ForgotPassword from "../screens/Forgot Password/ForgotPassword";
import Lab from "../screens/Lab/Lab";
import Document from "../screens/Documents/document";
import DocumentDetail from "../screens/DocumentDetail/DocumentDetail";
import WorkSpace from "../screens/WorkSpace/WorkSpace";
import Spaces from "../screens/Spaces/Spaces";
import { YourWork } from "../screens/YourWork/YourWork";
import YourLab from "../screens/YourLab/YourLab";
import ViewAllMember from "../screens/ViewAllMember/ViewAllMember";
import RoadMap from "../screens/RoadMap/RoadMap";
import RepositoryDetail from "../screens/RepositoryDetail/RepositoryDetail";
import MyCV from "../screens/CV/MyCV";
import Upload from "../screens/CV/Upload";
import Repository from "../screens/Repository/Repository";
function RootNavigators() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"Welcome"}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ListNews" component={ListNews} />
        <Stack.Screen name="NewsDetail" component={NewsDetail} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Forum" component={Forum} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="QuestionDetail" component={QuestionDetail} />
        <Stack.Screen name="AddNews" component={AddNews} />
        <Stack.Screen name="AddQuestion" component={AddQuestion} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ListMaterial" component={ListMaterial} />
        <Stack.Screen name="AddMaterial" component={AddMaterial} />
        <Stack.Screen name="MaterialDetail" component={MaterialDetail} />
        <Stack.Screen name="OrderMaterial" component={OrderMaterial} />
        <Stack.Screen name="RequestMaterial" component={RequestMaterial} />
        <Stack.Screen name="Ticket" component={Ticket} />
        <Stack.Screen name="TicketDetail" component={TicketDetail} />
        <Stack.Screen name="Lab" component={Lab} />
        <Stack.Screen name="Document" component={Document} />
        <Stack.Screen name="DocumentDetail" component={DocumentDetail} />
        <Stack.Screen name="WorkSpace" component={WorkSpace} />
        <Stack.Screen name="Spaces" component={Spaces} />
        <Stack.Screen name="YourWork" component={YourWork} />
        <Stack.Screen name="YourLab" component={YourLab} />
        <Stack.Screen name="ViewAllMember" component={ViewAllMember} />
        <Stack.Screen name="RoadMap" component={RoadMap} />
        <Stack.Screen name="MyCV" component={MyCV} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="Repository" component={Repository} />
        <Stack.Screen name="RepositoryDetail" component={RepositoryDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigators;
