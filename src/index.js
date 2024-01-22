/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("screen");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");


ctx.fillRect(0, 0, canvas.width, canvas.height);

const screen = new Computer(ctx, canvas);

//<a href="https://www.freepik.com/free-vector/colorful-palm-silhouettes-background_8623833.htm#query=chill%20background&position=0&from_view=search&track=ais&uuid=31bc3913-664d-4b37-a0bd-44da0a60f022">Image by pikisuperstar</a> on Freepik