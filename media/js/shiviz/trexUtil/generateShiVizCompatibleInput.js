const generateShiVizCompatiableInput = (log, filePath) => {
  const steps = parseTxtTrace(log).steps;
  var out = "";
  generateVectorClock(steps);
  for (let s = 0; s < steps.length; s++) {
    for (let m in steps[s]) {
      var machineDetailsAtNode = steps[s][m];
      //   console.log(machineDetailsAtNode);
      if ("vectorClock" in machineDetailsAtNode) {
        out += `${machineDetailsAtNode.details}\n${
          machineDetailsAtNode.machine
        }\n${JSON.stringify(machineDetailsAtNode.vectorClock)}\n`;
      }
    }
  }
  return out;
};
