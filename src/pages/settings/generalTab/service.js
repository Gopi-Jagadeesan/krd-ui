import { isEmpty } from "../../../lib/helper";

//Get App Settings Data
export const getSettingsValue = async (settings) => {
  const settingsValue = {};
  if (isEmpty(settings)) {
    return settingsValue;
  }
  return settingsValue;
};
