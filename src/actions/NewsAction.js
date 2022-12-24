
import {NewsController} from "../controllers/NewsController";

export const getNewsDetailByNewsId =
    (newsId, navigation) =>
        async (dispatch, _, {networkService}) => {
            try {
                const newsController = new NewsController(networkService);
                const response = await newsController.getNewsDetailByNewsId({newsId});
                console.log("Data getNewsDetailByNewsId is: " + JSON.stringify(response));
                navigation.push("NewsDetail", {data: response.data.data});
            } catch ({data}) {
                console.log("ERROR in getNewsDetailByNewsId " + JSON.stringify(data))
            }
        };
export const getListNews =
    (navigation) =>
        async (dispatch, _, {networkService}) => {
            try {
                const newsController = new NewsController(networkService);
                const response = await newsController.getListNews();
                console.log("Data getListNews is: " + JSON.stringify(response));
                navigation.push("ListNews", {data: response.data.data});
            } catch ({data}) {
                console.log("ERROR in getListNews " + JSON.stringify(data))
            }
        };
export const createNews =
    (title, content, thumbnail,navigation) => async (dispatch, _, {networkService}) => {
        console.log("title in actions: " + title)
        console.log("content in actions: " + content)
        console.log("thumbnail in actions: " + thumbnail)
        try {
            const newsController = new NewsController(networkService);
            const {data} = await newsController.createNews({title, content,thumbnail});
            console.log("Data createNews is: " + JSON.stringify(data));
            navigation.push("ListNews");
        } catch ({data}) {
            console.log("ERROR in createNews " + JSON.stringify(data))
        }
    };