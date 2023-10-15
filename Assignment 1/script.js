const main = document.getElementById("main");

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

const data = [
  [2016, 2017, 2018, 2019, 2020, 2021, 2022],
  [12910, 12134, 11718, 11022, 9757, 10089, 9522],
  [6994, 6598, 6360, 6065, 5388, 5498, 5289],
  [5916, 5536, 5358, 4957, 4369, 4591, 4233],
];

const svgWidth = 900;
const svgHeight = 500;
const xAxisData = {
  labelStartX: 70,
  startX: 50,
  startY: 400,
  endX: 800,
  endY: 400,
};
const yAxisData = {
  labelStartX: 20,
  startX: 50,
  startY: 50,
  endX: 50,
  endY: 400,
};

const svg = createSVGElement("svg", { height: svgHeight, width: svgWidth });
const group = createSVGElement("g", {
  id: "group",
  fill: "white",
  stroke: "black",
});

const yAxis = createSVGElement("line", {
  x1: yAxisData.startX,
  y1: yAxisData.startY,
  x2: yAxisData.endX,
  y2: yAxisData.endY,
  "stroke-width": 4,
});

const xAxis = createSVGElement("line", {
  x1: xAxisData.startX,
  y1: xAxisData.startY,
  x2: xAxisData.endX,
  y2: xAxisData.endY,
  "stroke-width": 4,
});

function calculateBarTopYCoordinate(x) {
  return -0.03 * x + 400;
}

function addYAxisData(data) {
  // const elements = [...data[2], ...data[3]];
  // const max = Math.max(...elements);
  // const numDigits = Math.floor(Math.log10(max) + 1);
  // const ceil = Math.pow(10, numDigits);
  // const step = ceil / 10;
  for (let i = 0; i <= 10; i += 1) {
    const yValue = yAxisData.endY - 30 * i;
    const value = 1000 * i;
    const el = createSVGElement(
      "text",
      {
        x: yAxisData.labelStartX,
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

function createMaleBar({ startX, data }) {
  const barTopYCoordinate = calculateBarTopYCoordinate(data);
  const maleBar = createSVGElement("rect", {
    x: startX,
    y: barTopYCoordinate,
    height: xAxisData.startY - barTopYCoordinate,
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
    height: xAxisData.startY - barTopYCoordinate,
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

addYAxisData(data);
group.appendChild(xAxis);
group.appendChild(yAxis);

for (let i = 0; i < data[0].length; i++) {
  const startX = 80 + i * 100;
  const year = data[0][i];
  const male = data[2][i];
  const female = data[3][i];
  const yearLabel = createSVGElement(
    "text",
    {
      x: startX + 20,
      y: xAxisData.endY + 20,
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

svg.appendChild(group);
main.appendChild(svg);
