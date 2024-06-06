import axios from "axios";

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    withCredentials: true,
  });
  return response.data;
};

const backendAxiosGet = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const base64ToFile = (base64String: string, fileName: string) => {
  const byteString = atob(base64String.split(",")[1]);
  const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  return new File([blob], fileName, { type: mimeString });
};

const processUploadAndReturnDownloadUrl = async (files: any) => {
  const UPLOAD_API_ROUTE = "api/upload";
  const response = await axios.post(UPLOAD_API_ROUTE, files, {
    headers: { "content-type": files?.type || "application/octet-stream" },
  });
  const { downloadUrl }: any = response?.data;
  return downloadUrl;
};

export {
  backendAxiosGet,
  base64ToFile,
  fetcher,
  processUploadAndReturnDownloadUrl,
};
