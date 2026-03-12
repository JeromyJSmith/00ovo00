- **title**: 10 Claude Code Plugins to 10X Your Projects
- **tags**:

- **url**: <https://www.youtube.com/watch?v=OFyECKgWXo8>
- **is_live**: False
- **duration**: 1067
- **uploader**: Chase AI
- **video_id**: OFyECKgWXo8
- **age_limit**: 0
- **categories**:
  - Science & Technology
- **channel_id**: UCoy6cTJ7Tg0dqS-DI-_REsA
- **like_count**: 1113
- **view_count**: 26956
- **channel_url**: <https://www.youtube.com/channel/UCoy6cTJ7Tg0dqS-DI-_REsA>
- **description**: ⚡Master Claude Code, Build Your Agency, Land Your First Client⚡
<https://www.skool.com/chase-ai>

🔥FREE community with tons of AI resources🔥
<https://www.skool.com/chase-ai-community>

💻 Need custom work? Book a consult 💻
<https://chaseai.io>

The Claude Code ecosystem is moving fast as new MCPs, CLIs, skills, and frameworks are dropping every day. In this video, I break down the 10 tools that have actually stuck in my workflow and made a real difference in how I build.

For each tool, I cover: why you should care, how it works, where to get it, and a real use case.

⏰TIMESTAMPS:
0:00 - Intro
0:55 - Supabase
6:07 - Skill Creator
7:55 - GSD
9:19 - NotebookLM
10:36 - Obsidian
11:43 - Vercel
12:36 - Playwright
13:53 - Github
14:39 - Firecrawl
15:35 - Excalidraw
17:13 - More Resources

RESOURCES FROM THIS VIDEO:
➡️ Master Claude Code: <https://www.skool.com/chase-ai>
➡️ My Website: <https://www.chaseai.io>

# claudecode

- **upload_date**: 20260309
- **uploader_id**: @Chase-H-AI
- **uploader_url**: <https://www.youtube.com/@Chase-H-AI>
- **comment_count**: 46
- **is_transcript_available**: True
- **user_subtitle_languages**:

- **generated_subtitle_languages**:
  - en

0:00: If you use cloud code, then you know

0:02: that the plug-in and add-on ecosystem is

0:05: actually insane right now. Whether it's

0:07: new MCPs, new CLIs, new skills, new

0:10: frameworks, there is something new

0:12: coming out every single day. And it

0:14: feels like it's impossible to separate

0:15: the wheat from the chaff. What should

0:17: you actually be using to improve your

0:19: productivity? So, in this video, I'm

0:21: going to do my best to help you out by

0:23: showing you my top 10 cloud code

0:25: plugins. And this ranges from skills to

0:27: CLI tools. And these are things I

0:29: actually use and I believe they're a

0:31: true value ad. Now, for all 10 of these

0:33: tools, I'm going to give you four

0:34: things. I'm going to tell you why you

0:36: should care about this tool, how to use

0:38: it, how to install it, and an actual use

0:41: case. So, some of these tools may

0:42: already be familiar to you, and a couple

0:44: of them we've already done full deep

0:46: dive videos on, but my hope is that at

0:48: least a few of them are brand new. And

0:50: if you add at least one new tool to your

0:53: stack, then I think this video is going

0:55: to be worth your time. So to kick us

0:56: off, tool number one is the Superbase

1:00: MCP server. Now why should you care

1:02: about the Superbase MCP server? There

1:04: are two reasons. Number one is databases

1:06: and number two is authentication. At

1:08: some point in your building journey,

1:10: you're going to create a project that

1:12: requires databases and requires

1:14: authentication. Superbase can handle

1:16: both of those things for us and they

1:18: have a very generous free tier. So you

1:20: can actually go pretty far without

1:21: paying a penny. The other cool thing

1:23: about Superbase is it's built on

1:25: open-source tools. Superbase is just a

1:27: nice wrapper around it that's easy for

1:29: us to interact with, but we can also

1:30: self-host and develop locally this

1:32: entire like authentication and database

1:34: framework. Now, to install the Superbase

1:36: MCP is actually very simple. It is just

