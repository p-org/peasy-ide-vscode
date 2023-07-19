const generateVectorClock = (steps) => {
  var machinesVectorClockMap = {};
  var unhandledSenderMachines = {};
  for (let step = 0; step < steps.length; step++) {
    let trexRowMachines = steps[step];
    for (let machine in trexRowMachines) {
      var machineDetailsAtNode = trexRowMachines[machine];

      if (machineDetailsAtNode.actionType === "<Recipient>") {
        continue;
      }

      var machineActionID = machineDetailsAtNode.actionID;
      var recipient = machineDetailsAtNode.dequeueActionID
        ? {
            name: machineDetailsAtNode.recipientName,
            id: machineDetailsAtNode.dequeueActionID,
          }
        : null;
      var sender = machineDetailsAtNode.senderActionID
        ? {
            name: machineDetailsAtNode.senderName,
            id: machineDetailsAtNode.senderActionID,
          }
        : null;
      //  If machine has not been initiated in the vector clock map, initiate it
      if (!(machine in machinesVectorClockMap)) {
        machinesVectorClockMap[machine] = {
          [machine]: 0,
        };
      }

      machinesVectorClockMap[machine][machine] += 1;

      if (recipient) {
        unhandledSenderMachines[recipient.id] = JSON.parse(
          JSON.stringify(machinesVectorClockMap[machine])
        );
      }

      if (sender) {
        var recipientVectorClockMachines = Object.keys(
          machinesVectorClockMap[machine]
        );
        var senderVectorClockMachines = Object.keys(
          unhandledSenderMachines[machineActionID]
        );
        var unionMachines = [
          ...new Set([
            ...recipientVectorClockMachines,
            ...senderVectorClockMachines,
          ]),
        ];
        // console.log("\n======================");
        // console.log(unhandledSenderMachines[machineActionID]);
        for (
          let unionMachine = 0;
          unionMachine < unionMachines.length;
          unionMachine++
        ) {
          if (unionMachines[unionMachine] !== machine) {
            // console.log(unionMachines[unionMachine]);
            machinesVectorClockMap[machine][unionMachines[unionMachine]] =
              Math.max(
                machinesVectorClockMap[machine][unionMachines[unionMachine]] ??
                  0,
                unhandledSenderMachines[machineActionID][
                  unionMachines[unionMachine]
                ] ?? 0
              );
            // console.log(machinesVectorClockMap[machine]);
          }
        }
        delete unhandledSenderMachines[machineActionID];
      }

      steps[step][machine].vectorClock = JSON.parse(
        JSON.stringify(machinesVectorClockMap[machine])
      );

      //   console.log({ machinesVectorClockMap, unhandledSenderMachines });
    }
  }
  //   console.log(machinesVectorClockMap);
};
