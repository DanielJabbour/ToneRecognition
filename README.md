# Y-Emote

## YHack 2017

Y-Emote is a simple web application that utilizes IBM's tonal analysis API to uncover the sentiment behind various pieces of text. One of 8 Finalists for the Mira challenge at YHack 2017. There are a number of potential uses for Y-Emote, including analyzing customer reviews for businesses so that they can quickly gain a clear understanding of customer tastes and preferences. 

To use this application, you need to obtain IBM Bluemix credentials to have access to IBM's API, which can be obtained from https://www.ibm.com/watson/developer/. 

## Technology
* JavaScript backend (Node.JS)
* IBM Watson API to analyze text
* IBM Watson text-to-speech API to translate the speech into text to be analyzed
* HTML5 & CSS3 for the frontend work

## Next Steps
In the future, we'd like to:
* validate our results against a test set of customer reviews
* analyze incident sine waves of voice data in order to also capture the more delicate elements in voice, i.e. sarcasm
* move this to a chrome extension for ease of use!