1:39: this one line of code. If you're looking

1:41: to where I found this, this is inside

1:42: the cloud code documentation under MCPS.

1:45: Now, as for use cases, I kind of already

1:47: alluded to this. anytime you need a

1:48: database even if it's a basic one like a

1:50: just a standard Postgress database or

1:52: we're trying to do some vector database

1:53: like rag we can use this tool also like

1:56: I said authentication like are you going

1:57: to have users visit your site do they

1:59: need to build a profile do we need to

2:01: keep their data separate again perfect

2:03: use case for superbase now to actually

2:06: use this inside of cloud code again just

2:07: like any other MCP after you run that

2:09: installation command we're just going to

2:11: do for/mcp and you will see your

2:14: superbase mcp show up down here inside

2:16: of projects you will need to

2:17: authenticate at first which requires you

2:18: to hop into Superbase and get some API

2:20: keys. But again, as always, Cloud Code

2:22: will walk you through that process step

2:24: by step. And once connected, when it

2:26: comes to creating the databases or

2:28: editing the databases, we no longer have

2:30: to hop into Superbase and like do SQL

2:33: code. We just use plain language. So,

2:34: it's great. Now, I'm going to be real

2:36: with you for a second. You should

2:38: actually never use the Superbase MCP

2:40: server in reality. There's no point.

2:43: There's no point because we should be

2:45: using the Superbase CLI instead. Well,

2:48: Chase, why did you just talk about the

2:49: MCP server for a minute and a half and

2:51: waste all our time? Well, two reasons.

2:52: One, to tell you this story. I myself,

2:56: someone who was looking at these tools

2:57: all day, all the time, had been using

2:59: the Superbase MCP up until very, very

3:02: recently. In fact, it wasn't until this

3:04: comment above that was calling me out in

3:06: another video did I realize that the

3:08: Superbase CLI actually existed, which is

3:11: kind of wild because I use Superbase all

3:12: the time. I understand that CLI tools

3:14: are in general superior to MCP tools.

3:16: Yet me who again this is like my

3:19: profession didn't even realize that. And

3:22: I just wanted to show you that like as

3:24: someone who is very deep in the space

3:26: even I struggle to keep up with these

3:28: tools even when it comes to tools I use

3:31: consistently. So, if you feel like

3:32: you're overwhelmed, I promise you're

3:34: okay. The second reason I wanted to do

3:36: this is because I feel like it's worth

3:37: having a discussion about CLI versus

3:39: MCPs because in the next nine tools, we

3:42: do have a couple MCPS, but for the most

3:44: part, we always, always, always try to

3:46: use CLIs instead of MCPS. Now, MCPs, as

3:49: you know, these came out in 2024. These

3:51: are ananthropic creation, right? It was

3:53: a standard for us to connect our AI

3:56: assistants to different systems where

3:57: our data lives, like Superbase. However,

4:00: today in the big 26, our AI assistants,

4:02: they live inside the terminal with us.

4:04: So, they have the ability to use these

4:07: CLI systems. And we like the CLI more

4:09: than MCP cuz MCP is pretty much just

4:12: trying to ape what a CLI tool does. But

4:16: because it's not in the terminal,

4:18: there's some additional overhead that

4:19: goes along with it. So, all things being

4:21: equal, if you are looking at something

4:23: and there's a CLI and there's an MCP

4:25: version, go with the CLI. It's

4:27: essentially purpose-built for AI coding

4:29: agents like Claude code. Now, when it

4:31: comes to the CLI, the Y is the same,

4:33: authentication databases. The how is

4:35: pretty much the same as well. The

4:36: biggest difference is just the

4:37: installation. So, I'm inside of the

4:39: Superbase docs right now. And the

4:41: installation just changes depending on

4:42: what operating system you're using.

4:44: However, Cloud Code can again do this

4:45: all for you. Just say, "Hey, download

4:47: and install the Superbase CLI tool." And

4:49: it will download and install that

4:51: dependency. And it now has access to the

4:54: Superbase CLI. Now, the one caveat when

4:56: it comes to using CLI tools versus MCPs

4:59: is that when we give Claude Code some

