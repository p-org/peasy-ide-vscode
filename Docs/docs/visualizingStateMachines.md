<style>
  .md-typeset h1,
  .md-content__button {
    display: none;
  }
  
</style>

<div align="center">
  <h2>Peasy State Machine Visualizations</h2>
</div>

Many P users wanted a method of creating visualizations of P state machines and their transitions, states, and events to help supplement design documents, visualize P code, and help to better understand the way P state machines worked. With the help of the open-source tool [Stately](https://stately.ai/viz), that dream is now realized. The stately tool 

!!! info "Acknowledgement"
	The Stately tool's state machine visualization capability has been leveraged to visualize the logic of a given P state machine. To understand more about XState  go through their [official documentation](https://stately.ai/docs/xstate) and [Github repository](https://github.com/statelyai/xstate)

In order to create visualizations of P state machines, follow these steps or scroll down to watch a demo:

1. Press ++f7++ to run the command `p compile --mode stately` in the terminal. Your visualization code is generated! A message in red should be sent through the terminal.
<div class="screenshots" markdown="1">
   <img alt="Syntax Highlighting" src="../images/code_generation_text.png" >
</div>
2. Navigate to the file using ++ctrl++ `Click` or ++cmd++ `Click`. Copy-and-paste the file contents into https://stately.ai/viz.
3. Click the Visualize button on the bottom left!

Voila! Here is an example visualization using the P Tutorial's Two Phase Commit project.
<div class="screenshots" markdown="1">
  <img alt="Visualization" src="../images/visualization.png" >
</div>

<div align="center">
  <h2>How to Navigate Stately's Open Source Visualization Website</h2>
</div>

Every visualization contains exactly one state machine. The name of the machine is at the top left; in this case, the machine is called `Coordinator`. All the shapes and arrows inside are part of the state machine `Coordinator`.

States are represented with squares, and events are represented with ovals.The beginning state is pointed to with an arrow. In the above case, the beginning state is `Init`.

The state WaitForTransaction is outlined in blue because the machine always travelled from the `Init` State to the WaitForTransaction state. The event `eTransReq` is colored in light blue because the state machine `Coordinator` is waiting for that one event to happen. Click `eWhileTransReq`, and the three other events will light up because the `Coordinator` machine is now waiting for one of the other three events to happen.

This way, you can interact with these P state machine visualizations too!

Stately's website contains four tabs:

- **Code Tab**: Use this tab to copy-and-paste code to visualize state machines.
- **State Tab**: This tab provides information on the state the user is currently at in the machine.
- **Events Tab**: This tab logs all events that have occurred so far among all machines.
- **Actors Tab**: Use this tab to switch to different P state machines in the visualization.

<div align="center">
  <h2>State Machine Visualization Tool Tutorial</h2>
</div>
<figure class="video_container">
  <video controls="true" allowfullscreen="true"  >
    <source src="../videos/visualization.mov" type="video/mp4">
  </video>
</figure>
