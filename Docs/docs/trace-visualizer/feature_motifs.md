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

In context of a trace visualizer, a motif is a recurring pattern of events you find in a trace. Motifs provide P developers with a means to search for specific communication patterns within the graph. These patterns can greatly assist in debugging sessions, helping developers understand how the machines are interacting with each other.

**Default Motifs**

The trace visualizer comes with default motif options available under the 'Motif' tab in the left panel. By default, there are `2-event`, `3-event`, and `4-event` motifs. Selecting any of these default motif options will highlight paths in the graph that match the motif pattern.

??? note "Demo Video: How to use default motifs in trace visualizer?"

	
	In the following video demo, paths in the graph that match <code>Motif 1</code>, a <code>2-event</code> motif, are highlighted. This motif represents a simple send-receive pattern <i>(one machine sends an event to another machine, and that machine receives the event)</i>.
	

	<figure class="video_container">
		<video controls="true" allowfullscreen="true" >
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/5ebf79af-af52-4c4c-8e63-42d1ae75b5fe" type="video/mp4"/>
		</video>
	</figure>

**Custom Motifs**

In addition to the default motifs, you can also build your own custom motifs! You can build them in the search bar under the `Structured Search` tab. Here's how you can interact with the custom motif builder.

<ul>
	<li data-icon="❑">A single click on a machine line creates a node in that machine.</li>
	<li data-icon="❑">Clicking and dragging connects one machine's node to another machine's node.</li>
	<li data-icon="❑">Double-clicking a node deletes it.</li>
</ul>

??? note "Demo Video: How to build and use custom motifs in trace visualizer?"

	In the video demo below, a custom motif was built that searches for patterns where <code>Machine 1</code> sends something to <code>Machine 2</code>, then later sends something to <code>Machine 3</code>, and finally sends something to <code>Machine 4</code>.

	<figure class="video_container">
		<video controls="true" allowfullscreen="true" >
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/8123613c-7cec-4aac-ac52-6de02d2cca21" type="video/mp4"/>
		</video>
	</figure>

**P Motifs**

Lastly, we have P-specific motifs! With P-specific motifs, you can discover specific sequences of send-receive patterns that satisfy particular constraints within the graph using the following syntax in the [search bar](./feature_search_bar.md).

<ul>
	<li data-icon="❑"><code>#pmotif=({constraint1}>{constraint2}>>{constraint3}...)</code></li>
	<li data-icon="❑"><code>constraint[n]</code> can be any filtering format supported by the basic search bar.</li>
	<li data-icon="❑">
		The characters <code>></code> and <code>>></code> indicate the searching behavior after a constraint is satisfied.<br />
		Typing <code>#pmotif=({constraint1}<b>></b>{constraint2})</code> in the search bar will highlight a send-receive pattern where the first send event satisfies <code>constraint1</code> and the <b>immediate</b> subsequent send event satisfies <code>constraint2</code>.<br />
		In contrast, typing <code>#pmotif=({constraint1}<b>>></b>{constraint2})</code> in the search bar will highlight send-receive patterns where the first send event satisfies <code>constraint1</code> and <b>any</b> second send event that follows the first one satisfies <code>constraint2</code>.
	</li>
</ul>

??? info "More explanation with an example"

	<ul>
		<li data-icon="❑"><code>#pmotif=({eInformCoordinator && target="Participant(3)"}>>{"status=0"}>{target="Client(8)"})</code></li>
		<li data-icon="❑">
			This P motif will highlight a sequence of send-receive patterns as follows: The first send event will satisfy the constraint that the node contains the text <code>eInformCoordinator</code> <b>and</b> has a field <code>target</code> equal to <code>Participant(3)</code>. Then, following this first send event, it will highlight <b>any</b> send events afterwards <i>(indicated by <code>>></code>)</i> that satisfy the constraint that the node contains the text <code>status=0</code> or any of the node's fields' values contain the text <code>status=0</code>. Lastly, we are searching for an immediate send event after any of the send events just found that satisfies the last constraint that the node contain the field <code>target</code> with its value equal to <code>Client(8)</code>.
		</li>
	</ul>

??? note "Demo Video: How to use p-specific motifs in trace visualizer?"
	Another example is shown in the following video demo with this P motif: <code>#pmotif=({eWriteTransReq}>{eWriteTransResp}>{eReadTransReq})</code>. This P motif looks for a sequence of send-receive patterns where the first is a send event that contains the text <code>eWriteTransReq</code>, then an <b>immediate</b> second send event that contains the text <code>eWriteTransResp</code>, and lastly, an <b>immediate</b> third send event that contains the text <code>eReadTransReq</code>.

	<figure class="video_container">
		<video controls="true" allowfullscreen="true" >
			<source src="../../videos/trace-visualizer/p_motif.mp4" type="video/mp4"/>
		</video>
	</figure>
