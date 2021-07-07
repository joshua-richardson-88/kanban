import { createSlice } from '@reduxjs/toolkit'

// This link describes the title
const markdownLink1 = '[[The link description]]'
// This link overrides the link title with another display title
const markdownLink2 = '[[Link Description|Actual Link Title]]'
// Some sample markdown
const sampleMarkdown = `
# Chapter 2: Raiders' Camp\n\nIn the warm light of day, [[Governor Nighthill]]
 and other leaders want to know who was behind the attack on [[Greenest]], and
 why the town was a target. The raiders retreated toward the southeast, and 
their trail is easy to spot. A small, stealthy group could follow the trail to
 the raiders' camp and gather information.\n\n
`
// The links are just a many-to-many lookup table I think
const links = [
  {
    title: 'Governor Nighthill', // the title to check against
    post: 1, // the index in the notes array that corresponds to the title
  },
]

const tags = [
  {
    id: 'NPC', // the name used in a post
    posts: [1], // the index of the posts that have this tag
  },
  {
    id: 'Important',
    posts: [1],
  },
  {
    id: 'Greenest',
    posts: [1],
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState: [
    {
      title: 'Governor Nighthill',
      tags: ['NPC', 'Important', 'Greenest'],
      text: [
        [
          'The man who runs ',
          { link: ' Greenest' },
          ` is Tarbaw Nighthill, a human male of sixty years. If characters ask
            who's in charge, they are directed to Nighthill. He is pacing atop
            the parapet of the keep when the sky is clear, or inside the keep if
            the dragon is attacking. If the characters don't seek out the 
            governor when they reach the keep, he finds them. either way, 
            Nighthill welcomes them and takes them to the parapet. From there, 
            they have the best view of Greenest.`,
        ],
        [
          `The right side of Nighthill's face and head are bandaged, his right
           arm hangs in a sling, and his light blue tunic is stained with his own
           blood. He received these wounds during the early stages of the attack
           and hasn't spared the time for more than cursory first aid.`,
        ],
      ],
    },
  ],
  reducers: {
    create: {
      reducer: (state) => {},
      prepare: ({ title, tags, rawLines }) => {
        const newPost = {
          title: title.trim(),
          tags,
          text: [],
        }

        // every paragraph is seperated by 2 newlines
        const lines = rawLines.split('\n\n')

        lines.forEach((line) => {
          // replace any newline character with a space
          line.replaceAll('\n', ' ')

          // check if link is in the line
          if (line.includes('[[')) {
            const linkStart = line.indexOf('[[') + 2 // we add two to remove [[
            const linkEnd = line.indexOf(']]')
            const linkText = line.substring(linkStart, linkEnd)
            const linkTitle = linkText.includes('|')
              ? linkText.substring(linkText.indexOf('|') + 1).trim()
              : linkText.trim()
          }
        })
      },
    },
    update() {},
    remove() {},
  },
  extraReducers: {},
})

const character = {
  /****************************************************************************
                            Basic Settings for the character
  ****************************************************************************/
  allowSources: ["Player's Handbook"], // enum of all source material allowed, probably want to add granularity to this to filter by specific items
  diceRolling: true, // true == in app, false == out of app
  optionalFeatures: {
    class: true, // whether to allow optional class features
    origin: false, // whether to allow customizing the origin (for racial traits)
  },
  advancementType: 'milestone', // enum of Strings [milestone, XP]
  hitPointType: 'Fixed', // enum of Strings [Fixed, Manual]
  usePrerequisites: {
    // whether to restrict choices based on rule pre-requisits for this character
    feats: true, // true == don't list options character can't do
    multiClass: true, // true == don't list classes character can't take
  },
  levelScaledSpells: true, // whether to display availables spells that can be cast at a higher level
  encumberanceType: 'Use Encumberance', // enum of Strings[Use Encumberance, No Encumberance, Variant Encumberance]
  ignoreCoinWeight: true, // whether to account for weight of coins
  abilityScoresOnTop: true, // true == display scores more prominently, false == display modifier more prominently
  private: false, // whether character is visible (false) or hidden (true) from other players,
  /****************************************************************************
                            Character Attributes
  ****************************************************************************/

  race: {
    name: 'Warforged',
    featureChoices: [
      {
        abilityScore: [
          {
            value: 1, // (+1)  the integer to increment by
            score: 1, // (DEX) the 0-based index value of the stat to modify
          },
          {
            value: 2, // (+2)
            score: 2, // (CON)
          },
        ],
        skillProficiency: ['Acrobatics', 'Medicine'], // enum of Strings describing the skills that gain proficiency bonus
        language: [4], // an array listing the index of the choice that was made
      },
    ],
    traits: [
      {
        title: '',
        source: '',
        text: '',
      },
    ],
  },
  abilityScores: {
    type: 'Manual/Rolled', // enum of Strings [Standard Array, Manula/Rolled, Point Buy]
    scores: [
      {
        name: 'Strength',
        abbv: 'STR',
        base: 14,
        racialBonus: 0,
        abilityImprovements: 0,
        miscBonus: 0,
        setScore: 0,
        otherModifier: null,
        overrideScore: null,
      },
      {
        name: 'Dexterity',
        abbv: 'DEX',
        base: 15,
        racialBonus: 1,
        abilityImprovements: 0,
        miscBonus: 0,
        setScore: 0,
        otherModifier: 1,
        overrideScore: null,
      },
      {
        name: 'Constitution',
        abbv: 'CON',
        base: 15,
        racialBonus: 2,
        abilityImprovements: 0,
        miscBonus: 0,
        setScore: 0,
        otherModifier: 1,
        overrideScore: null,
      },
      {
        name: 'Intelligence',
        abbv: 'INT',
        base: 12,
        racialBonus: 0,
        abilityImprovements: 0,
        miscBonus: 0,
        setScore: 0,
        otherModifier: null,
        overrideScore: null,
      },
      {
        name: 'Wisdom',
        abbv: 'WIS',
        base: 10,
        racialBonus: 0,
        abilityImprovements: 0,
        miscBonus: 0,
        setScore: 0,
        otherModifier: null,
        overrideScore: null,
      },
      {
        name: 'Charisma',
        abbv: 'CHA',
        base: 9,
        racialBonus: 0,
        abilityImprovements: 0,
        miscBonus: 0,
        setScore: 0,
        otherModifier: null,
        overrideScore: null,
      },
    ],
  },
  skills: [
    {
      name: 'Acrobatics',
      hasProficiency: true,
      hasExpertise: false,
      reliesOn: 1, // the 0-based index of the ability score this relies on for calculation
    }, // carry on for all stats
  ],
}
