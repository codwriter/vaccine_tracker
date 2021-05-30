const PieChartForBrands = (patientsPfizer, patientsAstra, patientsJohnson, patientsModerna) => {
    return ({
      data: (canvas) => {
        return {
          labels: ["Pfizer", "AstraZeneca", "Johnson & Johnson", "Moderna"],
          datasets: [
            {
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: ["#CDC5B4", "#85756E", "#6D3D14", "#551B14"],
              borderWidth: 0,
              data: [patientsPfizer, patientsAstra, patientsJohnson, patientsModerna],
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
    
  module.exports = { PieChartForBrands };