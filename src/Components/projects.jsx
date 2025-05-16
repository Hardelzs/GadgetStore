export default function Project() {
  return (
    <div className="md:grid lg:flex justify-between">
      {/* Left Section */}
      <div className="shadow-lg h-96 md:w-[128%] lg:w-[66%] rounded-lg bg-white p-4 mt-5 overflow-auto">
        <div className="font-mono mb-4">
          <p className="text font-bold">Devices</p>
          <p>✔️ 30 done this month</p>
        </div>

        {/* Table Header */}
        <p className="text font-bold ml-1 mt-2">Recent Devices</p>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="text-[#929DAE] font-mono text-sm">
                <th className="p-2">Device</th>
                <th className="p-2">Type</th>
                <th className="p-2">Budget</th>
                <th className="p-2">Completion</th>
                <th className="p-2">Time/Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-t border-[#eaecee]">
                  <td className="p-2 flex items-center gap-2 text-[#929DAE]">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="device"
                      className="h-5 w-5 rounded-full"
                    />
                    Device 1
                  </td>
                  <td className="p-2">Laptop</td>
                  <td className="p-2">₦150,000</td>
                  <td className="p-2 text-green-600 font-medium">Completed</td>
                  <td className="p-2 text-[#929DAE]">12:00 PM</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Section */}
      <div className="shadow-lg h-96 md:w-[128%] lg:w-[32.5%] rounded-lg bg-white flex justify-center items-center mt-5">
        {/* You can put your chart or widget here */}
        <p className="text-gray-400">Placeholder Widget</p>
      </div>
    </div>
  );
}
