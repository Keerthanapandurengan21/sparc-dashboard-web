import axios from "axios";
import { REST_END_POINTS } from "../../RestEndPoints";

export const uploadService = (file, siteName, uploadType, selectedInstance) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("site", siteName);
  if (uploadType === "job" && selectedInstance) {
    formData.append("instance", selectedInstance);
  }

  const apiEndpoint = uploadType === "job" ? `${REST_END_POINTS?.UPLOAD_JOB}`
  : `${REST_END_POINTS?.UPLOAD_SITE_DATA}`;

  return axios.post(apiEndpoint, formData);
};
