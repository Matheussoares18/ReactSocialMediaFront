export const getBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    let baseURL = '';
    // Make new FileReader
    const reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object

      baseURL = reader.result as string;

      resolve(baseURL);
    };
  });
};
