/**
 * Converts time from string to minutes
 * @param time - time in format 'HH:mm'
 * @returns {number} - time in minutes
 */
export function timeToMins(time) {
  const tArr = time.split(':');
  return +tArr[0] * 60 + +tArr[1];
}

/**
 * Converts time from minutes to string
 * @param mins - time in minutes
 * @returns {string} - time in format 'HH:mm'
 */
export function minsToTime(mins, pad = 2) {
  return `${String(Math.floor(mins / 60)).padStart(pad,0)}:${String(mins % 60).padStart(2,0)}`
}

/**
 * Calc duration of block in mins and as time string
 * @param block
 * @returns {{mins: *, time: string|*}}
 */
export function calcDuration(block, pad = 2) {
  let { time1, time2 } = block;
  time2 = time2 || time1;
  const time1Mins = timeToMins(time1);
  const time2Mins = timeToMins(time2);
  let time, mins;
  mins = time2Mins - time1Mins;
  if (mins < 0) {
    mins = 24 * 60 + mins;
  }
  time = minsToTime(mins, pad);
  return { mins, time };
}

/**
 * Calc block`s left position and width according to timeShift. Result is in %
 * @param block - time block
 * @param timeShift
 * @returns {{x: number, w: number}}
 */
export function calcBlockPlace(block, timeShift = 0) {
  const minWidth = 100 / 24 / 60;
  const t1Min = timeToMins(block.time1) - timeShift * 60;
  const x = minWidth * t1Min;
  const { mins } = calcDuration(block);
  const w = minWidth * mins;

  return { x, w };
}

/**
 * if timeShift breaks block then split this block on two parts else just wrap it in array
 * @param block - any time block with time1 & time2 properties
 * @param timeShift - the first hour that showed
 * @returns {*[]} - block split if needed
 */
export function splitBlock(block, timeShift) {
  const t1 = timeToMins(block.time1);
  const t2 = timeToMins(block.time2);
  const splitter = timeShift * 60;
  if (
    (t2 > t1 && t1 < splitter && t2 > splitter) || // inside one day
    (t2 < t1 && t1 < splitter + 24 * 60 && t2 + 24 *60 > splitter + 24 *60)    // across midnight
  ) {
    return [
      {
        ...block,
        id: `${block.id}/1`,
        time1: block.time1,
        time2: minsToTime(splitter),
      },
      {
        ...block,
        id: `${block.id}/2`,
        time1: minsToTime(splitter),
        time2: block.time2,
      },
    ]
  } else {
    return [block]
  }
}

/**
 * Check if one action intersect another one
 * @param action - action to check
 * @param actions - all actions
 * @returns {boolean} - true if intersection found
 */
export function checkIntersection(action, actions) {
  const actionTime = {
    t1: timeToMins(action.time1),
    t2: timeToMins(action.time2),
  };
  return !!actions.find(item => {
    const itemTime = {
      t1: timeToMins(item.time1),
      t2: timeToMins(item.time2),
    };

    if (action.id === item.id) return false; //skip itself

    return (
      (actionTime.t1 < itemTime.t1 && actionTime.t2 > itemTime.t1) || // left side
      (actionTime.t1 < itemTime.t2 && actionTime.t2 > itemTime.t2) || // right side
      (actionTime.t1 > itemTime.t1 && actionTime.t2 < itemTime.t2)    // inside
    )
  })
}

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 */
export function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

export function splitText(text, font, width) {
  if (!text) return [''];
  const arr = text.match(/\S+\s*/g).map(i => i.trimRight());
  const spl = [];
  let buf = '';
  for (let i = 0; i < arr.length; i++) {
    if (getTextWidth(buf + ' ' + arr[i], font) > width) {
      spl.push(buf.trimLeft());
      buf = '';
      i--;
    } else {
      buf += ' ' + arr[i]
    }
  }
  spl.push(buf.trimLeft());

  return spl;
}
