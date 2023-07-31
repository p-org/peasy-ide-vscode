/**
 * @classdesc
 *
 * <p>
 * This class is responsible for finding P motifs.
 * </p>
 * 
 * <p>
 * The p general motif finder combines the built-in ShiViz search functionality
 * with specific send-receive patterns useful when debugging a P error trace. The general
 * idea is looking for P send-receive patterns that matches some sequence of constraints in
 * some order.
 * </p>
 * 
 * <p>
 * More formally, given a squence of constraints c_1, c_2, c_n..., where each constraint is some
 * ShiViz text search query, and between each query is either ">" or ">>", indicating the bahavior
 * of constraint order between c_n and c_n+1, this P general motif finder will look for patterns 
 * matching the specific order of constraints in the behavior indicated.
 * </p>
 * 
 * <p>
 * The input format to the search bar is as follows
 * #pmotif=({c1...}>{c2...}>>{c3...}...)
 * #pmotif= - This is used to indicate that we are performing a P motif pattern search.
 * () - Things inside the parenthesis is the send-receive pattern we are searching for.
 * {} - Each ShiViz query constraint must be surrounded by curly brackets.
 * > or >> - This is used to indicate the search behavior after a constraint is satisfied.
 * </p>
 * 
 * <p>
 * ">" indicates a bahavior of an immediate search after a constraint has been satisfied. 
 * I.e., given 
 * pQueries = [
 *    "c1", 
 *    ">", 
 *    "c2"
 * ]
 * Constraint "c2" is a send event that happens immediately following constraint "c1".
 * </p>
 *
 * <p>
 * ">>" indicates a behavior of anytime search after a constraint has been satisfied.
 * I.e., given
 * pQueries = [
 *    "c1",
 *    ">>",
 *    "c2",
 * ]
 * Constraint "c2" is a send event that can happen anytime following constraint "c1".
 * </p>
 * 
 * @constructor
 * @extends MotifFinder
 */
class PGeneralMotifFinder {
  /**
   * @constructor
   * @param {string[]} pQueries - Array of strings in the following format.
   * Example
   * pQueries = [
   * 		"shiviz filtering constraint",
   * 		">",
   * 		"shiviz filtering constraint",
   * 		">>",
   * 		"shiviz filtering constraint",
   * ]
   *
   * ">" is a search type that indicates that the constraint following happens immediately 
   * after the previous constraint. For example, the constraint at pQueries[4] happens immediately
   * after constraint at pQueries[2] has been satisfied.
   *
   * ">>" is a search type that indicates that the constraint following can happen anytime
   * after the previous constraint. For example, the constraint at pQueries[2] can happen anytime
   * after constraint at pQueries[0] has been satisfied.
   */
  constructor(pQueries) {
    /**
     * @private
     * @property
     */
    this._pQueries = pQueries;
  }

  /**
   * Class property to hold the pQueries of a pattern that the user specifies
   *
   * @private
   * @type {string[]}
   */
  _pQueries;

  /**
   * Method to check wether a node satisfies the query constraint at an index.
   *
   * @param {ModelNode} node - The node we are checking the constraint at index against
   * @param {number} pQueryIndex  - Int of the index of the constraint we are checking in this._pQueries
   * @returns {boolean} True if node satisfies constraint, else false
   */
  matchesPMotifAtIndex(node, pQueryIndex) {
    let currPQueryText = this._pQueries[pQueryIndex];
    let currPQueryLogEventMatcher = new LogEventMatcher(currPQueryText);
    return currPQueryLogEventMatcher.matchAny(node.getLogEvents());
  }

  /**
   * Method to check whether we are at the last query constraint.
   *
   * @param {number} currPQueryIndex - The current pQueryIndex we are checking
   * @returns {boolean} True if currPQueryIndex is last of this._pQueries, else false
   */
  isLastPQueryIndex(currPQueryIndex) {
    return currPQueryIndex === this._pQueries.length - 1;
  }

