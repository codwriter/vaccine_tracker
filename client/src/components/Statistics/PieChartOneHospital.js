const PieChartOneHospital = (patientsCompleted, patientsPending, patientsCancelled) => {
  return ({
    data: (canvas) => {
      return {
        labels: ["Completed", "Pending", "Cancelled"],
        datasets: [
          {
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#e3e3e3", "#3462B2","#B31B1B" ],
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


module.exports = { PieChartOneHospital };