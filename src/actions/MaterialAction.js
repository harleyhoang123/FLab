import { strings } from "../localization";
import { MaterialController } from "../controllers/MaterialController";

export const getMaterialById =
  (materialId, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const materialController = new MaterialController(networkService);
      console.log("Material Id ID in actions: " + materialId);
      const { data } = await materialController.getMaterialById({
        materialId,
      });
      console.log("Mate data in act:" + JSON.stringify(data.data));
      navigation.navigate("MaterialDetail", { data: data.data });
    } catch ({ data }) {
      console.log("Error get material by id:" + JSON.stringify(data));
    }
  };
