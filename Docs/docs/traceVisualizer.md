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
	.justify-center {
		justify-content: center;
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
  <h2>Trace Visualizer</h2>
</div>

### **Getting Started**

First, make sure that you are in a P project directory and that you have JSON error traces available!

Once you have a JSON trace, you can press ++f6++ to quick launch the trace visualizer. This should open a new tab in your Visual Studio Code and a file dialog window should open to prompt you to select JSON traces to visualize.

Another alternative to launch the visualizer is to use the Visual Studio Code shortcut ++cmd++ + ++shift++ + ++p++ (Mac) or ++ctrl++ + ++shift++ + ++p++ (Windows) to open the Command Palette and typing `PeasyViz: Run` and clicking to launch the visualizer.

### **Terminology**

<u>Log</u> - The text of all the actions wthin the trace.  
<u>Motif</u> - Structural patterns in the visualization graph.  
<u>Fields</u> - Each JSON log entry contains the log text, and fields associated with the log. I.e., field `action` is the type of log it is (`SendEvent`, `ReceiveEvent`, `StateTransition`, etc...). Field `target` is the target machine of a `SendEvent` log entry. Field `machine` is the name of the machine.

### **Interface Breakdown**

![Trace Visualizer](../images//trace-visualizer/trace_visualizer.png)

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

### **Features**

#### **Basics**

1. Hovering over a log highlights the corresponding node in the main panel and vice versa.
	
	<figure class="video_container">
		<video controls="true" allowfullscreen="true">
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/3c7a1246-a3d7-4b6c-893f-1a0492aa30f0" type="video/mp4"/>
		</video>
	</figure>

2. A series of individual nodes are collapsible for compactness in UI.

	<figure class="video_container">
		<video controls="true" allowfullscreen="true">
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/236a2926-a177-4381-894f-92ce38d86ca8" type="video/mp4"/>
		</video>
	</figure>

3. Machines are toggleable so users can show/hide a machine.

	<figure class="video_container">
		<video controls="true" allowfullscreen="true">
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/4d1c24aa-89d0-4713-9dbf-174ef9cd746d" type="video/mp4"/>
		</video>
	</figure>

4. Filtering a machine will remove all machines that has not direct connection to the current machine. 

	<ul>
		<li data-icon="❑">
			In the video demo, we first filtered machine "Coordinator(6)", which hid all machines that has no direct connections to "Coordinator(6)". We then filtered machine "Client(9)" as well, which removed all other machines as none of them were connected to both "Coordinator(6)" and "Client(9)".
		</li>
	</ul>

	<figure class="video_container">
		<video controls="true" allowfullscreen="true">
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/cf74af1c-bc1c-4c01-b2ae-0a8a0166e28c" type="video/mp4"/>
		</video>
	</figure>

5. Clicking on an individual node will open a dialog box and it will have the log text by default and a "Show More" button if it has any fields. Clicking on the "Show More" will show details regarding the log.

	<figure class="video_container">
		<video controls="true" allowfullscreen="true">
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/13bfcbfa-6b57-49b4-87fa-929800b6b7a3" type="video/mp4"/>
		</video>
	</figure>

<a name="search-bar"></a>
#### **Search Bar**

1. Fields filtering using "=". 

	<ul>
		<ul>
			<li data-icon="❑">
				`isEntry=true` looks for logs that has a field of isEntry and its value is true
			</li>
			<li data-icon="❑">
				`action=DequeueEvent && state=WaitForPrepareResponses` looks for logs that are of action DequeueEvent and the machine is in state `WaitForPrepareResponses`
			</li>
		</ul>
	</ul>

	<figure class="video_container">
		<video controls="true" allowfullscreen="true">
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/1ebf50f6-1e30-4d28-ac43-81d517237ad8" type="video/mp4"/>
		</video>
	</figure>

2. Text filtering. Filtering by text highlights a node if the log contains the text or the log's fields contains the text.

	<ul>
		<li data-icon="❑">
			`true` will look for logs that either contains the the word "true" or the log has fields that contain the word "true"
		</li>
	</ul>

	<figure class="video_container">
		<video controls="true" allowfullscreen="true">
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/5d1f6d71-9851-4218-bae4-a144f8824853" type="video/mp4"/>
		</video>
	</figure>

3. Nonalphanumeric text filtering. If the text contains any nonalphanumeric characters, surround the text with quotes.

	<ul>
		<li data-icon="❑">
			`"status=0"` look for logs that contains the text "status=0" or the log's fields contains the text "status=0"
		</li>
	</ul>

	<figure class="video_container">
		<video controls="true" allowfullscreen="true">
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/1d5387ab-43d5-43d0-9e08-3ed30bdfcc93" type="video/mp4"/>
		</video>
	</figure>


#### **Motifs**

1. Pre-built options. Selecting one of the default motif options will highlights paths in the visualization that matches the motif pattren. In the example, paths in the main panel that matches Motif 1 (a simple sending request pattern, one machine sents to another machine) are highlighted.

	<figure class="video_container">
		<video controls="true" allowfullscreen="true">
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/5ebf79af-af52-4c4c-8e63-42d1ae75b5fe" type="video/mp4"/>
		</video>
	</figure>

2. Building custom motifs. You can build your own custom motif pattern in the search bar under the "Structured Search" tab. In the example, the custom motif searches for pattern where machine 1 sends something to machine 2, and then later sends something to machie 3, and lastly sends something to machine 4.
	<ul>
		<li data-icon="❑">Single click creates a node in a machine</li>
		<li data-icon="❑">Click and drag connects one machine's node to another machine's node</li>
		<li data-icon="❑">Double clicking a node deletes it</li>
	</ul>

	<figure class="video_container">
		<video controls="true" allowfullscreen="true">
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/8123613c-7cec-4aac-ac52-6de02d2cca21" type="video/mp4"/>
		</video>
	</figure>

3. P motifs. You can find specific P send-receive patterns within the visualizer using the following syntax in the [search bar](#search-bar).
	<ul>
		<li data-icon="❑">Syntax</li>
		<ul>
			<li data-icon="❑">`#pmotif=({constraint1}>{constraint2}>>{constraint3}...)`</li>
			<ul>
				<li data-icon="❑">`constraint[n]` is any text filtering format supported by the basic [search bar](#search-bar)</li>
				<li data-icon="❑">`>` and `>>` indicates the searching behavior after a constraint is satisfied</li>
				<ul>
					<li data-icon="❑">
						`#pmotif=({constraint1}>{constraint2})` means that we are looking for a send event that satisfies `constraint1` and then the **immediate** first send event that satisfies `constraint2`
					</li>
					<li data-icon="❑">
						`#pmotif=({constraint1}>>{constraint2})` means that we are looking for a send event that satisfies `constraint1` and then **any** send event afterwards that satisfies constraint `constraint2`
					</li>
				</ul>
			</ul>
			<li data-icon="❑">All P send-receive patterns matching the specified P motif are highlighted</li>
		</ul>
		<li data-icon="❑">Example</li>
		<ul>
			<li data-icon="❑">`#pmotif=({eInformCoordinator && target="Participant(3)"}>>{"status=0"}>{target="Client(8)"})`</li>
			<li data-icon="❑">The constraints of the pattern we are looking for:</li>
			<ul>
				<li data-icon="❑">`constraint1` = `eInformCoordinator && target="Participant(3)"`</li>
				<li data-icon="❑">`constraint2` = `"status=0"`</li>
				<li data-icon="❑">`constraint3` = `target="Client(8)"`</li>
			</ul>
			<li data-icon="❑">The pattern breakdown:</li>
			<ul>
				<li data-icon="❑">We first look for a send event that satisfies `constraint1` — that the log contains the text "eInformCoordinator" **AND** field `target="Participant(3)"`</li>
				<li data-icon="❑">Then, after a send event *from machine A to B* satisfying `constraint1` is found, we are looking for another send event *from machine B to C* that satisfies `constraint2` anytime afterwards (indicated by the search behavior `>>`) — that the log constains the text "status=0"</li>
				<li data-icon="❑">Lastly, after the send event *from machine B to C* satisfying `constraint2` is found, we are looking for one last send event *from machine C to D* that satisfies `constraint3` immediately afterwards (indicated by the search behavior `>`) — that the log has field `target="Client(8)"`</li>
			</ul>
			<li data-icon="❑">Caveat</li>
			<ul>
				<li data-icon="❑">Machines A, B, C, D doesn't necessarily have to be all different machines — this was just to show that the send event is between two different machines</li>
			</ul>
		</ul>
		<li data-icon="❑">
			In the video, we are looking for first a send event that contains text "eWriteTransReq", then immediately another send event that contains text "eWriteTransResp", and lastly another immediate send event that contains the text "eReadTransReq"
		</li>
	</ul>

	<figure class="video_container">
		<video controls="true" allowfullscreen="true">
			<source src="../videos/trace-visualizer/p_motif.mp4" type="video/mp4"/>
		</video>
	</figure>
