import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "../components/Header";
import ViewCover from "../components/ViewCover";
import emptyStateImage from "../assets/images/empty-state.webp";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Home() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");
  const username = sessionStorage.getItem("Username");
  const [files, setFiles] = useState(0);
  const [links, setLinks] = useState(0);
  const [notes, setNotes] = useState(0);
  const [lastFile, setLastFile] = useState(null);
  const [lastLink, setLastLink] = useState(null);
  const [lastNote, setLastNote] = useState(null);

  useEffect(
    function () {
      if (userId == null) {
        navigate("/");
      } else {
        getStorageInfo();
        getRecentActivityInfo();
      }
    },
    [userId, navigate]
  );

  async function getStorageInfo() {
    try {
      const response = await axios.get(
        `http://192.168.1.15/ds-cloudswift-rest/api/dashboard.php/get-storage-info/${userId}`
      );

      setFiles(response.data[0].Files);
      setLinks(response.data[1].Links);
      setNotes(response.data[2].Notes);
    } catch (err) {
      console.log(err);
    }
  }

  async function getRecentActivityInfo() {
    try {
      const response = await axios.get(
        `http://192.168.1.15/ds-cloudswift-rest/api/dashboard.php/get-recent-activity-info/${userId}`
      );

      setLastFile(response.data[0]);
      setLastLink(response.data[1]);
      setLastNote(response.data[2]);
    } catch (err) {
      console.log(err);
    }
  }

  const chartData = {
    labels: ["Files", "Links", "Notes"],
    datasets: [
      {
        data: [files, links, notes],
        backgroundColor: ["#4f518c", "#8187dc", "#b7a5cc"],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <>
      <Header></Header>
      <main className="container">
        <div className="col-md-8 mx-auto">
          <div className="mx-3 mb-4 text-center">
            <div className="fs-6">
              Welcome <span className="h6">{username}</span>
            </div>
            <div className="small fst-italic">Your Stuff, Everywhere.</div>
          </div>
          <div className="row mx-3 mb-4 text-center">
            <div className="col text-center border-start">
              <h6 className="mb-1 serif fw-bold">Files</h6>
              <div className="small">{files}</div>
            </div>
            <div className="col text-center border-start">
              <h6 className="mb-1 serif fw-bold">Links</h6>
              <div className="small">{links}</div>
            </div>
            <div className="col text-center border-start border-end">
              <h6 className="mb-1 serif fw-bold">Notes</h6>
              <div className="small">{notes}</div>
            </div>
          </div>
          {(lastFile || lastLink || lastNote) && (
            <>
              <div className="mx-3">
                <h6 className="mb-2 text-center serif fw-bold">
                  Storage Charts
                </h6>
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-bs-interval="5000"
                  data-bs-touch="true"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active mb-5">
                      <div className="chart-container">
                        <Bar data={chartData} options={barChartOptions}></Bar>
                      </div>
                    </div>
                    <div className="carousel-item mb-5">
                      <div className="chart-container">
                        <Doughnut
                          data={chartData}
                          options={doughnutChartOptions}
                        ></Doughnut>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-3">
                <h6 className="mb-2 pb-2 text-center serif fw-bold">
                  Recent Activity
                </h6>
                <table className="table small">
                  <thead>
                    <tr>
                      <th className="table-primary">Name</th>
                      <th className="table-primary">Date</th>
                      <th className="table-primary">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastFile && (
                      <tr>
                        <td className="small">{lastFile.FileName}</td>
                        <td className="small">{lastFile.Date}</td>
                        <td className="small">{lastFile.Time}</td>
                      </tr>
                    )}
                    {lastLink && (
                      <tr>
                        <td className="small">{lastLink.LinkName}</td>
                        <td className="small">{lastLink.Date}</td>
                        <td className="small">{lastLink.Time}</td>
                      </tr>
                    )}
                    {lastNote && (
                      <tr>
                        <td className="small">{lastNote.NoteTitle}</td>
                        <td className="small">{lastNote.Date}</td>
                        <td className="small">{lastNote.Time}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {!lastFile && !lastLink && !lastNote && (
            <ViewCover
              viewName="Add your Stuff"
              viewImage={emptyStateImage}
              viewDescription="Get started by adding your first file, link or note."
            ></ViewCover>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
