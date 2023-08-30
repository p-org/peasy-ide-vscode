<style>
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
  <h2>Basics</h2>
</div>

Let's start with some of the basics of the trace visualizer—how to interface with the trace visulizer!

**Log/Node Highlighting**

When hovering over a log, it highlights the corresponding node in the main graph panel (center panel), and conversely, hovering over a node highlights the corresponding log in the logs panel (left panel).
	
<figure class="video_container">
	<video controls="true" allowfullscreen="true" style="width: 100%;">
		<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/3c7a1246-a3d7-4b6c-893f-1a0492aa30f0" type="video/mp4"/>
	</video>
</figure>

**Collapsible Nodes**

When clicking a node, you can choose to `Collapse` or `Expand` the sequence of individual machine nodes for a more compact UI.

<figure class="video_container">
	<video controls="true" allowfullscreen="true" style="width: 100%;">
		<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/236a2926-a177-4381-894f-92ce38d86ca8" type="video/mp4"/>
	</video>
</figure>

**Machine Toggling**

Machines can be toggled on or off, allowing users to show or hide a machine for enhanced analysis.

<figure class="video_container">
	<video controls="true" allowfullscreen="true" style="width: 100%;">
		<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/4d1c24aa-89d0-4713-9dbf-174ef9cd746d" type="video/mp4"/>
	</video>
</figure>

**Machines Filtering**

Filtering a machine will remove all machines that do not have a direct connection to the current machine.

<ul>
	<li data-icon="❑">
    	For example, in the following video demo, we first filtered the machine <code>Coordinator(6)</code>, which hid all machines that have no direct connections to <code>Coordinator(6)</code>. We then filtered the machine <code>Client(9)</code> as well, which removed all other machines since none of them were connected to both <code>Coordinator(6)</code> and <code>Client(9)</code>.
	</li>
</ul>

<figure class="video_container">
	<video controls="true" allowfullscreen="true" style="width: 100%;">
		<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/cf74af1c-bc1c-4c01-b2ae-0a8a0166e28c" type="video/mp4"/>
	</video>
</figure>

**Show More Node Information**

When you click on an individual node in the graph, a dialog box will open containing the log text associated with the node by default. The dialog box also includes a `Show More` button. Clicking the `Show More` button will reveal additional details and data associated with the log.

<figure class="video_container">
	<video controls="true" allowfullscreen="true" style="width: 100%;">
		<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/13bfcbfa-6b57-49b4-87fa-929800b6b7a3" type="video/mp4"/>
	</video>
</figure>
