<style>
	ul li {
		padding-left: 0.5em;
	}
	ul li::marker {
		content: attr(data-icon);
		font-size: 1em;
	}
</style>

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
