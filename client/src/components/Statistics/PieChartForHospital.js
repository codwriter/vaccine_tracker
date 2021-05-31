const PieChartForHospital = (patientsCompleted, patientsPending, patientsCancelled) => {
  return ({
    data: (canvas) => {
      return {
        labels: ["Completed", "Pending", "Cancelled"],
        datasets: [
          {
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#12cc8b", "#A5C1DC", "#9E1F1F"],
            borderWidth: 0,
            data: [patientsCompleted, patientsPending, patientsCancelled]
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
}


module.exports = { PieChartForHospital };