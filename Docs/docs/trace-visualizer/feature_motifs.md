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
  <h2>Motifs</h2>
</div>

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

3. P motifs. You can find specific P send-receive patterns within the visualizer using the following syntax in the [search bar](./feature_search_bar.md).
	<ul>
		<li data-icon="❑">Syntax</li>
		<ul>
			<li data-icon="❑">`#pmotif=({constraint1}>{constraint2}>>{constraint3}...)`</li>
			<ul>
				<li data-icon="❑">`constraint[n]` is any text filtering format supported by the basic [search bar](./feature_search_bar.md)</li>
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
			<source src="../../videos/trace-visualizer/p_motif.mp4" type="video/mp4"/>
		</video>
	</figure>
