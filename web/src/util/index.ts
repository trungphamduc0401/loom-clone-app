export const logError = (error: any) => {
  console.log(error);
};
export const createBase64FromBlob = async (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert Blob to base64."));
      }
    };
    reader.onerror = () => {
      reject(new Error("Error occurred while reading Blob."));
    };
    reader.readAsDataURL(blob);
  });
};
