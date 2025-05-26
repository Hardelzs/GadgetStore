import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import {
  fetchDevices,
  deleteDevice,
  updateDevice,
} from "../lib/Firebase";

export default function Mydevice() {
  const [devices, setDevices] = useState([]);
  const [editingDevice, setEditingDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedDeviceId, setDeletedDeviceId] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("");

  // Define your Firestore collection name
  const COLLECTION_NAME = "devices"; // <--- Define your collection name here

  const loadDevices = async () => {
    try {
      // Pass the collection name when calling fetchDevices
      const data = await fetchDevices(COLLECTION_NAME);
      setDevices(data);
    } catch (error) {
      console.error("Error loading devices:", error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    loadDevices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this device?")) return;
    try {
      // Pass the collection name when calling deleteDevice
      await deleteDevice(COLLECTION_NAME, id);
      setDeletedDeviceId(id); // trigger animation
      setTimeout(() => {
        setDevices((prev) => prev.filter((d) => d.id !== id));
        setDeletedDeviceId(null);
      }, 300);
    } catch (error) {
      console.error("Error deleting device:", error);
      // Handle the error appropriately
    }
  };

  function handleEdit(device) {
    setEditingDevice(device);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingDevice) return; // Ensure there's a device to update

    try {
      // Pass the collection name when calling updateDevice
      await updateDevice(COLLECTION_NAME, editingDevice.id, editingDevice);
      setEditingDevice(null);
      loadDevices(); // Refresh the device list
    } catch (error) {
      console.error("Error updating device:", error);
      // Handle the error appropriately
    }
  };

  const filteredDevices = devices.filter((device) => {
    const matchesMatric = device.matric
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSemester =
      !selectedSemester || device.semester === selectedSemester;
    return matchesMatric && matchesSemester;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-52">
        <Topbar />
        <main className="mt-40 p-6">
          {/* Search and Filter */}
          <div className="flex items-center justify-center mb-6 gap-4 md:mt-0 mt-10">
            <input
              type="text"
              placeholder="Matric number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded w-96 px-4 py-2 focus:outline-0"
            />

            <button
              className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              onClick={() => setSearchTerm("")}
            >
              Search
            </button>

            <select
              name="semester"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-[300px] mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">All Semesters</option>
              <option value="Alpha Semester">Alpha Semester</option>
              <option value="Omega Semester">Omega Semester</option>
            </select>
          </div>

          <h2 className="text-2xl font-bold mb-6">Registered Devices</h2>

          {filteredDevices.length === 0 ? (
            <p className="text-gray-500">No devices match the search criteria.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {filteredDevices.map((device) => (
                <div
                  key={device.id}
                  className={`border border-gray-200 rounded shadow p-4 flex flex-col transition-all duration-300 ease-in-out transform
                  ${
                    deletedDeviceId === device.id
                      ? "opacity-0 scale-95"
                      : "opacity-100 scale-100"
                  }
                `}
                >
                  <img
                    src={device.image}
                    alt={device.name}
                    className="h-32 object-contain mb-3"
                  />
                  <div className="mb-2">
                    <strong>Type:</strong> {device.type}
                  </div>
                  <div className="mb-2">
                    <strong>Brand:</strong> {device.brand}
                  </div>
                  <div className="mb-2">
                    <strong>Name:</strong> {device.name}
                  </div>
                  <div className="mb-2">
                    <strong>Serial:</strong> {device.serial || "N/A"}
                  </div>
                  <div className="mb-2 text-sm text-gray-600">
                    <strong>MAC:</strong> {device.mac || "N/A"}
                  </div>
                  <div className="mb-2 text-sm text-gray-600">
                    <strong>Matric:</strong> {device.matric}
                  </div>
                  <div className="mb-4 text-sm text-gray-600">
                    <strong>Date:</strong> {device.date || "N/A"}
                  </div>

                  <div className="mt-auto flex justify-between">
                    <button
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(device.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleEdit(device)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* EDIT MODAL */}
          {editingDevice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <form
                onSubmit={handleUpdate}
                className="flex flex-col w-96 bg-white p-8 rounded shadow-lg relative"
              >
                {[
                  { key: "type", label: "Device Type" },
                  { key: "brand", label: "Device Brand" },
                  { key: "name", label: "Device Name" },
                  { key: "serial", label: "Serial Number" },
                  { key: "mac", label: "Device MAC" },
                  { key: "matric", label: "Matric" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium">
                      {field.label}
                    </label>
                    <input
                      value={editingDevice[field.key] || ""} // Added || "" to prevent controlled component warnings if value is null/undefined
                      onChange={(e) =>
                        setEditingDevice({
                          ...editingDevice,
                          [field.key]: e.target.value,
                        })
                      }
                      placeholder={field.label}
                      className="mb-2 p-2 mt-1 border-gray-300 border rounded w-full"
                    />
                  </div>
                ))}

                <div className="flex gap-2 mt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingDevice(null)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}