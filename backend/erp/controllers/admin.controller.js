import Client from "../models/Client.js";
import Project from "../models/Project.js";
import { Contact } from "../../models/contact.js";
import RequestDemo from "../../models/RequestDemo.js";

// ⭐ GET ADMIN DASHBOARD STATS
export const getAdminStats = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const totalDemoRequests = await RequestDemo.countDocuments();

    const demoChart = [
      { month: "Jan", requests: 12 },
      { month: "Feb", requests: 18 },
      { month: "Mar", requests: 30 },
      { month: "Apr", requests: 20 },
      { month: "May", requests: 27 },
    ];

    const userGrowth = [
      { date: "Jun", users: 1100 },
      { date: "Jul", users: 1120 },
      { date: "Aug", users: 1150 },
      { date: "Sep", users: 1170 },
      { date: "Oct", users: 1250 },
    ];

    const projectDistribution = [
      { name: "Completed", value: await Project.countDocuments({ status: "completed" }) },
      { name: "Ongoing", value: await Project.countDocuments({ status: "ongoing" }) },
      { name: "On Hold", value: await Project.countDocuments({ status: "pending" }) },
    ];

    res.json({
      topCards: [
        { label: "Total Clients", value: totalClients },
        { label: "Total Projects", value: totalProjects },
        { label: "Demo Requests", value: totalDemoRequests },
        { label: "Contacts Received", value: totalContacts },
      ],
      demoChart,
      userGrowth,
      projectDistribution,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};


// ⭐ GET ERP USERS (Admin Only)
export const getERPUsers = async (req, res) => {
  try {
    // These users come from ENV
    const managers = process.env.MANAGERS?.split(",") || [];
    const techleads = process.env.TECHLEADS?.split(",") || [];

    const managerUsers = managers.map((m) => ({
      email: m.split(":")[0],
      role: "manager",
    }));

    const techLeadUsers = techleads.map((t) => ({
      email: t.split(":")[0],
      role: "techlead",
    }));

    const adminUser = {
      email: process.env.ADMIN_EMAIL,
      role: "admin",
    };

    res.json({
      users: [adminUser, ...managerUsers, ...techLeadUsers],
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch ERP users" });
  }
};
