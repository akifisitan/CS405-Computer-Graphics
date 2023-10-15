const data = Object.freeze([
  [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
  [17607, 15164, 14567, 14974, 14027, 14951, 13677, 12190],
  [9541, 8242, 7843, 8022, 7601, 8212, 7440, 6994],
  [8066, 6922, 6724, 6952, 6426, 6739, 6237, 5916],
]);

const svgGroup = createSVGElement("g", {
  id: "group",
  fill: "white",
  stroke: "black",
});

const xAxis = {
  labelStartX: 70,
  x1: 50,
  x2: 850,
  y: 400,
};

const yAxis = {
  labelStartX: 20,
  x: 50,
  y1: 50,
  y2: 400,
};

function createSVGElement(elementType, props, value) {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    elementType
  );
  Object.keys(props).forEach((key) => {
    element.setAttribute(key, props[key]);
  });
  if (value) {
    element.innerHTML = value;
  }
  return element;
}

function createXandYAxis() {
  const xAxisElement = createSVGElement("line", {
    x1: xAxis.x1,
    x2: xAxis.x2,
    y1: xAxis.y,
    y2: xAxis.y,
    "stroke-width": 4,
  });
  svgGroup.appendChild(xAxisElement);

  const yAxisElement = createSVGElement("line", {
    x1: yAxis.x,
    x2: yAxis.x,
    y1: yAxis.y1,
    y2: yAxis.y2,
    "stroke-width": 4,
  });
  svgGroup.appendChild(yAxisElement);
}

function createYAxisLabels() {
  for (let i = 0; i <= 10; i += 1) {
    const yValue = yAxis.y2 - 30 * i;
    const label = createSVGElement(
      "text",
      {
        x: yAxis.labelStartX,
        y: yValue,
        "font-family": "Arial",
        "font-size": 12,
        "text-anchor": "middle",
      },
      `${1000 * i}`
    );
    svgGroup.appendChild(label);
  }
}

function createDataBar(gender, startX, data) {
  if (gender !== "male" && gender !== "female") throw Error("Invalid gender");
  const barTopYCoordinate = -0.03 * data + 400;
  const dataBar = createSVGElement("rect", {
    x: gender === "male" ? startX : startX + 20,
    y: barTopYCoordinate,
    height: xAxis.y - barTopYCoordinate,
    width: 20,
    fill: gender === "male" ? "red" : "blue",
  });
  const dataLabelX = gender === "male" ? startX + 15 : startX + 35;
  const dataLabelY = barTopYCoordinate + 30;
  const dataLabel = createSVGElement(
    "text",
    {
      x: dataLabelX,
      y: dataLabelY,
      "font-family": "arial",
      "font-size": "12",
      transform: `rotate(270 ${dataLabelX} ${dataLabelY})`,
      "text-anchor": "middle",
      stroke: "white",
    },
    data
  );
  svgGroup.appendChild(dataBar);
  svgGroup.appendChild(dataLabel);
}

function createXAxisLabels() {
  for (let i = 0; i < data[0].length; i++) {
    const startX = 80 + i * 100;
    const year = data[0][i];
    const yearLabel = createSVGElement(
      "text",
      {
        x: startX + 20,
        y: xAxis.y + 20,
        "font-family": "arial",
        "font-size": "12",
        "text-anchor": "middle",
      },
      year
    );
    svgGroup.appendChild(yearLabel);

    const maleData = data[2][i];
    createDataBar("male", startX, maleData);

    const femaleData = data[3][i];
    createDataBar("female", startX, femaleData);
  }
}

function createLegendLabels() {
  const chartTitleLabel = createSVGElement(
    "text",
    {
      x: yAxis.labelStartX + 30,
      y: yAxis.y1 - 10,
      "font-family": "Arial",
      "font-size": "16",
      "text-anchor": "middle",
      fill: "black",
      stroke: "black",
    },
    "Death Count"
  );
  svgGroup.appendChild(chartTitleLabel);

  const startX = 350;
  const maleSquare = createSVGElement("rect", {
    x: startX,
    y: xAxis.y + 50,
    height: 10,
    width: 10,
    fill: "red",
  });
  const maleLabel = createSVGElement(
    "text",
    {
      x: startX + 30,
      y: xAxis.y + 60,
      "font-family": "Arial",
      "font-size": "16",
      "text-anchor": "middle",
      fill: "black",
      stroke: "black",
    },
    "Male"
  );
  svgGroup.appendChild(maleSquare);
  svgGroup.appendChild(maleLabel);

  const femaleSquare = createSVGElement("rect", {
    x: startX + 60,
    y: xAxis.y + 50,
    height: 10,
    width: 10,
    fill: "blue",
  });
  const femaleLabel = createSVGElement(
    "text",
    {
      x: startX + 100,
      y: xAxis.y + 60,
      "font-family": "Arial",
      "font-size": "16",
      "text-anchor": "middle",
      fill: "black",
      stroke: "black",
    },
    "Female"
  );
  svgGroup.appendChild(femaleSquare);
  svgGroup.appendChild(femaleLabel);
}

function createSVG() {
  createXandYAxis();
  createXAxisLabels();
  createYAxisLabels();
  createLegendLabels();
  const svg = createSVGElement("svg", { height: 500, width: 850 });
  svg.appendChild(svgGroup);
  const mainDiv = document.getElementById("main");
  mainDiv.appendChild(svg);
}

createSVG();
