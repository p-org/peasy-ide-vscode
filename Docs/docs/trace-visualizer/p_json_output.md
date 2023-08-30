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

> Each item in the array is a object containing information about a specific log entry.

### **Log Entry**

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

> Each log object contains type and details. Fields in details are available based on the type of log it is.

### **Log Types and Fields**

<b>AssertionFailure</b> — <i>log, error</i>  
<b>CreateActor</b> — <i>log, id, creatorName, creatorType, clock</i>  
<b>CreateStateMachine</b> — <i>log, id, creatorName, creatorType, clock</i>  
<b>DefaultEventHandler</b> — <i>log, id, state, clock</i>  
<b>DequeueEvent</b> — <i>log, id, event, state, payload, clock</i>  
<b>ExceptionHandled</b> — <i>log, id, state, action, exception, clock</i>  
<b>ExceptionThrown</b> — <i>log, id, state, action, exception, clock</i>  
<b>GoToState</b> — <i>log, id, startState, endState, clock</i>  
<b>Halt</b> — <i>log, id, haltInboxSize, clock</i>  
<b>PopState</b> — <i>log, id, startState, endState, clock</i>  
<b>PopStateUnhandledEvent</b> — <i>log, id, state, event, clock</i>  
<b>PushState</b> — <i>log, id, startState, endState, clock</i>  
<b>RaiseEvent</b> — <i>log, id, state, event, payload, clock</i>  
<b>ReceiveEvent</b> — <i>log, id, state, event, wasBlocked, payload, clock</i>  
<b>SendEvent</b> — <i>log, sender, state, event, target, opGroupId, isTargetHalted, payload, clock</i>  
<b>StateTransition</b> — <i>log, id, state, isEntry, clock</i>  
<b>WaitEvent</b> — <i>log, id, state, eventType, clock</i>  
<b>WaitMultipleEvents</b> — <i>log, id, state, eventTypes, clock</i>  
<b>CreateMonitor</b> — <i>log, monitor, clock</i>  
<b>MonitorProcessEvent</b> — <i>log, monitor, state, event, payload, clock</i>  
<b>MonitorRaiseEvent</b> — <i>log, monitor, state, event, payload, clock</i>  
<b>MonitorStateTransition</b> — <i>log, monitor, isEntry, isInHotState, clock</i>  
<b>StrategyDescription</b> — <i>log, strategy, strategyDescription</i>  

> Check out this example <a href="../two_phase_commit_output.json" download>P JSON output</a> based on the [Two Phase Commit Tutorial](https://p-org.github.io/P/tutorial/twophasecommit/) from the P documentation!
