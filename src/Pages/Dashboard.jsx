import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { FaUser } from "react-icons/fa";
import { Bar, Line } from "react-chartjs-2"; // Import Line component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const exportToCSV = () => {
    const storedDevices = JSON.parse(localStorage.getItem("devices")) || [];

    if (storedDevices.length === 0) {
      alert("No devices to export.");
      return;
    }

    const headers = ["Matric", "Brand", "Serial", "MAC", "Type", "Date"];
    const rows = storedDevices.map((d) => [
      d.matric,
      d.brand,
      d.serial,
      d.mac,
      d.type,
      d.date,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "registered_devices.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  exportToCSV();

  // Data for the Bar chart
  const data = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
      {
        label: "Devices",
        data: [20, 50, 30, 20, 40, 60, 60],
        backgroundColor: "white",
        borderColor: "#000000",
        borderWidth: 0,
        barPercentage: 0.1,
        borderRadius: 20,
      },
    ],
  };

  // Options for the Bar chart
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom width and height
    aspectRatio: 3, // Set the width-to-height ratio (e.g., 3:1 for wide)
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    layouts: {
      padding: 20,
      color: "white",
    },
    scales: {
      x: {
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
        grid: {
          display: true,
          color: "#4599EF",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
          callback: function (value) {
            return value % 2 === 0 ? value : null;
          },
        },
        grid: {
          display: true,
          color: "#4599EF",
        },
      },
    },
  };

  // Data for the Line chart
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Devices Over Time",
        data: [10, 20, 15, 25, 30, 35, 40],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)", 
        borderWidth: 2,
        tension: 0.4, 
        pointBackgroundColor: "#4CAF50", 
        pointBorderColor: "#FFFFFF", 
        pointBorderWidth: 2,
        pointRadius: 4, 
      },
    ],
  };

  // Options for the Line chart
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
        grid: {
          display: true,
          color: "#4599EF",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
        grid: {
          display: true,
          color: "#4599EF",
        },
      },
    },
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-52">
        <Topbar />
        <main className="mt-20 p-6">
          <div className="flex justify-between items-center mb-6 ">
            <div className="shadow-lg h-32 w-96 rounded-lg bg-[#FFFFFF]">
              <p className="absolute h-13 w-13 rounded-lg bg-[#929DAE] flex items-center justify-center top-22 left-61">
                <FaUser />
              </p>
            </div>

            <div className="shadow-lg h-32 w-96 rounded-lg bg-[#FFFFFF]">
              <p className="absolute h-13 w-13 rounded-lg bg-green-400 flex items-center justify-center top-22 left-168">
                <FaUser />
              </p>
            </div>

            <div className="shadow-lg h-32 w-96 rounded-lg bg-[#FFFFFF]">
              <p className="absolute h-13 w-13 rounded-lg bg-blue-400 flex items-center justify-center top-22 left-274">
                <FaUser />
              </p>
            </div>

            <div className="shadow-lg h-32 w-96 rounded-lg bg-[#FFFFFF]">
              <p className="absolute h-13 w-13 rounded-lg bg-red-400 flex items-center justify-center top-22 left-382">
                <FaUser />
              </p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex justify-center gap-5 items-center">
            <div className="w-[540px] h-[200px] p-5 bg-[#2C85EC] rounded-2xl text-white mb-6">
              <Bar data={data} options={options} />
            </div>

            {/* Line Chart */}
            <div className="w-[540px] h-[200px] p-5 bg-[#2C85EC] rounded-2xl text-white">
              <Line data={lineData} options={lineOptions} />
            </div>

            <div className="w-[540px] h-[200px] p-5 bg-[#2C85EC] rounded-2xl text-white">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
