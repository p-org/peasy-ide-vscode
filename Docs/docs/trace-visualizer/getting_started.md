<style>
	.md-typeset__table, .w-full {
		width: 100%;
	}
	.block {
		display: block;
	}
	.flex {
		display: flex;
	}
	.flex-1 {
		flex: 1;
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

### **Launching**

First, make sure that you are in a P project directory and that you have JSON error traces available!

Once you have a JSON trace, you can press ++f6++ to quick launch the trace visualizer. This should open a new tab in your Visual Studio Code and a file dialog window should open to prompt you to select JSON traces to visualize.

Another alternative to launch the visualizer is to use the Visual Studio Code shortcut ++cmd++ + ++shift++ + ++p++ (Mac) or ++ctrl++ + ++shift++ + ++p++ (Windows) to open the Command Palette and typing `PeasyViz: Run` and clicking to launch the visualizer.

<figure class="video_container">
    <video controls="true" allowfullscreen="true">
        <source src="../../videos/trace-visualizer/getting_started.mp4" type="video/mp4"/>
    </video>
</figure>

### **Terminology**

<u>Log</u> - The text of all the actions wthin the trace.  
<u>Motif</u> - Structural patterns in the visualization graph.  
<u>Fields</u> - Each JSON log entry contains the log text, and fields associated with the log. I.e., field `action` is the type of log it is (`SendEvent`, `ReceiveEvent`, `StateTransition`, etc...). Field `target` is the target machine of a `SendEvent` log entry. Field `machine` is the name of the machine. More details can be found in [P JSON Output](./p_json_output.md)

### **Breakdown**
<div class="screenshots">
	<img src="../../images/trace-visualizer/trace_visualizer.png">
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
