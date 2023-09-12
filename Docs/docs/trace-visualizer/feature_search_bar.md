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
  <h2>Search Bar</h2>
</div>

Now let's move on with the search bar filtering capabilities!

<a id="fields-filtering"></a>
**Filtering by Fields**

We can filter out specific nodes/logs using their associated fields as follows: `{fieldName}={value}`. Typing this into the search bar will filter out all nodes/logs that have the `fieldName` set to `value`.

??? info "More explanation with an example"
	<ul>
		<li data-icon="❑">
			For example, <code>isEntry=true</code> will highlight all logs that have a field of <code>isEntry</code> with a value of <code>true</code>.
		</li>
		<li data-icon="❑">
			We can also combine filters using logical operators like <code>&&</code>, <code>||</code>, and <code>^</code>. For instance, typing <code>action=DequeueEvent && state=WaitForPrepareResponses</code> will search for logs with the action <code>DequeueEvent</code> <b>and</b> the machine in the state <code>WaitForPrepareResponses</code>.
		</li>
	</ul>
??? note "Demo Video: How to filter a trace by fields?"

	<figure class="video_container">
		<video controls="true" allowfullscreen="true" >
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/1ebf50f6-1e30-4d28-ac43-81d517237ad8" type="video/mp4"/>
		</video>
	</figure>


**Filtering by Text**

In addition to filtering by nodes, we can also filter out nodes and fields by text. This method of filtering will highlight any logs/nodes containing the text, <b>or</b> any of the log/node's field values that contain the text.

??? info "More explanation with an example"
	<ul>
		<li data-icon="❑">
			For example, typing <code>true</code> in the search bar will highlight logs/nodes that either contain the word <code>true</code> or have fields containing the text <code>true</code>.
		</li>
	</ul>

??? note "Demo Video: How to filter a trace by text?"
	<figure class="video_container">
		<video controls="true" allowfullscreen="true" >
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/5d1f6d71-9851-4218-bae4-a144f8824853" type="video/mp4"/>
		</video>
	</figure>

If the text you are trying to filter by contains any nonalphanumeric characters *(i.e., any characters that aren't letters or numbers)*, you **must** surround the text with double quotes in order to filter.

??? info "More explanation with an example"
	<ul>
		<li data-icon="❑">
			For example, if we want to filter by the text <code>status=0</code> and avoid treating it as a <a href="#fields-filtering">fields filter</a> looking for logs/nodes with the <code>status</code> field equal to <code>0</code>, we need to surround it with double quotes like the following. Typing <code>"status=0"</code> in the search bar <i>(with the double quotes!)</i> will search for logs that contain the text <code>status=0</code>, or where the log's fields contain the text <code>status=0</code>.
		</li>
	</ul>

??? note "Demo Video: How to filter a trace that contains nonalphanumeric characters?"

	<figure class="video_container">
		<video controls="true" allowfullscreen="true" >
			<source src="https://github.com/p-org/peasy-ide-vscode/assets/137958518/1d5387ab-43d5-43d0-9e08-3ed30bdfcc93" type="video/mp4"/>
		</video>
	</figure>
