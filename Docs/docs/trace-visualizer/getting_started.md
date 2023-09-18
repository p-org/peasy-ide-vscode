<style>
	.md-typeset__table {
		width: 100%;
	}
	ul li {
		padding-left: 0.5em;
	}
	ul li::marker {
		content: attr(data-icon);
		font-size: 1em;
	}

	.md-typeset h1,
	.md-content__button {
		display: none;
	}
</style>


<div align="center">
  <h2>Getting Started</h2>
</div>

A trace visualizer provides visualization capabilities to depict any sequence of events that occurred within a distributed system from its trace files. The interactive UI of the trace visualizer makes it easier for a user to identify any patterns or anamolies in the behaviour of a system and helps find bugs quickly.

!!! info "Acknowledgement"
	The trace visualizer in Peasy is built on top of [ShiViz visualization tool](https://github.com/DistributedClocks/shiviz). We recommend that you go through their [Visualizing Distributed System Executions](https://homes.cs.washington.edu/~mernst/pubs/visualize-distributed-tosem2020.pdf) paper to learn more about the ShiViz tool.

### **Launching**

First, ensure that you are in a P project directory and that you have JSON error traces available!

Once you have a JSON trace, you can press ++f6++ to quickly launch the trace visualizer. This should open a new tab in your Visual Studio Code, and a file dialog window will appear, prompting you to select the JSON traces to visualize.

Alternatively, you can launch the visualizer using the Visual Studio Code shortcut ++cmd++ + ++shift++ + ++p++ (Mac) or ++ctrl++ + ++shift++ + ++p++ (Windows) to open the Command Palette. Then, type `PeasyViz: Run` and click to launch the visualizer.

??? note "Demo Video: How to launch Peasy trace visualizer?"
	<figure class="video_container">
		<video controls="true" allowfullscreen="true" >
			<source src="../../videos/trace-visualizer/getting_started.mp4" type="video/mp4"/>
		</video>
	</figure>

### **Terminology**
Term | Description
------------ | ------------
Log | The text of all the actions within the trace.
Motif | Structural patterns in the visualization graph. 
Fields | Each JSON log entry contains the log text and fields associated with the log. For example, field `action` indicates the type of log it is (`SendEvent`, `ReceiveEvent`, `StateTransition`, etc.). Field `target` specifies the target machine of a `SendEvent` log entry, while field `machine` provides the name of the machine. More details can be found in [P JSON Output](./p_json_output.md).

### **Breakdown**
<div class="screenshots">
	<img src="../../images/trace-visualizer/trace_visualizer.png" >
</div>

<table>
	<thead class="block">
		<tr class="flex">
			<th class="flex-1">Left Panel</th>
			<th class="flex-1">Center Panel</th>
			<th class="flex-1">Right Panel</th>
		</tr>
	</thead>
	<tbody class="block">
		<tr class="flex">
			<td class="flex-1">
				<ul>
					<li data-icon="❑">Logs</li>
					<li data-icon="❑">Motif finding</li>
				</ul>
			</td>
			<td class="flex-1">
				<ul>
					<li data-icon="❑">Search bar for filtering</li>
					<li data-icon="❑">Graph visualization of logs</li>
				</ul>
			</td>
			<td class="flex-1">
				<ul>
					<li data-icon="❑">Log details</li>
				</ul>
			</td>
		</tr>
	</tbody>
</table>