5:01: sort of brand new CLI tool, we usually

5:04: want to include the addition of some

5:06: sort of appropriate skill, right? We

5:09: want to tell Claude Code how to use that

5:11: specific CLI tool in a specific way. And

5:13: the perfect way to do that is with

5:15: skills. So, anytime you install a new

5:18: CLI, make sure you check their GitHub or

5:20: check their documentation or check

5:21: somewhere to see, hey, do they already

5:23: have purpose purpose-built skills for

5:25: this tool and Superbase has that for us

5:27: right here, Claude Code plugin? We can

5:29: just look it up inside of the

5:30: marketplace. So, that's tool number one,

5:32: Superbase CLI, not Superbase MCP. Sorry

5:36: for the bait and switch, but I wanted to

5:38: be able to have that discussion about

5:39: CLI versus MCPS because I think it's an

5:41: important one moving forward. Now,

5:43: before we move on to tool number two, a

5:45: quick word from our sponsor, which is

5:47: me. I just released my Claude Code

5:50: Masterass inside of Chase AI Plus. There

5:52: is a link to that in the pin comments.

5:54: And if you're looking to go from zero to

5:55: AI dev, no matter your technical

5:56: background or lack thereof, that's the

5:58: place for you. I also have a free Chase

6:01: AI community that is in the description.

6:03: Tons of free resources, which is perfect

6:05: if you're just getting started. So, make

6:07: sure to check it out. Now, tool number

6:08: two is, in my opinion, the most powerful

6:11: out of all 10 we're going over today,

6:13: and that is the skill creator skill from

6:16: Anthropic. We did a full deep dive on

6:18: this guy a few days ago. I'll put a link

6:20: above, but this one is amazing. Not just

6:22: because it can create skills, but

6:23: because we can modify and improve

6:25: existing skills and measure skill

6:27: performance. Now, Enthropic put out an

6:29: entire blog talking about the

6:31: improvements it made to this particular

6:33: skill. And I really can't emphasize

6:35: enough how big of a deal this is because

6:37: first of all, we can create custom

6:39: skills that we know are working. Before

6:41: this skill, it was kind of just random,

6:43: right? Did we know the skill was

6:45: actually making things better? Maybe.

6:47: But did you have any actual data? Well,

6:48: if we look at stuff like this, we now

6:50: do. I can do AB tests with the skill,

6:53: without the skill. I can do AB tests to

6:55: existing skills, right? Does my current

6:58: incarnation of this skill actually

7:00: perform better than the previous version

7:02: before I made the modifications? Right?

7:03: Before you were kind of in the dark or

7:05: it was kind of wishy-washy and it was

7:06: kind of just based on gut feeling. Not

7:09: the case anymore. And that is extremely

7:11: important when it comes to improving

7:13: cla. Now to use the skill creator, we

7:15: first need to install it, which is very

7:17: easy. You're just going to do for/plugin

7:19: and you are going to find it inside of

7:21: the plugins. You can just search for

7:23: skill creator, hit install, and then

7:25: you'll see it here. It should say

7:26: skill-creator. Once installed, there's

7:28: two ways to use it. Either we can just

7:30: do forward slashkillcreator

7:32: and then I know it's going to be

7:34: invoked. Or you can just use natural

7:35: language and say, "Hey, cloud code, use

7:37: the skill creator and I want to either a

7:40: create a new skill or b I want to go

7:42: ahead and do some eval on this current

7:44: skill." It's that easy. And like any

7:45: skill under the hood, it's just a text

7:47: prompt. So if you go to Anthropics

7:49: GitHub and Claude Code and look at

7:51: skills, you can see the entire thing in

7:53: all its glory right here. Now tool

7:55: number three is actually a framework for

7:58: a cloud code and it's GSD the get

8:00: done framework. This is essentially an

8:02: orchestration layer that sits on top of

8:04: cloud code and sort of just changes how

8:07: cloud code operates when it comes to

8:09: creating new projects. And essentially

8:10: what it does is it just gives us more

8:12: guard rails in terms of specd driven

8:15: development which makes it perfect if

