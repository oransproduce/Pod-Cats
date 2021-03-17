const axios = require('axios');
const faker = require('faker');
let Parser = require('rss-parser');
const { Podcast } = require('./index.js');

const searchTerms = ['daily+news', 'eating', 'food', 'travel', 'nba', 'basketball', 'this+american+life', 'the+new+york+times', 'npr', 'culture', 'politics', 'finance', 'biology', 'economics', 'artificial+intelligence', 'art', 'design', 'fashion'];
let parser = new Parser();
let podDocument;
for (let searchTerm of searchTerms) {
  axios.get(`https://itunes.apple.com/search?entity=podcast&attribute=keywordsTerm&term=${searchTerm}&country=US&limit=200`).then(({data}) => {
    const { results } = data;
    for (let podcast of results) {
      const reviews = [];
      for (let i = 0; i < faker.random.number(9) + 10; i++) {
        reviews.push({
          username: faker.internet.userName(),
          body: faker.lorem.sentences(faker.random.number(3) + 1),
          rating: faker.finance.amount(1, 5, 1),
        });
      }
      const { artistName, trackName, feedUrl, artworkUrl30, artworkUrl60, artworkUrl100, genres, artworkUrl600 } = podcast;
      let podDocument;
      parser.parseURL(feedUrl).then(feed => {
        let { items, description } = feed;
        const episodes = [];
        podDocument = {
          author: artistName,
          author_lower: artistName.toLowerCase(),
          name: trackName,
          name_lower: trackName.toLowerCase(),
          description,
          description_lower: description.toLowerCase(),
          feedUrl,
          art30: artworkUrl30,
          art60: artworkUrl60,
          art100: artworkUrl100,
          art600: artworkUrl600,
          genres,
          reviews,
        };
        items = items.slice(0, 40);
        for (let item of items) {
          const { title, pubDate, content, contentSnippet, enclosure } = item;
          //console.log(enclosure);
          if (!enclosure) continue;
          const audioLink = enclosure.url;
          const contentEncoded = item['content:encoded'];
          const contentEncodedSnippet = item['content:encodedSnippet']
          const episode = {
            title,
            pubDate,
            content,
            contentSnippet,
            contentEncoded,
            contentEncodedSnippet,
            audioLink,
          };
          episodes.push(episode);
        }
        podDocument.episodes = episodes;
        Podcast.create(podDocument).then(result => {
          console.log('document inserted ', trackName);
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        console.log(feedUrl);
        console.log(err);
      })
    }
  }).catch(err => {
    console.log(err);
  });
}


