const PieChartforSEX = (patientsMale, patientsFemale) => {
  return ({
    data: (canvas) => {
      return {
        labels: ["Male", "Female"],
        datasets: [
          {
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#e3e3e3", "#4acccd"],
            borderWidth: 0,
            data: [patientsMale, patientsFemale],
          },
        ],
      };
    },
    options: {
      legend: {
        display: false,
      },

      pieceLabel: {
        render: "percentage",
        fontColor: ["white"],
        precision: 2,
      },

      tooltips: {
        enabled: false,
      },

      scales: {
        yAxes: [
          {
            ticks: {
              display: false,
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: "rgba(255,255,255,0.05)",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
    },
  })
};
  
module.exports = { PieChartforSEX };