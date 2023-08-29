<style>
    ul li {
		padding-left: 0.5em;
	}
	ul li::marker {
		content: attr(data-icon);
		font-size: 1em;
	}
    .md-typeset h1 {
        display: none;
    }
</style>

<div align="center">
    <h2>Compare and Contrast</h2>
</div>

Finally, let's talk about the last feature of the Peasy Trace Visualizer: comparing and contrasting multiple traces. When selecting traces to visualize upon launching the trace visualizer, you can choose to select multiple JSON traces at once *(it is suggested that you put all the traces in one folder for easier selection in the file dialog window)*.

**View Different Traces**

The trace visualizer interface when selecting to view multiple traces is generally the same, with a few exceptions. On the left panel, in addition to the `Log lines` and `Motifs` tabs, there is now also a `Clusters` tab. Additionally, in the main center graph panel, there is a dropdown option to select the different traces that were chosen. Lastly, at the top of the right panel, there is an option for `Pairwise` which we'll discuss right after.

<ul>
    <li data-icon="❑">
        Each of the selected traces represents a different iteration in the order they were originally chosen in the file dialog window. In the video demos below, we chose to visualize three traces and switched between them by selecting the respective option from the dropdown in the center panel.
    </li>
</ul>


<figure class="video_container">
	<video controls="true" allowfullscreen="true" style="width: 100%;">
		<source src="../../videos/trace-visualizer/selecting_multiple_traces.mp4" type="video/mp4"/>
	</video>
</figure>

<figure class="video_container">
	<video controls="true" allowfullscreen="true" style="width: 100%;">
		<source src="../../videos/trace-visualizer/switching_traces.mp4" type="video/mp4"/>
	</video>
</figure>

**Trace Clusters**

The `Clusters` tab allows us to separate traces into different groups based on a chosen metric between `number of machines` or `trace comparison`.

<ul>
    <li data-icon="❑">
        Clustering by the <code>number of machines</code> groups traces from the smallest to the largest number of machines.
    </li>
</ul>

<ul>
    <li data-icon="❑">
        Clustering by the <code>trace comparison</code> groups traces to see an overview of how the traces differ from a selected base. Upon selecting to cluster by <code>trace comparison</code>, a dropdown is displayed to select a base trace. Then, options appear for us to select traces that have the same or different logs from the base trace, as well as same or different machines from the base trace.
    </li>
</ul>

**Pairwise Comparisons**

By default, you can select to view each trace individually, or you can click the `Pairwise` button on the top of the right panel to view two traces side by side. 

