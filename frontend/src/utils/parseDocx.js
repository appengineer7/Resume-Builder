// src/utils/parseDocx.js
import mammoth from "mammoth";

// Extract text + images from DOCX
export async function parseDocx(fileArrayBuffer) {
  let images = [];

  const result = await mammoth.extractRawText({
    arrayBuffer: fileArrayBuffer,
    convertImage: mammoth.images.imgElement((image) => {
      return image.read("base64").then((imageBuffer) => {
        const src = `data:${image.contentType};base64,${imageBuffer}`;
        images.push(src); // store base64 image
        return src;
      });
    }),
  });

  return {
    text: result.value,
    images,
  };
}
