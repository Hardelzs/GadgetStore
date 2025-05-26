import { db, storage } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Upload image to Firebase Storage
export const uploadImage = async (file) => {
  const fileRef = ref(storage, `device_images/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};

// Save device data to Firestore
export const saveDevice = async (device) => {
  let imageUrl = "";

  // If an image file is present, upload it first
  if (device.image instanceof File) {
    imageUrl = await uploadImage(device.image);
  }

  // Prepare the device data for saving
  const deviceData = {
    ...device,
    image: imageUrl || "", // Save image URL (empty if not uploaded)
  };

  // Save to Firestore
  const docRef = await addDoc(collection(db, "devices"), deviceData);
  return docRef.id;
};
