<style>
.md-typeset h1,
	.md-content__button {
		display: none;
	}
</style>

<div align="center">
  <h2>P JSON Output</h2>
</div>

### **Basic Structure**

Each P error trace JSON output is in the following format.

```js
[
    { ...log entry },
    { ...log entry },
    ...
]
```

### **Log Entry**
Each item in the array of JSON output is a object containing information about a specific log entry. Each log object contains type and details.

```js
{
    type: String,       // Always
    details: {          // Always 
        log: String,    // Always
        id: String,    
        error: String,
        event: String,
        creatorName: String,
        creatorType: String,
        state: String,
        startState: String,
        endState: String,
        payload: Object,
        action: String,
        exception: String,
        haltInboxSize: Number,
        wasBlocked: Boolean,
        sender: String,
        target: String,
        opGroupId: String,
        isTargetHalted: Boolean,
        isEntry: Boolean,
        isInHotState: Boolean,
        eventType: String,
        eventTypes: String[],
        monitor: String,
        strategy: String,
        strategyDescription: String,
        clock: Object,
    }   
}
```
### **Log Types and Fields**

Fields in details of a log object differ based on the type of log it is.


Log Type | Fields
------------ | ------------
AssertionFailure | log, error  
CreateActor | log, id, creatorName, creatorType, clock  
CreateStateMachine | log, id, creatorName, creatorType, clock  
DefaultEventHandler | log, id, state, clock  
DequeueEvent | log, id, event, state, payload, clock  
ExceptionHandled | log, id, state, action, exception, clock  
ExceptionThrown | log, id, state, action, exception, clock  
GoToState | log, id, startState, endState, clock  
Halt | log, id, haltInboxSize, clock  
PopState | log, id, startState, endState, clock  
PopStateUnhandledEvent | log, id, state, event, clock  
PushState | log, id, startState, endState, clock  
RaiseEvent | log, id, state, event, payload, clock  
ReceiveEvent | log, id, state, event, wasBlocked, payload, clock  
SendEvent | log, sender, state, event, target, opGroupId, isTargetHalted, payload, clock  
StateTransition | log, id, state, isEntry, clock  
WaitEvent | log, id, state, eventType, clock  
WaitMultipleEvents | log, id, state, eventTypes, clock  
CreateMonitor | log, monitor, clock  
MonitorProcessEvent | log, monitor, state, event, payload, clock  
MonitorRaiseEvent | log, monitor, state, event, payload, clock  
MonitorStateTransition | log, monitor, isEntry, isInHotState, clock  
StrategyDescription | log, strategy, strategyDescription  

!!! tip "Check out this example <a href="../two_phase_commit_output.json" download>P JSON output</a> based on the [Two Phase Commit Tutorial](https://p-org.github.io/P/tutorial/twophasecommit/) from the P documentation!"
