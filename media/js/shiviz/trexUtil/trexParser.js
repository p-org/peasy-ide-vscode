// const { createHash } = require("crypto");

/**
 * This file contains utilties to convert
 * a P trace file into a consumable format
 * for visualization
 */

/** Only parse the following types of lines */
const typesToParse = [
  "<DequeueLog>",
  "<ErrorLog>",
  "<HaltLog>",
  "<MonitorLog>",
  "<RaiseLog>",
  "<AnnounceLog>",
  "<ReceiveLog>",
  "<SendLog>",
  "<StateLog>",
];

/** Whether the line we parse has the correct details */
const hasMatches = (entry) => {
  return entry && entry.length > 1;
};

/** Whether the line we parse is of the right type */
const hasValidType = (entry) => {
  return entry[1] && typesToParse.find((type) => type === entry[1]);
};

/** Whether the line we parse references a machine */
const hasMachineReference = (entry) => {
  return entry[2];
};

/** What we consider to be valid entries.
 * It must match our pattern, have a valid type, refer to a machine
 * Exludes some extra events that aren't useful
 */
const validEntry = (entry, line) => {
  return (
    hasMatches(entry) &&
    hasValidType(entry) &&
    hasMachineReference(entry) &&
    line.indexOf("exits state") < 0 &&
    line.indexOf("exits hot state") < 0 &&
    line.indexOf("exits cold state") < 0 &&
    line.indexOf("GotoStateEvent") < 0 &&
    line.indexOf("enters state 'Init") < 0
  );
};

/** Parse directly form a P raw trace TXT file. This is pretty complicated
 * compared to using our TRex JSON Schema
 */
