const main = document.getElementById("main");
const svg = createSVGElement("svg", { height: 500, width: 850 });
const group = createSVGElement("g", {
  id: "group",
  fill: "white",
  stroke: "black",
});

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

function calculateBarTopYCoordinate(x) {
  return -0.03 * x + 400;
}

const data = [
  [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
  [17607, 15164, 14567, 14974, 14027, 14951, 13677, 12190],
  [9541, 8242, 7843, 8022, 7601, 8212, 7440, 6994],
  [8066, 6922, 6724, 6952, 6426, 6739, 6237, 5916],
];

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

const xAxisElement = createSVGElement("line", {
  x1: xAxis.x1,
  x2: xAxis.x2,
  y1: xAxis.y,
  y2: xAxis.y,
  "stroke-width": 4,
});

group.appendChild(xAxisElement);

const yAxisElement = createSVGElement("line", {
  x1: yAxis.x,
  x2: yAxis.x,
  y1: yAxis.y1,
  y2: yAxis.y2,
  "stroke-width": 4,
});

group.appendChild(yAxisElement);

function addYAxisData() {
  for (let i = 0; i <= 10; i += 1) {
    const yValue = yAxis.y2 - 30 * i;
    const value = 1000 * i;
    const el = createSVGElement(
      "text",
      {
        x: yAxis.labelStartX,
        y: yValue,
        "font-family": "Arial",
        "font-size": 12,
        "text-anchor": "middle",
      },
      `${value}`
    );
    group.appendChild(el);
  }
}

addYAxisData();

function createMaleBar({ startX, data }) {
  const barTopYCoordinate = calculateBarTopYCoordinate(data);
  const maleBar = createSVGElement("rect", {
    x: startX,
    y: barTopYCoordinate,
    height: xAxis.y - barTopYCoordinate,
    width: 20,
    fill: "red",
  });
  const maleLabelX = startX + 15;
  const maleLabelY = barTopYCoordinate + 30;
  const maleLabel = createSVGElement(
    "text",
    {
      x: maleLabelX,
      y: maleLabelY,
      "font-family": "arial",
      "font-size": "12",
      transform: `rotate(270 ${maleLabelX} ${maleLabelY})`,
      "text-anchor": "middle",
      stroke: "white",
    },
    data
  );
  return { maleBar, maleLabel };
}

function createFemaleBar({ startX, data }) {
  const barTopYCoordinate = calculateBarTopYCoordinate(data);
  const femaleBar = createSVGElement("rect", {
    x: startX + 20,
    y: barTopYCoordinate,
    height: xAxis.y - barTopYCoordinate,
    width: 20,
    fill: "blue",
  });
  const femaleLabelX = startX + 35;
  const femaleLabelY = barTopYCoordinate + 30;
  const femaleLabel = createSVGElement(
    "text",
    {
      x: femaleLabelX,
      y: femaleLabelY,
      "font-family": "arial",
      "font-size": "12",
      transform: `rotate(270 ${femaleLabelX} ${femaleLabelY})`,
      "text-anchor": "middle",
      stroke: "white",
    },
    data
  );
  return { femaleBar, femaleLabel };
}

for (let i = 0; i < data[0].length; i++) {
  const startX = 80 + i * 100;
  const year = data[0][i];
  const male = data[2][i];
  const female = data[3][i];
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

  const { maleBar, maleLabel } = createMaleBar({ startX, data: male });
  group.appendChild(maleBar);
  group.appendChild(maleLabel);
  const { femaleBar, femaleLabel } = createFemaleBar({ startX, data: female });

  group.appendChild(yearLabel);
  group.appendChild(femaleBar);
  group.appendChild(femaleLabel);
}

function createLegendLabels() {
  const testLabel = createSVGElement(
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
  group.appendChild(testLabel);
  group.appendChild(maleSquare);
  group.appendChild(maleLabel);
  group.appendChild(femaleSquare);
  group.appendChild(femaleLabel);
}

createLegendLabels();

svg.appendChild(group);
main.appendChild(svg);
