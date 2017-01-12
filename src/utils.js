import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
const d3 = {
  scale,
  shape,
};

/**
 * Create an x-scale.
 * @param {number} start Start time in seconds.
 * @param {number} end End time in seconds.
 * @param {number} width Width to create the scale with.
 * @return {Function} D3 scale instance.
 */
function createScaleX(start, end, width) {
  return d3.scale.scaleLinear()
    .domain([start, end])
    .range([0, width]);
}

/**
 * Create a y-scale.
 * @param {number} minY Minimum y value to use in our domain.
 * @param {number} maxY Maximum y value to use in our domain.
 * @param {number} height Height for our scale's range.
 * @return {Function} D3 scale instance.
 */
function createScaleY(minY, maxY, height) {
  return d3.scale.scaleLinear()
    .domain([minY, maxY]).nice()
    // We invert our range so it outputs using the axis that React uses.
    .range([height, 0]);
}

const monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

export default {
  
  formattedDateFromUTC(utcMS) {
    var date = new Date(utcMS);
    var monthIndex = date.getMonth();
    return `${monthNames[monthIndex]} ${date.getDate()}, ${date.getFullYear()}`;
  }, 


  /**
   * https://github.com/hswolff/BetterWeather/blob/master/js/weather/graph-utils.js
   * Creates a line graph SVG path that we can then use to render in our
   * React Native application with ART.
   * @param {Array.<Object>} options.data Array of data we'll use to create
   *   our graphs from.
   * @param {function} xAccessor Function to access the x value from our data.
   * @param {function} yAccessor Function to access the y value from our data.
   * @param {number} width Width our graph will render to.
   * @param {number} height Height our graph will render to.
   * @return {Object} Object with data needed to render.
   */
    createLineGraph({
      data,
      xAccessor,
      yAccessor,
      width,
      height,
    }) {
      const lastDatum = data[data.length - 1];

      const scaleX = createScaleX(
        0,//xAccessor(data[0]),
        17,//xAccessor(lastDatum),
        width
      );

      // Collect all y values.
      const allYValues = data.reduce((all, datum) => {
        console.log(yAccessor(datum));
        all.push(yAccessor(datum));
        return all;
      }, []);
      // Get the min and max y value.
      const extentY = d3Array.extent(allYValues);
      const scaleY = createScaleY(extentY[0], extentY[1], height);

      const lineShape = d3.shape.line()
        .x((d) => scaleX(xAccessor(d)))
        .y((d) => scaleY(yAccessor(d)))
        .curve(d3.shape.curveBasis);

      const path = lineShape(data);
      console.log(`dbg path: ${path}`);

      return {
        data,
        scale: {
          x: scaleX,
          y: scaleY,
        },
        path,
        ticks: data.map((datum) => {
          const time = xAccessor(datum);
          const value = yAccessor(datum);

          return {
            x: scaleX(time),
            y: scaleY(value),
            datum,
          };
        }),
      };
    }
}

