
# PubSub with JavaScript on AWS

In this activity, you'll use *JavaScript*, *nodeJS* and the *AWS JavaScript SDK* to subcribe and publish to multiple AWS topics in order to solve a riddle.

After solving the riddle, you'll be added to the **PubSub Hall of Fame** and your team will be notified of your great success on Slack :D


## Prerequisites

The following activities are recommended before attempting this one:
- [Create a Thing on AWS dashboard]
- [PubSub via AWS dashboard]


## Getting started

1. Using git, clone this repo onto your local machine, then checkout your own personal branch named after your GitHub username. `git checkout -b myGitHubUsername`
2. Add the certificates you generated from the prerequisite activity [Create a Thing on AWS Dashboard] to your activity folder, and link to them in `device.js` (when device is created)
3. Make sure you have installed *nodeJS* and *npm*
5. To install the AWS JavaScript SDK and nodemon, run `npm install` in the activity folder.
6. In your favorite text editor, open `subscribe.js` and `publish.js` We've added some code to get you started, and you need to write the publish and subscribe code to help you solve the riddle and submit your solution.
7. Run your subscribe and publish scripts with `node subscribe.js` and `node publish.js`

*nodemon?*


## Messages and Topics

Messages are published in *JSON format*. If you'd like to verify that your message is valid JSON, use *the linter tool*.


### `makers/challenge/tokens`

Subscribe to this topic to get an `answerToken`. Tokens are automatically published by MakerBot every 60 seconds and are valid for 60 minutes. You'll use this token when publishing your riddle answer.


### `makers/challenge/clues`

Subscribe to this topic to get clues to help you solve the riddle. Clues are published by MakerBot every 30 seconds. There are 6 clues to the riddle, but you might not need all of them to figure it out.

**Example message:**

    {
      "clueIndex": 3,
      "clue": "My hobbies include meowing and flying at Mach 1",
      "totalClues": 6
    }


### `makers/challenge/answers`

Publish to this topic to submit an answer to the riddle. You'll need to include a valid `answerToken` as well as your answer. It's recommended that you don't subscribe to this channel unless you want to see other maker's answer attempts, which may spoil the riddle.

**Example message:**

    {
      "name": "Alan Turing",
      "answerToken": "abc123",
      "answer": "Cats riding jetpacks"
    }



### `makers/challenge/answers/errors`

Subscribe to this topic to get feedback on why your published answer was rejected.

**Example messages:**

    {
      "answererName": "Alan Turing",
      "error": "Your message is not valid JSON."
    }

    {
      "answererName": "Alan Turing",
      "error": "Your message is formatted correctly, but your answer is incorrect."
    }


### `makers/challenge/answers/accepted`
  
Subscribe to this topic to be notified when your answer is accepted as correct.

**Example message:**

    {
      "answererName": "Alan Turing",
      "result": "Congratulations, you solved the riddle!"
    }


## Activity strategy

Since you probably want to see incoming messages all the time, but only publish a message once you've solved the riddle, the code is split into two files `subscribe.js` and `publish.js`, which means you'll want to run two separate terminal tabs. Since we're using *nodemon*, you can boot up each script once and it will auto-reload when you update the source code.


## Having issues?

We're here to help! If you get stuck, please ask for help on Make Slack in your team channel and tag a Make Master, @dan or @nic. You can also DM us, but it's more useful to keep comms public so that other team members can benefit too.

You can also `git checkout solution` to see a working solution, but you probably don't want to do that until you've solved it yourself ;)


## Resources and further reading
- AWS PubSub documentation
- AWS JavaScript SDK Documentation
- NodeJS installation instructions
- JSON guide
- Nodemon info
