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
import LabDetail from "../screens/Lab/LabDetail";
import ViewAllMember from "../screens/ViewAllMember/ViewAllMember";
import Backlog from "../screens/Backlog/Backlog";
import RepositoryDetail from "../screens/RepositoryDetail/RepositoryDetail";
import MyCV from "../screens/CV/MyCV";
import Upload from "../screens/CV/Upload";
import Repository from "../screens/Repository/Repository";
import UpdateQuestion from "../screens/Forum/UpdateQuestion";
import CreateLab from "../screens/Lab/CreateLab";
import MemberProfile from "../screens/MemberProfile/MemberProfile";
import UpdateLab from "../screens/Lab/UpdateLab";
import MemberDetail from "../screens/Lab/MemberDetail";
import Project from "../screens/Lab/Project";
import ProjectDetail from "../screens/Lab/ProjectDetail";
import ViewAllMemberInProject from "../screens/Lab/ViewAllMemberInProject";
import CreateProject from "../screens/Lab/CreateProject";
import CreateFolderInRepo from "../screens/Repository/CreateFolderInRepo";
import CreateSubFolder from "../screens/Repository/CreateSubFolder";
import UpdateProject from "../screens/Lab/UpdateProject";
import UpdateMaterial from "../screens/Material/UpdateMeterial";
import AddMemberTolab from "../screens/Lab/AddMemberToLab";
import AddMemberToProject from "../screens/Lab/AddMemberToProject";
import ApplyToALab from "../screens/Lab/ApplyToLab";
import UpdateMemberRole from "../screens/Lab/UpdateMemberRole";
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
        <Stack.Screen name="LabDetail" component={LabDetail} />
        <Stack.Screen name="ViewAllMember" component={ViewAllMember} />
        <Stack.Screen name="Backlog" component={Backlog} />
        <Stack.Screen name="MyCV" component={MyCV} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="Repository" component={Repository} />
        <Stack.Screen name="RepositoryDetail" component={RepositoryDetail} />
        <Stack.Screen name="UpdateQuestion" component={UpdateQuestion} />
        <Stack.Screen name="CreateLab" component={CreateLab} />
        <Stack.Screen name="MemberProfile" component={MemberProfile} />
        <Stack.Screen name="UpdateLab" component={UpdateLab} />
        <Stack.Screen name="MemberDetail" component={MemberDetail} />
        <Stack.Screen name="Project" component={Project} />
        <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
        <Stack.Screen name="CreateSubFolder" component={CreateSubFolder} />
        <Stack.Screen name="CreateProject" component={CreateProject} />
        <Stack.Screen name="UpdateProject" component={UpdateProject} />
        <Stack.Screen name="UpdateMeterial" component={UpdateMaterial} />
        <Stack.Screen name="ApplyToLab" component={ApplyToALab} />
        <Stack.Screen name="UpdateMemberRole" component={UpdateMemberRole} />
        <Stack.Screen
          name="AddMemberToProject"
          component={AddMemberToProject}
        />
        <Stack.Screen name="AddMemberToLab" component={AddMemberTolab} />
        <Stack.Screen
          name="CreateFolderInRepo"
          component={CreateFolderInRepo}
        />
        <Stack.Screen
          name="ViewAllMemberInProject"
          component={ViewAllMemberInProject}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigators;