  /**
   * Method that searches through the graph for patterns that satisfies the specified constraints order
   *
   * Overrides {@link MotifFinder#find}
   * @param {ModelGraph} graph - Instance of the visualization graph
   * @returns {MotifGroup} - Instance of a MotifGroup capturing all the patterns that matches the
   * specified constraints order
   */
  find(graph) {
    // Get the nodes of the graph and create a motif group
    var nodes = graph.getNodes();
    var motifGroup = new MotifGroup();

    /**
     * Recursive inner helper function to help search through the graph at a node to see if the paths
     * steming from this node satifies the specified constraints order.
     * 
     * Using arrow function declaration to automatically bind this keyword to access helper function 
     * defined above.
     *
     * @param {ModelNode} currNode - The current node we are traversing
     * @param {ModelNode[]} currMotifTrail - The current path of nodes we've traversed
     * @param {number} currPQueryIndex - The current p query index of the constraint we are checking against
     * @param {boolean} isPastFirstSend - True if we found the first SendEvent action to kickstart the constraint order
     * @returns - This function doesn't really return anything. It only searches through and directly modifies the
     * motifGroup with a pattern should a path be found that satisfies the specified constraints order.
     */
    const pMotifSearch = (
      currNode,
      currMotifTrail,
      currPQueryIndex,
      isPastFirstSend
    ) => {
      // If currNode is null, that means that we reached the end of a machine and no appropriate motif found
      if (currNode === null) {
        return;
      }

      // Add the currNode to currMotifTrail
      currMotifTrail.push(currNode);

      // If currNode has a children, we are dealing with a SendEvent action, which is what we're looking for
      if (currNode.hasChildren()) {
        // Get the currNode's children
        let currNodeChildren = currNode.getChildren();

        // If currNode matches the constraints at the current query index, add the node to currMotifTrail
        // Else, keep on searching based on the search type to reach to the next constraint
        if (this.matchesPMotifAtIndex(currNode, currPQueryIndex)) {
          // Get the search type for this constraint, which is only applicable if we are past the first constraint, or
          // equally the first SendEvent action
          let pMotifSearchType = null;
          if (isPastFirstSend) {
            pMotifSearchType = this._pQueries[currPQueryIndex - 1];
            // Sanity check to make sure the index is returning a search type, for development purposes
            if (![">", ">>"].includes(pMotifSearchType)) {
              throw new Error("Wrong index to get the pMotif search type!");
            }
          }

          // If we satisfied the last constraint...
          if (this.isLastPQueryIndex(currPQueryIndex)) {
            
            // If the search type to get to this last constraint was ">" (i.e. anytime after the contraint
            // before the one we just satisfied), we have to keep searching on the currNode's next node
            if (isPastFirstSend && pMotifSearchType === ">>") {
              pMotifSearch(
                currNode.getNext(),
                currMotifTrail.slice(),
                currPQueryIndex,
                true
              );
            }

            // Since we satisfied the last constraint, we have to add the currNode's children to motif trail
            // to complete it
            currNodeChildren.forEach((currNodeChild) =>
              currMotifTrail.push(currNodeChild)
            );

            // Add motif to motifGroup
            let motif = new Motif();
            motif.addTrail(currMotifTrail);
            motifGroup.addMotif(motif);

            // If the constraint we satisfied is not last, keep on searching based on the indicated search type to
            // reach to the next constraint
          } else {
            
            // Regardless of which search type type, we want to search onwards on the children onto the next constraint
            currNodeChildren.forEach((currNodeChild) => {
              pMotifSearch(
                currNodeChild,
                currMotifTrail.slice(),
                currPQueryIndex + 2,
                true
              );
            });

            // If search type is anytime after the constraint we just satisfied, we also want to search onwards on the
            // currNode's next node.
            if (isPastFirstSend && pMotifSearchType === ">>") {
              pMotifSearch(
                currNode.getNext(),
                currMotifTrail.slice(),
                currPQueryIndex,
                true
              );
            }
          }

          // If it's a SendEvent but we didn't match the constraint, search onwards on the currNode's next node
        } else {
          pMotifSearch(
            currNode.getNext(),
            currMotifTrail.slice(),
            currPQueryIndex,
            isPastFirstSend
          );
        }

        // If the currNode doesn't have children and it's just an individual node, just add it to currMotifTrail
        // and search onwards based on the currNode's next node. 
        // ONLY add if we are past the first send because otherwise it's not apart of any suitable path
      } else {
        isPastFirstSend && 
          pMotifSearch(
            currNode.getNext(),
            currMotifTrail.slice(),
            currPQueryIndex,
            isPastFirstSend
          );
      }
    };

    /************************************************************************************************************/
    // Check to make sure it's not an empty graph
    let firstNode = null;
    if (nodes.length === 0) {
      return motifGroup;
    }
    firstNode = nodes[0];

    // Start exploring the graph for patterns that satisfies the specified constraints order
    for (let n = 0; n < nodes.length; n++) {
      var currNode = nodes[n];

      // Only start searching if it has child. I.e., it's sending to another machine
      if (currNode.hasChildren()) {
        pMotifSearch(currNode, new Array(), 0, false);
      }
    }

    // return the motif group
    return motifGroup;
  }
}

PGeneralMotifFinder.prototype = Object.create(MotifFinder.prototype);
