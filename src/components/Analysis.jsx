import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import usersData from "../users.json"; // Adjust path
import rolesData from "../roles.json"; // Adjust path
import permissionsData from "../permissions.json"; // Adjust path
import "chart.js/auto";

const Analysis = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const loadAndSaveDataToLocalStorage = () => {
      if (
        !localStorage.getItem("users") ||
        !localStorage.getItem("roles") ||
        !localStorage.getItem("permissions")
      ) {
        // Save data to local storage
        localStorage.setItem("users", JSON.stringify(usersData));
        localStorage.setItem("roles", JSON.stringify(rolesData));
        localStorage.setItem("permissions", JSON.stringify(permissionsData));
      }

      // Load data from local storage
      const usersFromStorage = JSON.parse(
        localStorage.getItem("users") || "[]"
      );
      const rolesFromStorage = JSON.parse(
        localStorage.getItem("roles") || "[]"
      );
      const permissionsFromStorage = JSON.parse(
        localStorage.getItem("permissions") || "[]"
      );

      setUsers(usersFromStorage);
      setRoles(rolesFromStorage);
      setPermissions(permissionsFromStorage);
    };

    loadAndSaveDataToLocalStorage();
  }, []);

  // Calculate total active and inactive users
  const totalActiveUsers = users.filter(
    (user) => user.status === "Active"
  ).length;
  const totalInactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  // Calculate total permissions
  const totalPermissions = permissions.length;

  // Prepare data for the pie chart
  const roleCounts = roles.map((role) => ({
    name: role.name,
    count: users.filter((user) => user.role === role.name).length,
  }));

  const pieData = {
    labels: roleCounts.map((role) => role.name),
    datasets: [
      {
        label: "Role Distribution",
        data: roleCounts.map((role) => role.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-blue-700">Active Users</h2>
          <p className="text-xl mt-2">{totalActiveUsers}</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-700">Inactive Users</h2>
          <p className="text-xl mt-2">{totalInactiveUsers}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-green-700">
            Total Permissions
          </h2>
          <p className="text-xl mt-2">{totalPermissions}</p>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="w-full lg:w-[350px] mx-auto text-center">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold mb-4">
            Role Distribution
          </h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
