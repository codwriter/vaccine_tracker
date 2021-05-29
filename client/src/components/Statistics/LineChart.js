const LineChart = (age20, age30, age40, age50, age60, age70, age80, age90, age100) => {
  console.log(age20)
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
          data: [age20, age30, age40, age50, age60, age70, age80, age90, age100],
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
          data: [age20, age30, age40, age50, age60, age70, age80, age90, age100],
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
            data: [age20, age30, age40, age50, age60, age70, age80, age90, age100],
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
            data: [age20, age30, age40, age50, age60, age70, age80, age90, age100],
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
  