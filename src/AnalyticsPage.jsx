// AnalyticsPage.jsx
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import Slider from "react-slick";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Import slick-carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Register Chart.js components including the Filler plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Custom Next Arrow Component
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "20px",
        zIndex: 2,
        fontSize: "40px",
        color: "white",
      }}
      onClick={onClick}
    />
  );
};

// Custom Previous Arrow Component
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        left: "20px",
        zIndex: 2,
        fontSize: "40px",
        color: "white",
      }}
      onClick={onClick}
    />
  );
};

const AnalyticsPage = () => {
  // Hardcoded data for "Persons Over Time"
  const personOverTimeData = {
    labels: ["08:00", "09:00", "10:00", "11:00", "12:00"],
    datasets: [
      {
        label: "Persons Count",
        data: [5, 8, 12, 9, 15],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const personOverTimeOptions = {
    responsive: true,
    maintainAspectRatio: false, // Let container determine height
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Persons Over Time" },
    },
  };

  // Hardcoded data for "Object vs Time"
  const objectVsTimeData = {
    labels: ["08:00", "09:00", "10:00", "11:00", "12:00"],
    datasets: [
      {
        label: "Cars",
        data: [3, 4, 6, 5, 7],
        backgroundColor: "rgba(255,99,132,0.6)",
      },
      {
        label: "Bikes",
        data: [2, 3, 5, 4, 6],
        backgroundColor: "rgba(54,162,235,0.6)",
      },
    ],
  };

  const objectVsTimeOptions = {
    responsive: true,
    maintainAspectRatio: false, // Let container determine height
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Object vs Time" },
    },
  };

  // Slider settings with custom arrows and a resize event trigger
  const sliderSettings = {
    dots: true,
    infinite: false, // No looping
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: () => window.dispatchEvent(new Event("resize")),
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="max-h-screen max-w-[80vw]">
        <Slider {...sliderSettings}>
          <div className="h-[80vh]">
            {/* Ensure the chart fills the container */}
            <div className="h-full">
              <Line data={personOverTimeData} options={personOverTimeOptions} />
            </div>
          </div>
          <div className="h-[80vh]">
            <div className="h-full">
              <Bar data={objectVsTimeData} options={objectVsTimeOptions} />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default AnalyticsPage;
