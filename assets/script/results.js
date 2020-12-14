/*jshint esversion: 6 */

const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
/* 
 *  Displays final score
 */
finalScore.innerText = mostRecentScore;