8:16: you're trying to create a brand new

8:18: project from scratch and you want it

8:20: broken down phase by phase, feature by

8:23: feature. And on top of that, it also

8:24: does a really good job at context rot

8:27: management, context window management.

8:29: And it does that by ensuring every time

8:31: we're executing a new portion of the

8:33: plan, we're doing a fresh context

8:34: window. We're using sub agents.

8:36: Everything is done in a way to make sure

8:39: we don't get into the back half of our

8:41: window and get worse outputs because of

8:43: that. So, if you're looking for

8:44: something that's going to create your

8:45: projects from scratch in an extremely

8:47: regimented way, I can't recommend GSD

8:50: enough. And to install it is really

8:51: simple. Just search up GSD or get

8:53: done on GitHub and it's simply this

8:56: single command. And once you install it

8:58: to start a new project, it's all through

9:00: slash command. So you just do

9:01: forward/gsd new project and then what it

9:04: will kick off is essentially a plan mode

9:06: on steroids where it really really

9:08: really tries to nail down what it is

9:10: you're actually trying to build which

9:13: you know if you've built anything you

9:14: know how important it is to essentially

9:15: like plan 300 times with cloud code once

9:18: to get quality outputs. Now tool number

9:20: four is the backbone of my research

9:22: workflows inside of cloud code these

9:24: days and that is the notebook LM-PI

9:26: skill/ CLI tool and that is the tool

9:29: that allows us to connect notebook LM in

9:31: claude code. Everything I can do inside

9:33: of Notebook LM I can now do via the

9:36: Claude Code terminal even though there

9:37: is no official API for Notebook LM which

9:40: means research, analysis, creation of

9:43: deliverables like videos, infographics,

9:44: slide decks, flashcards, podcasts,

9:46: whatever is offloaded to notebook LM for

9:50: free pretty much because of this tool.

9:52: So it's a wild value play. Now to

9:54: install this is very simple. We're just

9:55: going to head to the notebook LM-PI

9:58: GitHub, copy these commands, paste them

10:00: into our terminal, and install the

10:02: dependencies. Once you install those

10:03: dependencies, then we need to log in.

10:05: So, you'll just run notebook LM in your

10:07: terminal. It will pop up a browser, and

10:09: then you just log into your notebook LM

10:11: account. Now, like we talked about

10:12: before, this is a CLI tool, which means

10:14: what? We need to add a skill. The skill

10:16: install is here as well. It's just

10:18: notebook LM skill install, and that

10:20: teaches Cloud Code how to use all of

10:22: this. And these are the actual commands

10:24: Claude Code will be using, but you just

10:26: talk to Cloud Code in plain language.

10:27: And again, if you can do it in Notebook

10:29: LM, you can do it in Claude Code via the

10:32: terminal. Just use natural language. So,

10:33: this one is one of my favorites,

10:35: definitely add this to your stack. Now,

10:37: tool number five is perfect if you use

10:39: Claude Code as a personal assistant in

10:42: any capacity, and that is Obsidian. Now,

10:45: Obsidian is great for you, the end user,

10:46: because it lets you get more insight

10:48: into your text files by seeing how they

10:50: connect, and it just in general keeps

10:51: you infinitely more organized, which is

10:53: why I specifically said that the use

10:54: case here with Cloud Code in Obsidian is

10:56: in a personal assistant type context.

10:59: Somewhere, like you see over here on the

11:00: left, you have tons of markdown files.

11:03: This isn't a huge value ad if you're

11:04: doing this in a typical coding project

11:06: because that sort of context doesn't

11:08: make sense. But in a in a personal

11:09: assistant world where you have vast

11:11: sprawling and accumulating context in

11:14: the form of text documents, markdown

11:16: files, Claude Code plus Obsidian is

11:18: great. And there's no CLI we need to

11:20: install. You don't even really need a

11:21: skill. You just need to download

11:22: Obsidian, create a folder that is

11:24: designated as the vault, and then you

11:26: just open up Claude Code inside the

11:28: terminal in that particular folder. And

11:30: for me, that folder is quite literally

11:32: called the vault. And then after that,

