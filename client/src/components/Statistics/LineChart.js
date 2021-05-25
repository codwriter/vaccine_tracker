const LineChart = () => {
  return ({
    data: {
      labels: [
        "20",
        "30",
        "40",
        "50",
        "60",
        "70",
        "80",
        "90", 
        "100",
      ],
      datasets: [
        {
          data: [0, 19, 15, 20, 30, 40, 40, 50, 25],
          label: "Pfizer",
          fill: false,
          borderColor: "#fbc658",
          backgroundColor: "transparent",
          pointBorderColor: "#fbc658",
          pointRadius: 4,
          pointHoverRadius: 4,
          pointBorderWidth: 8,
        },
        {
          data: [0, 5, 10, 12, 20, 27, 30, 34, 42],
          label: "AstraZeneca",
          fill: false,
          borderColor: "#51CACF",
          backgroundColor: "transparent",
          pointBorderColor: "#51CACF",
          pointRadius: 4,
          pointHoverRadius: 4,
          pointBorderWidth: 8,
        },
        {
            data: [0, 22, 19, 34, 45, 20, 30, 40, 62],
            label: "Johnson & Johnson",
            fill: false,
            borderColor: "#144db8",
            backgroundColor: "transparent",
            pointBorderColor: "#144db8",
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
        },
        {
            data: [0, 30, 40, 45, 55, 40, 30, 60, 61],
            label: "Moderna",
            fill: false,
            borderColor: "#b81c14",
            backgroundColor: "transparent",
            pointBorderColor: "#b81c14",
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
          },
      ],
    },
    options: {
      legend: {
        display: false,
        position: "top",
      },
    },
  })
};

module.exports = { LineChart };
  