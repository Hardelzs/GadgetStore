import { put, del, list } from '@vercel/blob';
const BUCKET_NAME = 'school-device'; 
// await put("devices.json", new Blob([JSON.stringify(devices)], { type: "application/json" }));

export async function uploadDevice(deviceData, filename) {
  const blob = new Blob([JSON.stringify(deviceData)], { type: 'application/json' });

  const { url } = await put(`${filename}.json`, blob, {
    access: 'public',
    token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN,
  });

  return url;
}

export async function fetchDevices() {
  const res = await list({ token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN });
  const jsonFiles = res.blobs.filter((blob) => blob.pathname.endsWith('.json'));

  const devices = await Promise.all(
    jsonFiles.map(async (file) => {
      const res = await fetch(file.url);
      const data = await res.json();
      return { ...data, _blobPath: file.pathname };
    })
  );

  return devices;
}

export async function deleteDevice(blobPath) {
  await del(blobPath, { token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN });
}

// utils/blob.js

export async function fetchDevicesFromBlob() {
  try {
    const res = await fetch('/api/devices.json'); // Assuming this is your blob URL
    const devices = await res.json();
    return { success: true, devices };
  } catch (error) {
    return { success: false, error };
  }
}

export async function uploadUpdatedDevicesToBlob(devices) {
  try {
    const res = await fetch('/api/save-devices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(devices),
    });
    if (!res.ok) throw new Error('Failed to upload');
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