11:34: all you have to do is tell Claude Code,

11:35: hey, when we create markdown files, just

11:36: follow Obsidian conventions. That's it.

11:38: Again, the value ad for this connection

11:40: is in specific use cases. This isn't a

11:42: one-sizefits-all. Now, tool number six

11:44: is all about making it easier for us to

11:47: manage our deployments, and that is the

11:49: Verscell CLI. Now, I love using Verscell

11:51: for my deployments because it's simple

11:53: to use and they have a great free tier.

11:55: So, what more do you need to install the

11:57: CLI? Very simple. We're just going to

11:58: give it this command. And also remember

12:00: for all these install things, you can

12:02: also just ask Cloud Code to, hey, go

12:03: ahead and install the Versel CLI for me.

12:05: And you know the drill at this point.

12:06: We're adding a CLI tool. So, what do we

12:08: need? We need that skill. Verscell gives

12:10: it to us on their actual website. And in

12:12: fact, they actually have a ton of skills

12:14: available if you ever want to take a

12:15: look. Some of them are pretty

12:16: interesting. But if we just click that,

12:18: it will bring us to the skill. And this

12:19: is the command we want to put in the

12:21: terminal to install it. And this is the

12:23: sort of tool that's great to use in

12:24: conjunction with like the brand new

12:25: agent loops. You know, you can have a

12:27: loop that calls the Versell CLI skill to

12:30: like check deployment statuses if you're

12:32: constantly putting up new deployments as

12:34: you make changes to a particular

12:35: project. Now, tool number seven is all

12:37: about enhancing Claude Code's browser

12:39: automation ability. It's ability to

12:41: actually go out on the web and do things

12:43: like even something as stupid as like, I

12:45: want you to go out on Amazon, fill up my

12:47: shopping cart, and then buy it, right?

12:49: We do that using the Playright CLI. Now,

12:52: Playright is an open- source tool from

12:54: Microsoft. It's very popular. I've

12:56: really enjoyed using it when it comes to

12:57: browser automations and cloud. And the

12:59: install is very easy. We're just going

13:00: to head to the Playright CLI GitHub and

13:02: we're just going to copy this command,

13:04: paste it in our terminal, and it's going

13:05: to load the dependencies. Installing the

13:07: skills is also very simple. Playright

13:09: CLI install-skills.

13:12: That's it. Installs done. Now, as for

13:13: use cases and demos, we did a full deep

13:15: dive on Playright in Cloud Code. So,

13:17: make sure you check out that one. Just

13:18: came out a few days ago. But anything

13:21: you could essentially normally do in a

13:22: browser, you could do it using

13:24: Playright. And it's also great for

13:26: things like testing UI design or testing

13:28: like form submissions, anything like you

13:30: know that's kind of laborious when

13:32: you're changing something inside your

13:33: project or your app and you need to

13:34: manually test it. Well, Playright can do

13:36: that for you. And just like all these

13:37: CLI tools, we just use plain language to

13:40: execute the task. Now, one thing I

13:42: didn't mention in that deep dive is the

13:43: Playright CLI show command. And this

13:45: actually gives you a visual dashboard

13:47: that shows what all of your browser

13:48: agents are doing, even if they're

13:50: running headless. So, really cool thing

13:52: to use. Now, tool number eight works

13:54: with a platform that should be near and

13:55: dear to your heart, and that is the

13:57: GitHub CLI. So, with the GitHub CLI, we

14:00: can essentially do everything you were

14:02: doing manually on GitHub via the CLI.

14:05: This is obviously great to use in tandem

14:06: with the Versell CLI tool. And so, we

14:08: can essentially do everything from

14:10: coding to pushing to GitHub to

14:11: deployment, again, all from one place

14:13: using natural language. Now, as for

14:15: installation, obviously, we can lean on

14:16: Cloud Code to walk us through it. But if

14:18: we go to this GitHub page, it breaks it

14:20: down by operating system. So there

14:22: shouldn't really be any confusion. Now

14:23: coding agents like cloud code are so

14:25: spun up on Git and GitHub that you

14:28: really don't need a skill to use this to

14:30: its full potential. But if you feel so

