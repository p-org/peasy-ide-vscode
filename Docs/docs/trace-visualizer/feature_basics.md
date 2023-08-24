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

**Compiling Code**

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