const parseTxtTrace = (rawTrace = []) => {
  let allMachines = [];
  let events = [];
  let machineDetails = {};
  let error = null;
  let steps = [];
  let addressibleStepIds = {};

  // Keep track of latest machine and event
  // So we can consolidate one event into one line
  let latestStepNumberIndex = 0;
  let latestEvent = " ";
  let latestIndex = null;
  let latestMachine = null;

  // Keep a dictionay mapping dequeue events to
  // original senders so we can draw the arrow back
  // to a unique identifier
  let dequeueToSenderMap = {};
  let dequeueToSenderMachineMap = {};

  const logLines =
    rawTrace &&
    rawTrace
      .replace(/PImplementation\./gs, "") // Delete PImplementation text
      .replace(/<ReceiveLog>(.*?dequeued event.*?\.)/gs, "<DequeueLog>$1") // Treat these as Deqeueues
      .split("\n"); // Split up the input file now into an array

  /** If the parsed log is empty throw an error */
  if (logLines.length === 0) {
    return {
      //   parseError: (
      //     <>
      //       File format is not supported.{" "}
      //       <Link href="/trex/help#faq-1">What traces can TRex visualize?</Link>
      //     </>
      //   ),
      error: "Log Lines Length == 0 ERROR",
    };
  }

  logLines.forEach((line, index) => {
    // console.log({ addressibleStepIds });

    // keep track of the current step
    let stepIndex;
    let stepNumberIndex;
    // Capture EventType and Machine name
    const matches = line.match(/^(<.*?>)\s*(.*?)\s.*?/);
    const type = matches && matches[1];
    const machine = matches && matches[2] && matches[2].replace(/'/g, "");
    // console.log({ matches, type, machine });

    // Detect state Name
    const state = line.match(/^.*? state '(.*?)'.*?$/);
    const machineState = state && state[1];
    // console.log({ state, machineState, index });

    // Detect message sent and capture recipient machine name
    const messageSent = line.match(
      /^<SendLog>.*? sent event '.*?\s.*?to '(.*?)'.*?$/
    );

    const recipient = messageSent && messageSent[1];

    // Capture payloads
    const payload = line.match(/^.*? payload \((.*?)\)'.*?$/);

    // console.log({ payload, index });

    // Capture event names
    const hasEvent = line.match(/^.*?event '(.*?)['\s].*?'.*?$/);

    // console.log({ hasEvent, index });

    // Capture event names for Monitors
    const monitorProcessingEvent = line.match(
      /^.*?processing event '(.*?)'.*?$/
    );

    // console.log({ monitorProcessingEvent, index });

    // Capture monitor state transitions
    const monitorStateTransition = line.match(
      /^<MonitorLog>.*?enters (.*?)state '(.*?)'.*?$/
    );
    // console.log({ monitorStateTransition, index });

    // Detect if this log line has an event.
    // Either it's an event between machines or it's an event
    // processed by a monitor
    const event = hasEvent
      ? hasEvent[1]
      : monitorProcessingEvent
      ? monitorProcessingEvent[1]
      : null;

    // console.log({ event, hasEvent, monitorProcessingEvent, index });

    // Keep track of the list of unique machines created
    if (
      machine &&
      type === "<CreateLog>" &&
      machine.indexOf("GodMachine") < 0
    ) {
      allMachines.push(machine);
      machineDetails[machine] = {
        name: machine,
        count: 0,
      };
    }

    // Keep track of the list of machines that are monitors
    // We use a dictionary just so it's easy to find later instead
    // of searching through an array
    if (type === "<MonitorLog>" && machineDetails[machine]) {
      machineDetails[machine] = {
        ...machineDetails[machine],
        monitor: true,
      };
    }

    // Index of the machine and recipients within the machines array
    // This will be used during visualization when iterating through columns
    const machineIndex = allMachines.indexOf(machine);
    const recipientIndex = messageSent && allMachines.indexOf(recipient);

    if (validEntry(matches, line)) {
      // console.log(`\n${index + 1}: ==============================`);
      // console.log("Valid Entry Line:", line);
      // console.log("Machine:", machine);

      // Keep track of count of log lines for this specific machine
      if (machineDetails[machine]) {
        let count = machineDetails[machine].count;
        machineDetails[machine].count = count + 1;
      }

      // Keep track of all event names
      if (event && event.indexOf("Init") < 0 && events.indexOf(event) < 0) {
        events.push(event);
      }

      // Assume that any Monitor state transition was caused by some
      // Monitor event in the previous step
      if (monitorStateTransition) {
        stepIndex = latestIndex || index;
        stepNumberIndex = latestStepNumberIndex;
      } else if (
        // Don't capture Dequeue/Receive in the same step even if it's the same event name
        type !== "<DequeueLog>" &&
        type !== "<ReceiveLog>" &&
        // Otherwise, group the same events as one step
        // unless it's the same machine
        machine &&
        event &&
        machine !== latestMachine &&
        event === latestEvent
      ) {
        // Don't increment the step Index if this is
        // the same as the last event we observed
        stepIndex = latestIndex;
        stepNumberIndex = latestStepNumberIndex;
      } else {
        // Make current even the latest
        if (event) {
          latestEvent = event;
        }
        // Make current index the latest
        stepIndex = index;
        stepNumberIndex = latestStepNumberIndex + 1;
        latestIndex = index;
        latestStepNumberIndex = latestStepNumberIndex + 1;
      }

      // Make current machine the latest
      latestMachine = machine;
      // console.log({ machineIndex });
      // Sanity check that the machine had a <CreateLog> event
      // Meaning it's not the first time we see this machine
      if (machineIndex >= 0) {
        //  Create a machine ID. It may not be unique
        const machineId = payload
          ? `_${machine}:${event || "_"}:${payload[1]}:${recipient || machine}`
          : `_${stepIndex}:${machine}`;

        // console.log({ machineId });

        // Create a target ID. It may not be unique
        const targetId =
          payload &&
          recipient &&
          `_${recipient}:${event || "_"}:${payload[1]}:${recipient}`;

        // Keep track of every unique ID that we can point to as a unique identifier
        if (payload) {
          addressibleStepIds[machineId]
            ? addressibleStepIds[machineId]++
            : (addressibleStepIds[machineId] = 1);
        }

        // Make the machine ID unique by incrementing if we've seen it before
        const machineAddress =
          machineId && `${machineId}${addressibleStepIds[machineId] || ""}`;

        // Make the target ID unique by incrementing if we've seen it before
        const targetAddress =
          targetId &&
          `${targetId}${
            addressibleStepIds[targetId]
              ? addressibleStepIds[targetId] + 1
              : "1"
          }`;

        // console.log({
        //   machine,
        //   event,
        //   payload,
        //   recipient,
        //   stepIndex,
        //   machineId,
        //   targetId,
        //   machineAddress,
        //   targetAddress,
        // });

        // console.log({ machineAddress });

        // Hash the IDs so we don't reveal names and payloads via URLs
        const hashedMachineAddress = hash(machineAddress);
        let hashedTargetAddress;

        // If this log event has a target, keep track of the sender's
        // unique address in a dictionary for later
        if (targetId) {
          hashedTargetAddress = hash(targetAddress);
          dequeueToSenderMap[hashedTargetAddress] = hashedMachineAddress;
          dequeueToSenderMachineMap[hashedTargetAddress] = machine;
        }

        // console.log({ dequeueToSenderMachineMap });

        // Now add a step at this index. This will correspond to a
        // row in the visualization

        // Start with the keys that appear in all items
        // console.log({ steps, stepNumberIndex });
        steps[stepNumberIndex] = {
          ...steps[stepNumberIndex],
          [machine]: {
            actionID: hashedMachineAddress,
            machine: machine,
            step: stepIndex,
            machineState: machineState,
            actionType: type,
            details: line,
            machineIndex: machineIndex,
            recipientIndex: recipientIndex,
            dequeueActionID: recipientIndex >= 0 && hashedTargetAddress,
            recipientActionID:
              recipientIndex >= 0 && `_${stepNumberIndex}:${recipient}`,
            recipientName: recipientIndex >= 0 && recipient,
            eventName: event,
            senderActionID: dequeueToSenderMap[hashedMachineAddress],

            // We need to do this magic because we don't know in
            // advance what the dequeue will be
            senderName:
              allMachines[
                allMachines.indexOf(
                  dequeueToSenderMachineMap[hashedMachineAddress]
                )
              ],
            senderIndex: allMachines.indexOf(
              dequeueToSenderMachineMap[hashedMachineAddress]
            ),
            payload: payload && payload[1],
            // machineDetails: JSON.parse(JSON.stringify(machineDetails)),
          },
        };

        // If there is a recipient, add the recipient node
        // This is not part of the original log file
        // console.log({ recipient });

        if (recipient && recipientIndex >= 0) {
          steps[stepNumberIndex][recipient] = {
            machine: recipient,
            actionID: `_${stepNumberIndex}:${recipient}`,
            step: stepIndex,
            actionType: type === "<SendLog>" ? "<Recipient>" : type,
            details: line.replace(/<SendLog>/, "<Recipient>"),
            eventName: event,
            payload: payload && payload[1],
          };
        }
      }

      // TODO: Fix this. Machines created by GodMachine end up as
      // Print log lines here unless we exclude them
      else if (
        type !== "<SendLog>" &&
        type !== "<ReceiveLog>" &&
        type !== "<DequeueLog>"
      ) {
        // console.log({ MACHINEINDEX2: machineIndex });
        if (type === "<ErrorLog>") {
          error = line;
        }
      }
    } else {
      stepIndex = latestIndex || index;
      stepNumberIndex = latestStepNumberIndex;
    }
  });

  const machines = allMachines;
  const parsedTrace = {
    machines,
    events,
    machineDetails,
    steps,
    error,
    addressibleStepIds,
  };

  // console.log(parsedTrace);

  return parsedTrace;
};

function hash(string) {
  // return createHash("sha256").update(string).digest("hex");
  return CryptoJS.SHA256(string);
}