14:32: inclined, I would just use the skill

14:33: creator to create one yourself. But

14:35: honestly, just having the tool installed

14:36: and talking to cloud code in plain

14:38: language is enough. Now tool number nine

14:39: is all about web scraping. And for that

14:41: we are going to be using firecrawl, both

14:43: its CLI and its appropriate skill. Now

14:46: to install the Firecrol CLI, it's super

14:48: easy. Just search up Firecrawl CLI tool.

14:50: you'll get to this page. It's this one

14:52: line. This will also include the

14:54: appropriate skill install. Now, if

14:56: you've never used Firecrawl, the pitch

14:57: for Firecrawl is that it's web scraping,

14:59: but the data it brings back is tailor

15:01: made for AI agents. And there's really

15:02: four different commands when it comes to

15:04: firecrawl. It's scrape, crawl, map, and

15:07: search. Now, if you've never used

15:08: Firecrawl before and you're kind of new

15:09: to web scraping in general, then these

15:11: four core commands kind of might seem

15:13: like they're all doing the same thing.

15:15: But luckily for us, you know who knows

15:16: how to use the right command for the

15:18: right job? Cloud code. Hence the skill

15:21: and fire call is also nice enough to

15:22: give us some of the standard use cases

15:24: things like competitor research

15:26: documentation site change monitoring or

15:28: deep research with sources. So I really

15:31: love firecol. It's definitely a step

15:32: above than just asking cloud code to use

15:34: its web search tool. And last but not

15:36: least tool number 10 is one of my

15:38: personal favorites and that is the

15:39: excaladraw diagram skill. I just

15:41: recently started using this and shout

15:43: out to its creator Cole Med. You've

15:44: probably seen his channel on YouTube.

15:46: One of the greats in this space. love

15:48: the work he does, but I love his skill

15:50: even more. So, what does this do? This

15:53: allows me to create diagrams through

15:55: natural language with Claude code. If

15:57: you watched my last video on the six

15:59: levels of claude code, you saw these

16:00: diagrams. Like all of this, I didn't do

16:02: any of this manually. All of these

16:04: things were created using cla code,

16:07: which saves me a ton of time and

16:09: actually gave me something to speak to.

16:11: Like this is actually an awesome thing

16:13: if you ever do any sort of presentations

16:15: or you've ever worked in Excal before

16:17: because again doing this by hand brutal

16:19: would be totally brutal but this skill

16:21: gets rid of all that manual work. Now to

16:23: use this you're just going to head to

16:24: the Excal diagram skill GitHub and then

16:27: you're going to clone the repo and then

16:29: you're going to copy it into your

16:30: project skill directory. And again just

16:32: like everything else to use it we just

16:35: talk to Claude code in natural language.

16:37: The best way to use this I have found is

16:40: again using these diagrams is sort of an

16:43: add-on to a presentation or something

16:45: but point claw code it's some sort of

16:47: you know directory of knowledge right

16:49: whatever you're doing for in this case

16:50: it was like a whole write up on what I

16:52: was going to talk about my six levels of

16:53: cloud code and I was like hey take all

16:56: that information break down each level

16:58: into some sort of chart people can you

17:00: know see and then do it right obviously

17:04: I put in plan mode had some back and

17:05: forth so I had some idea what I was

17:06: going to come up with but This thing is

17:08: awesome. I I can't praise this um

17:10: directory enough. So yeah, shout out

17:12: Cole. So that does it for my list of my

17:14: top 10 favorite Claude Code plugins. I

17:16: hope at least one of those was new for

17:18: you and at least one of those can be

17:20: added to your stack and kind of help you

17:21: out in your day-to-day because there is

17:23: so much out there to improve your Claude

17:26: code quality of life. But again, we

17:28: don't want to fall into the trap of

17:29: thinking increased capability equals

17:32: increased performance, right? There is a

17:33: sweet spot somewhere. there is that

17:35: middle ground that we're always

17:36: searching for and hopefully we're

17:39: getting you closer to that place. So, as

17:41: always, let me know what you thought.

17:42: Make sure to check out Chaseai Plus.
