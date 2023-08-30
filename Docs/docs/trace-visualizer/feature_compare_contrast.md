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

Finally, let's discuss the last feature of the Peasy Trace Visualizer: comparing and contrasting multiple traces. When selecting traces to visualize upon launching the trace visualizer, you can choose to select multiple JSON traces at once. *(It is suggested that you place all the traces in one folder to facilitate easier selection in the file dialog window.)*

**View Different Traces**

The trace visualizer interface for viewing multiple traces remains mostly consistent, with a few exceptions. On the left panel, alongside the `Log lines` and `Motifs` tabs, there is now a `Clusters` tab as well. Furthermore, within the central graph panel, there exists a dropdown option for selecting the different traces that have been chosen. Lastly, located at the upper section of the right panel, there is an `PAIRWISE` option which we will discuss shortly.

<ul>
    <li data-icon="❑">
        In the video demo below, we visualized three traces and switched between them by selecting the corresponding option from the dropdown in the central panel.
    </li>
</ul>

<figure class="video_container">
	<video controls="true" allowfullscreen="true" >
		<source src="../../videos/trace-visualizer/compare_contrast_select.mp4" type="video/mp4"/>
	</video>
</figure>

**Trace Clusters**

The new `Clusters` tab at the top of the left panel allows us to separate traces into different groups based on a chosen metric between `number of machines` or `trace comparison`.

<ul>
    <li data-icon="❑">
        Clustering by the <code>number of machines</code> groups traces from the smallest to the largest number of machines. In the example below, with the three traces that we selected earlier, they all have the same number of machines.
    </li>
</ul>

<div class="screenshots" markdown="1">
  <img src="../../images/trace-visualizer/clusters_number_of_machines.png" alt="Cluster Number of Machines" >
</div>

<ul>
    <li data-icon="❑">
        Clustering by the <code>trace comparison</code> groups traces to provide an overview of how the traces differ from a selected base trace. When choosing to cluster by <code>trace comparison</code>, a dropdown menu appears to select a base trace. Subsequently, options become available for selecting traces that have either the same or different logs as the base trace, as well as traces with the same or different machines. In the example below, as all three traces have different machines from each other and contain varying logs, only the sub-category of <code>Different log from base</code> under the <code>Different machines from base</code> category is shown.
    </li>
</ul>

<div class="screenshots" markdown="1">
  <img src="../../images/trace-visualizer/clusters_trace_comparison.png" alt="Cluster Trace Comparison" >
</div>

**Pairwise Comparisons**

Beyond viewing the traces individually, the trace visualizer also supports a side-by-side comparison. You can click the `PAIRWISE` button at the top of the right panel to view two traces side by side. When in `PAIRWISE` mode, another option appears at the top of the right panel called `SHOW DIFFERENCES`. Clicking `SHOW DIFFERENCES` will highlight any differences between the two traces in the graph (center panel) by presenting them as diamond shapes.

<ul>
    <li data-icon="❑">
        The diamond shape indicates that a machine/node is present in one trace but not in the other. Below, you'll find some images to assist you.
    </li>
    <li data-icon="❑">
        In the top row of machines, we observe that <code>tcMultipleClientsNoFailure1</code> <i>(left side)</i> corresponds to the machine named <code>Client(7)</code>, and <code>tcMultipleClientsNoFailure2</code> <i>(right side)</i> corresponds to the machine named <code>Client(8)</code>. The diamond symbol displayed on <code>Client(7)</code> within <code>tcMultipleClientsNoFailure1</code> indicates that <code>Client(7)</code> is present in <code>tcMultipleClientsNoFailure1</code> but not in <code>tcMultipleClientsNoFailure2</code>.
    </li>
    <li data-icon="❑">
        We can also observe a diamond-shaped node under the machine <code>Client(9)</code>. In the context of <code>tcMultipleClientsNoFailure1</code>, this node corresponds to the log entry: <pre><code>'Client(9)' in state 'SendWriteTransaction' sent event 'eWriteTransReq with payload (client=Client(9), trans=key="3", val=8, transId=202)' to 'Coordinator(6)'.</code></pre>Conversely, in <code>tcMultipleClientsNoFailure2</code>, the node corresponds to a different log entry: <pre><code>'Client(9)' in state 'SendWriteTransaction' sent event 'eWriteTransReq with payload (client=Client(9), trans=key="8", val=2, transId=202)' to 'Coordinator(6)'.</code></pre>
The notable distinction between these two nodes lies in their payloads, which are distinct.
    </li>
</ul>


<div class="screenshots">
    <img src="../../images/trace-visualizer/pairwise_comparison.png" alt="Extension Dev Host" >
</div>

**There you have it! Now, go ahead and try out the trace visualizer yourself to debug your P program!**
