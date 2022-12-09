import { strings } from "../localization";
import { MaterialController } from "../controllers/MaterialController";
import {getListMaterialByLabId} from "./LaboratoryAction";

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

export const updateMaterialByMaterialId =
  (labId, materialId, requestData, navigation) =>
  async (dispatch, _, { networkService }) => {
    try {
      const materialController = new MaterialController(networkService);
      const response = await materialController.updateMaterial({
        labId,
        materialId,
        requestData,
      });
      console.log("updateMaterialId: " + JSON.stringify(response));
      dispatch(getMaterialById(materialId, navigation));
    } catch ({ data }) {
      console.log(
        "ERROR when updateLaboratoryByLabId: " + JSON.stringify(data)
      );
    }
  };

export const addMaterial =
    (labId, materialName, description,amount,note, images, navigation) =>
        async (dispatch, _, { networkService }) => {

            try {
                const materialController = new MaterialController(networkService);
                const response = await materialController.addMaterial({labId, materialName, description,amount,note, images})
                console.log("addMaterial: " + JSON.stringify(response));
                dispatch(getListMaterialByLabId(labId, navigation));
            } catch ({ data }) {
                console.log(
                    "ERROR when addMaterial: " + JSON.stringify(data)
                );
            }
        };
